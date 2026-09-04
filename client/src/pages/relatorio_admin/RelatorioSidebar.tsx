import { Link, useLocation } from 'react-router-dom';
import { 
  MapPin,
  Map,
  LogOut,
  X
} from 'lucide-react';
import logo from '../../assets/logo_bw_transparent.png';

interface SidebarProps {
  onLogout: () => void;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

export default function RelatorioSidebar({ onLogout, isOpen = false, setIsOpen }: SidebarProps) {
  const location = useLocation();

  const navigation = [
    { name: 'Leyendas Mapa', href: '/relatorio/admin', icon: Map },
    { name: 'Registrar Puntos', href: '/relatorio/admin/registro-mapa', icon: MapPin },
  ];

  return (
    <>
      {/* Overlay para móviles */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 md:hidden transition-opacity" 
          onClick={() => setIsOpen?.(false)}
        />
      )}

      {/* Sidebar principal */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-24 border-b border-gray-200 px-6">
          <Link to="/" className="flex items-center justify-center w-full h-full py-2">
            <img src={logo} alt="Logo" className="h-full w-auto object-contain" />
          </Link>
          <button 
            onClick={() => setIsOpen?.(false)}
            className="md:hidden p-2 -mr-2 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen?.(false)}
                  className={`
                    flex items-center px-6 py-3 text-sm font-bold transition-colors border-l-2
                    ${isActive 
                      ? 'border-ccb-dark bg-gray-50 text-ccb-dark' 
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                  `}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? 'text-ccb-dark' : 'text-gray-400'}`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="flex w-full items-center px-3 py-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
          >
            <LogOut className="mr-3 flex-shrink-0 h-4 w-4 text-gray-400" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  );
}
