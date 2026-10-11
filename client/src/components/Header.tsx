import { useState, useRef, useEffect } from 'react';
import logo from '../assets/logo_bw.webp';
import { Globe } from 'lucide-react';
import MapSelector from './Map/MapSelector';

export default function Header() {
  const [mapOpen, setMapOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenMap = () => setMapOpen(true);
    window.addEventListener('open-map-modal', handleOpenMap);
    return () => window.removeEventListener('open-map-modal', handleOpenMap);
  }, []);

  return (
    <>
      <header className="flex flex-col md:flex-row items-center justify-between py-4 md:py-6 gap-4">
        {/* Left column spacer to keep logo centered */}
        <div className="flex-1 hidden md:flex items-center"></div>

        {/* Center column: Official Logo */}
        <div className="flex-1 flex justify-center w-full">
          <img src={logo} alt="Congregación Cristiana" className="h-25 object-contain" />
        </div>

        {/* Right column: Action icons */}
        <div className="flex-1 flex justify-center md:justify-end gap-5 text-gray-300 relative items-center w-full mt-2 md:mt-0">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setMapOpen(true)}
              className="text-gray-300 hover:text-gray-500 cursor-pointer transition-colors p-1 rounded"
              title="Ver mapa en pantalla completa"
              aria-label="Ver mapa"
            >
              <Globe size={22} />
            </button>
          </div>
        </div>
      </header>

      {mapOpen && <MapSelector onClose={() => setMapOpen(false)} isReadOnly={true} />}
    </>
  );
}
