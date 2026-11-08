const express = require('express');
const router = express.Router();

// Simple in-memory cache
const cache = {};
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 horas

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

let activeSession = {
  cookies: {},
  token: null,
  html: null,
  timestamp: 0
};

function getCookieString() {
  return Object.entries(activeSession.cookies).map(([k, v]) => `${k}=${v}`).join('; ');
}

function updateCookies(setCookieHeaders) {
  if (!setCookieHeaders) return;
  const list = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders];
  for (const str of list) {
    const parts = str.split(';')[0].split('=');
    if (parts.length >= 2) {
      activeSession.cookies[parts[0].trim()] = parts.slice(1).join('=');
    }
  }
}

/**
 * Asegura que exista una sesión activa con Brasil y extrae el AntiForgeryToken.
 */
async function ensureCCBSession(forceRefresh = false) {
  const isExpired = !activeSession.token || (Date.now() - activeSession.timestamp > 30 * 60 * 1000);
  if (!forceRefresh && !isExpired) {
    return activeSession;
  }

  console.log('[CCB] Inicializando nueva sesión con CCB Brasil...');
  activeSession.cookies = {};
  activeSession.token = null;

  // Paso 1: Petición GET inicial a /relatorio (obtiene ASP.NET_SessionId)
  const res1 = await fetch('https://congregacaocristanobrasil.org.br/relatorio', {
    headers: { 
      'User-Agent': USER_AGENT,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    },
    redirect: 'manual'
  });

  if (res1.headers.getSetCookie) {
    updateCookies(res1.headers.getSetCookie());
  }

  const loc = res1.headers.get('location') || '/relatorio';
  const targetUrl = loc.startsWith('http') ? loc : `https://congregacaocristanobrasil.org.br${loc}`;

  // Paso 2: Seguir redirección con cookies (obtiene cookie __RequestVerificationToken y el HTML con el token)
  const res2 = await fetch(targetUrl, {
    headers: {
      'User-Agent': USER_AGENT,
      'Cookie': getCookieString(),
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    },
    redirect: 'manual'
  });

  if (res2.headers.getSetCookie) {
    updateCookies(res2.headers.getSetCookie());
  }

  const html = await res2.text();
  const match = html.match(/name="__RequestVerificationToken" type="hidden" value="([^"]+)"/);
  if (!match) {
    throw new Error('No se pudo extraer __RequestVerificationToken de la respuesta de Brasil');
  }

  activeSession.token = match[1];
  activeSession.html = html;
  activeSession.timestamp = Date.now();
  console.log('[CCB] Sesión inicializada con éxito.');
  return activeSession;
}

/**
 * Helper para hacer peticiones POST a los servicios de Brasil con reintento automático
 */
async function makeCCBRequest(endpoint, bodyData, retryCount = 0) {
  await ensureCCBSession();

  const url = `https://congregacaocristanobrasil.org.br/service/${endpoint}`;
  const headers = {
    'User-Agent': USER_AGENT,
    'Referer': 'https://congregacaocristanobrasil.org.br/relatorio',
    'Origin': 'https://congregacaocristanobrasil.org.br',
    'AntiForgeryToken': activeSession.token,
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': getCookieString()
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: bodyData ? new URLSearchParams(bodyData).toString() : undefined,
    redirect: 'manual'
  });

  // Si Brasil responde con redirección (error-page por expiración de sesión), renovar y reintentar una vez
  if (res.status >= 300 && res.status < 400 && retryCount === 0) {
    console.warn(`[CCB] Redirección detectada en ${endpoint}. Renovando sesión y reintentando...`);
    await ensureCCBSession(true);
    return makeCCBRequest(endpoint, bodyData, retryCount + 1);
  }

  if (res.headers.getSetCookie) {
    updateCookies(res.headers.getSetCookie());
  }

  return res;
}

// Ruta para obtener la página principal / token inicial
router.get('/relatorio', async (req, res) => {
  try {
    const session = await ensureCCBSession();
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(session.html);
  } catch (error) {
    console.error('[CCB] Error al obtener /relatorio:', error);
    res.status(500).json({ error: 'Error al conectar con el servicio de Relatorio' });
  }
});

// Todas las demás rutas de servicios (países, estados, ciudades, localidades, cultos, detalles)
router.post('/service/:endpoint', async (req, res) => {
  const endpoint = req.params.endpoint;
  const cacheKey = endpoint + JSON.stringify(req.body);

  if (cache[cacheKey] && (Date.now() - cache[cacheKey].timestamp < CACHE_TTL)) {
    console.log(`[CACHE HIT] ${endpoint}`);
    return res.status(200).send(cache[cacheKey].data);
  }

  console.log(`[CACHE MISS] Fetching from Brazil: ${endpoint}`);
  try {
    const response = await makeCCBRequest(endpoint, req.body);
    const data = await response.text();

    if (response.ok) {
      cache[cacheKey] = {
        timestamp: Date.now(),
        data: data
      };
      // Si la respuesta es JSON, enviarla con header adecuado
      try {
        JSON.parse(data);
        res.setHeader('Content-Type', 'application/json');
      } catch {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
      }
      return res.status(response.status).send(data);
    } else {
      return res.status(response.status).send(data);
    }
  } catch (error) {
    console.error(`[CCB] Error en servicio ${endpoint}:`, error);
    res.status(500).json({ error: 'Error interno al consultar Relatorio' });
  }
});

module.exports = router;
