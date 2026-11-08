import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      <header className="relative flex items-center justify-between py-3 md:py-6">
        {/* Left column spacer to keep logo centered on desktop */}
        <div className="hidden md:flex flex-1 items-center"></div>

        {/* Center column: Official Logo */}
        <div className="flex-1 flex justify-center">
          <Link to="/" className="inline-block focus:outline-none">
            <img 
              src={logo} 
              alt="Congregación Cristiana" 
              className="h-16 sm:h-20 md:h-24 object-contain max-w-full" 
            />
          </Link>
        </div>

        {/* Right column: Action icons */}
        <div className="absolute right-0 md:relative md:flex-1 flex justify-end items-center text-gray-400">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setMapOpen(true)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors p-2 rounded-full hover:bg-gray-100"
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
