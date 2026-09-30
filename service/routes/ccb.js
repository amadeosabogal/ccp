const express = require('express');
const router = express.Router();

// Simple in-memory cache
const cache = {};
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 horas

// Helper para hacer las peticiones a Brasil
async function proxyToBrazil(path, req, res) {
  const url = `https://congregacaocristanobrasil.org.br${path}`;
  
  // Generar llave de cache basada en la ruta y los parámetros
  const cacheKey = url + JSON.stringify(req.body);

  if (cache[cacheKey] && (Date.now() - cache[cacheKey].timestamp < CACHE_TTL)) {
    console.log(`[CACHE HIT] ${path}`);
    return res.status(200).send(cache[cacheKey].data);
  }

  console.log(`[CACHE MISS] Fetching from Brazil: ${path}`);
  try {
    const headers = { ...req.headers };
    delete headers.host;
    delete headers.connection;
    delete headers['content-length'];
    
    // Forzamos headers para que Brasil no bloquee
    headers['Referer'] = 'https://congregacaocristanobrasil.org.br/relatorio';
    headers['Origin'] = 'https://congregacaocristanobrasil.org.br';

    let response = await fetch(url, {
      method: req.method,
      headers: headers,
      body: req.method === 'POST' ? new URLSearchParams(req.body).toString() : undefined,
      redirect: 'manual'
    });

    // Manejar la redirección (para mantener la cookie ASP.NET_SessionId)
    if (response.status >= 300 && response.status < 400 && response.headers.has('location')) {
      const setCookie = response.headers.get('set-cookie');
      if (setCookie) {
        // Parsear multiples cookies separadas por coma
        const newCookies = setCookie.split(',').map(c => c.split(';')[0].trim()).join('; ');
        if (headers['cookie']) {
          headers['cookie'] += '; ' + newCookies;
        } else {
          headers['cookie'] = newCookies;
        }
      }
      
      let location = response.headers.get('location');
      if (location.startsWith('/')) {
        location = `https://congregacaocristanobrasil.org.br${location}`;
      }

      response = await fetch(location, {
        method: req.method,
        headers: headers,
        body: req.method === 'POST' ? new URLSearchParams(req.body).toString() : undefined,
        redirect: 'manual'
      });
    }

    const data = await response.text();

    if (response.ok) {
      cache[cacheKey] = {
        timestamp: Date.now(),
        data: data
      };
      
      // Pasar cookies al cliente si las hay
      const setCookie = response.headers.get('set-cookie');
      if (setCookie) {
        res.setHeader('Set-Cookie', setCookie);
      }
      return res.status(response.status).send(data);
    } else {
      return res.status(response.status).send(data);
    }
  } catch (error) {
    console.error("Error proxying to CCB:", error);
    res.status(500).json({ error: "Internal Server Error during Proxy" });
  }
}

// Ruta para obtener el token inicial
router.get('/relatorio', async (req, res) => {
  await proxyToBrazil('/relatorio', req, res);
});

// Todas las demás rutas de servicios
router.post('/service/:endpoint', async (req, res) => {
  const targetPath = `/service/${req.params.endpoint}`;
  await proxyToBrazil(targetPath, req, res);
});

module.exports = router;
