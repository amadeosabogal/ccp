import { useState, useRef } from 'react';
import logo from '../assets/logo_bw.jpg';
import { Search, CheckSquare, Globe } from 'lucide-react';
import MapSelector from './Map/MapSelector';

export default function Header() {
  const [mapOpen, setMapOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <header className="flex flex-col md:flex-row items-center justify-between py-4 md:py-6 gap-4">
        <div className="flex-1 hidden md:block"></div>
        <div className="flex-1 flex justify-center w-full">
          <img src={logo} alt="Congregación Cristiana" className="h-25 object-contain" />
        </div>
        <div className="flex-1 flex justify-center md:justify-end gap-6 text-gray-300 relative items-center w-full mt-2 md:mt-0">
          <Search size={22} className="text-gray-300 hover:text-gray-500 cursor-pointer transition-colors" />
          <CheckSquare size={22} className="text-gray-300 hover:text-gray-500 cursor-pointer transition-colors" />

          <div className="relative" ref={dropdownRef}>
            <Globe
              size={22}
              className={`cursor-pointer transition-colors ml-1 text-gray-200 hover:text-gray-400`}

              onClick={() => setMapOpen(true)}
            />
          </div>
        </div>
      </header>

      {mapOpen && <MapSelector onClose={() => setMapOpen(false)} isReadOnly={true} />}
    </>
  );
}
