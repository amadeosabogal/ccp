import type { CCBDropdownResponse, SearchServiceParams } from '../types/ccb';

let csrfToken: string | null = null;

/**
 * Inicia la sesión obteniendo la página principal y extrayendo el token CSRF.
 */
export async function initCCBSession(): Promise<void> {
  if (csrfToken) return;

  try {
    const response = await fetch('/api-ccb/relatorio');
    const htmlText = await response.text();

    const matchToken = htmlText.match(/name="__RequestVerificationToken" type="hidden" value="([^"]+)"/);
    if (!matchToken) {
      throw new Error("No se pudo encontrar el AntiForgeryToken en el HTML.");
    }
    
    csrfToken = matchToken[1];
  } catch (error) {
    console.error("Error al iniciar sesión en CCB:", error);
    throw error;
  }
}

/**
 * Función genérica para hacer peticiones POST a la API de CCB
 */
async function apiPost<T>(endpoint: string, bodyData: URLSearchParams | null = null): Promise<T> {
  if (!csrfToken) {
    await initCCBSession();
  }

  const response = await fetch(`/api-ccb/service/${endpoint}`, {
    method: 'POST',
    headers: {
      'AntiForgeryToken': csrfToken!,
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: bodyData ? bodyData.toString() : null
  });

  if (!response.ok) {
    throw new Error(`Error en la petición a ${endpoint}: ${response.statusText}`);
  }

  return response as any; // Casteamos a any porque la respuesta depende de si queremos .json() o .text()
}

/**
 * Obtener Países
 */
export async function getPaises(): Promise<CCBDropdownResponse> {
  const res = await apiPost<Response>('pais-relatorio');
  return res.json();
}

/**
 * Obtener Estados
 */
export async function getEstados(codigoPais: string): Promise<CCBDropdownResponse> {
  const params = new URLSearchParams();
  params.append('codigoPais', codigoPais);
  const res = await apiPost<Response>('estado-relatorio', params);
  return res.json();
}

/**
 * Obtener Ciudades
 */
export async function getCidades(codigoEstado: string): Promise<CCBDropdownResponse> {
  const params = new URLSearchParams();
  params.append('codigoEstado', codigoEstado);
  const res = await apiPost<Response>('cidade-relatorio', params);
  return res.json();
}

/**
 * Búsqueda por Nombre (Localidad)
 * Devuelve un HTML en formato texto
 */
export async function searchByName(search: string, pagina: number = 1): Promise<string> {
  const params = new URLSearchParams();
  params.append('search', search);
  params.append('pagina', pagina.toString());
  const res = await apiPost<Response>('localidade-relatorio', params);
  return res.text();
}

/**
 * Búsqueda por Servicio
 * Devuelve un HTML en formato texto
 */
export async function searchByService(searchParams: SearchServiceParams): Promise<string> {
  const params = new URLSearchParams();
  if (searchParams.codigoPais) params.append('codigoPais', searchParams.codigoPais);
  if (searchParams.codigoEstado) params.append('codigoEstado', searchParams.codigoEstado);
  if (searchParams.codigoCidade) params.append('codigoCidade', searchParams.codigoCidade);
  if (searchParams.tipoCulto.length > 0) params.append('tipoCulto', searchParams.tipoCulto.join(','));
  if (searchParams.diaSemana.length > 0) params.append('diaSemana', searchParams.diaSemana.join(','));
  if (searchParams.periodo.length > 0) params.append('periodo', searchParams.periodo.join(','));
  params.append('pagina', searchParams.pagina.toString());

  const res = await apiPost<Response>('servico-relatorio', params);
  return res.text();
}

/**
 * Detalles de una Localidad
 * Devuelve un HTML en formato texto
 */
export async function getLocalidadeDetalhe(codigo: string): Promise<string> {
  const params = new URLSearchParams();
  params.append('codigo', codigo);
  const res = await apiPost<Response>('localidade-detalhe', params);
  return res.text();
}
