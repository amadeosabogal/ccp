import { useState, useRef, useEffect } from 'react';
import logo from '../assets/logo_bw.jpg';
import { Search, CheckSquare, Globe } from 'lucide-react';
import MapSelector from './Map/MapSelector';

export default function Header() {
  const [mapOpen, setMapOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <header className="flex items-center justify-between py-6">
        <div className="flex-1"></div>
        <div className="flex-1 flex justify-center">
          <img src={logo} alt="Congregación Cristiana" className="h-25 object-contain" />
        </div>
        <div className="flex-1 flex justify-end gap-4 text-gray-300 relative items-center">
          <Search size={22} className="text-gray-300 hover:text-gray-500 cursor-pointer transition-colors" />
          <CheckSquare size={22} className="text-gray-300 hover:text-gray-500 cursor-pointer transition-colors" />

          <div className="relative" ref={dropdownRef}>
            <Globe
              size={22}
              className={`cursor-pointer transition-colors ml-1 text-gray-200 hover:text-gray-400`}
              title="Registrar Casa de Oración"
              onClick={() => setMapOpen(true)}
            />
          </div>
        </div>
      </header>

      {mapOpen && <MapSelector onClose={() => setMapOpen(false)} isReadOnly={true} />}
    </>
  );
}
