import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function InstallServiciosPrompt() {
  const { t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(true); // default true until verified
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    // 1. Check if currently running in standalone PWA mode
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true ||
      document.referrer.includes('android-app://');

    // 2. Check if previously marked as installed in localStorage
    const savedInstalled = localStorage.getItem('pwa_servicios_installed') === 'true';

    if (isStandalone || savedInstalled) {
      setIsInstalled(true);
      return;
    }

    // App is not installed yet
    setIsInstalled(false);

    // 3. Listen for native browser PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstalled(false);
    };

    // 4. Listen for successful installation event
    const handleAppInstalled = () => {
      localStorage.setItem('pwa_servicios_installed', 'true');
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowInstructions(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice && choice.outcome === 'accepted') {
          localStorage.setItem('pwa_servicios_installed', 'true');
          setIsInstalled(true);
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.error('Error invoking install prompt:', err);
      }
    } else {
      // Fallback instructions if native prompt is not directly available
      setShowInstructions(true);
    }
  };

  // If already installed, do not render anything
  if (isInstalled) {
    return null;
  }

  return (
    <>
      {/* Botón flotante circular abajo a la derecha */}
      <aside aria-label="Instalar Servicios" className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={handleInstallClick}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-ccb-blue hover:bg-ccb-dark text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-4 focus:ring-ccb-blue/30"
          title={t('home.instalar_servicios') || 'Instalar Servicios'}
          aria-label={t('home.instalar_servicios') || 'Instalar Servicios'}
        >
          <Download className="w-6 h-6 transition-transform group-hover:-translate-y-0.5" />
          
          {/* Tooltip flotante al hacer hover */}
          <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900/90 backdrop-blur-xs text-white text-xs font-semibold rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {t('home.instalar_servicios') || 'Instalar Servicios'}
          </span>
        </button>
      </aside>

      {/* Instructional modal for browsers without direct beforeinstallprompt */}
      {showInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative border border-gray-200">
            <button
              type="button"
              onClick={() => setShowInstructions(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-ccb-blue/10 text-ccb-blue flex items-center justify-center">
                <Download size={20} />
              </div>
              <h4 className="text-base font-bold text-ccb-blue">
                Instalar Aplicación de Servicios
              </h4>
            </div>

            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
              Para instalar el acceso directo a la plataforma de Servicios en tu dispositivo:
            </p>

            <ul className="text-xs text-gray-700 space-y-2.5 mb-6 bg-gray-50 p-3.5 rounded border border-gray-100">
              <li className="flex items-start gap-2">
                <span className="font-bold text-ccb-blue">1.</span>
                <span>En <strong>Chrome o Edge</strong>: Presiona el ícono de instalar en la barra de direcciones o en el menú <strong>(⋮) &gt; Instalar aplicación</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-ccb-blue">2.</span>
                <span>En <strong>Safari (iPhone/iPad)</strong>: Pulsa el botón <strong>Compartir</strong> y selecciona <strong>Agregar al inicio</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-ccb-blue">3.</span>
                <span>Al abrir la app instalada, entrarás directamente a la ruta <strong>/servicios</strong>.</span>
              </li>
            </ul>

            <div className="flex justify-between items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  localStorage.setItem('pwa_servicios_installed', 'true');
                  setIsInstalled(true);
                  setShowInstructions(false);
                }}
                className="text-xs text-gray-500 hover:text-ccb-blue underline cursor-pointer"
              >
                Ya la tengo instalada
              </button>

              <button
                type="button"
                onClick={() => setShowInstructions(false)}
                className="bg-ccb-blue hover:bg-ccb-dark text-white text-xs font-bold px-4 py-2 rounded transition-colors cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
