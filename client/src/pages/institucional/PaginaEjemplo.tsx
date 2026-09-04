import { useEffect } from 'react';

export default function TestCCBProxy() {

  useEffect(() => {
    const testCCBAPI = async () => {
      try {
        console.log("1. Solicitando página principal para obtener Cookie y Token...");
        // Hacemos GET a /api-ccb/relatorio (el proxy lo envía a la URL real)
        const responseHTML = await fetch('/api-ccb/relatorio');
        const htmlText = await responseHTML.text();

        // 2. Extraemos el token del HTML usando una expresión regular
        const matchToken = htmlText.match(/name="__RequestVerificationToken" type="hidden" value="([^"]+)"/);

        if (!matchToken) {
          throw new Error("No se pudo encontrar el AntiForgeryToken en el HTML.");
        }

        const csrfToken = matchToken[1];
        console.log("2. Token extraído exitosamente:", csrfToken);

        console.log("3. Solicitando lista de Países...");
        // 3. Hacemos POST al endpoint de países, enviando el token en el Header
        // (Las cookies se envían solas gracias a Vite)
        const responsePaises = await fetch('/api-ccb/service/pais-relatorio', {
          method: 'POST',
          headers: {
            'AntiForgeryToken': csrfToken,
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        const datosPaises = await responsePaises.json();
        console.log("✅ ¡Éxito! Lista de Países:", datosPaises.list);

      } catch (error) {
        console.error("❌ Error en la prueba:", error);
      }
    };

    testCCBAPI();
  }, []);

  return (
    <div className="min-h-[300px]">
      {/* Contenido vacío temporalmente */}
    </div>
  );
}



