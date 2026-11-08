import { useState, useEffect, useRef } from 'react';
import { Lock, Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const location = useLocation();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileDropdownOpen(false);
    setDesktopDropdownOpen(false);
  }, [location.pathname]);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(e.target as Node)) {
        setDesktopDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const institucionalLinks = [
    { label: t('nav.quienes_somos'), path: '/institucional/quienes-somos' },
    { label: t('nav.estatuto'), path: '/institucional/estatuto' },
    { label: t('nav.historia'), path: '/institucional/historia' },
    { label: t('nav.puntos_doctrina'), path: '/institucional/puntos-de-doctrina' },
    { label: t('nav.contactenos'), path: '/institucional/contactenos' },
  ];

  const links = [
    { label: t('nav.inicio'), path: '/' },
    { label: t('nav.institucional'), path: '/institucional/quienes-somos', dropdown: true, sublinks: institucionalLinks },
    { label: t('nav.relatorio'), path: '/relatorio' },
    { label: t('nav.ofrendas'), path: '/ofrendas' },
  ];

  const isInstitucionalActive = location.pathname.startsWith('/institucional');

  return (
    <nav className="relative w-full">
      {/* ================= MOBILE NAVIGATION BAR (< md) ================= */}
      <div className="md:hidden flex items-center justify-between py-2.5">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center gap-2 px-3 py-2 text-ccb-blue font-semibold hover:bg-gray-100 rounded-md transition-colors focus:outline-none"
          aria-expanded={mobileMenuOpen}
          aria-label="Abrir menú de navegación"
        >
          {mobileMenuOpen ? <X size={24} className="text-ccb-blue" /> : <Menu size={24} className="text-ccb-blue" />}
          <span className="text-sm uppercase tracking-wide">
            {mobileMenuOpen ? 'Cerrar' : 'Menú'}
          </span>
        </button>

        <Link
          to="/area-restringida"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-1.5 bg-[#d4d9e2] text-ccb-blue px-3.5 py-1.5 rounded text-xs font-semibold hover:bg-[#c9d4de] transition-colors"
        >
          <Lock size={15} />
          <span>{t('nav.area_restringida')}</span>
        </Link>
      </div>

      {/* ================= MOBILE COLLAPSIBLE DRAWER / ACCORDION (< md) ================= */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 py-2 space-y-1 bg-white animate-fadeIn">
          {/* Inicio */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-3 rounded-md font-semibold text-sm transition-colors ${
              location.pathname === '/' 
                ? 'bg-ccb-blue/10 text-ccb-blue font-bold border-l-4 border-ccb-blue' 
                : 'text-gray-700 hover:bg-gray-50 hover:text-ccb-blue'
            }`}
          >
            {t('nav.inicio')}
          </Link>

          {/* Institucional (Accordion for Mobile) */}
          <div className="border-y border-gray-100 my-1">
            <div className="flex items-center justify-between">
              <Link
                to="/institucional/quienes-somos"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex-1 px-4 py-3 font-semibold text-sm transition-colors ${
                  isInstitucionalActive 
                    ? 'text-ccb-blue font-bold' 
                    : 'text-gray-700 hover:text-ccb-blue'
                }`}
              >
                {t('nav.institucional')}
              </Link>
              <button
                type="button"
                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                className="px-4 py-3 text-gray-500 hover:text-ccb-blue focus:outline-none"
                aria-label="Desplegar opciones de Institucional"
              >
                <ChevronDown 
                  size={18} 
                  className={`transition-transform duration-200 ${mobileDropdownOpen ? 'rotate-180 text-ccb-blue' : ''}`} 
                />
              </button>
            </div>

            {/* Sublinks */}
            {mobileDropdownOpen && (
              <div className="bg-gray-50 pl-6 pr-4 py-2 space-y-1 border-t border-gray-100">
                {institucionalLinks.map((sub, sIdx) => {
                  const isSubActive = location.pathname === sub.path;
                  return (
                    <Link
                      key={sIdx}
                      to={sub.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-2.5 px-3 rounded text-sm transition-colors ${
                        isSubActive 
                          ? 'text-ccb-blue font-bold bg-white shadow-xs border-l-2 border-ccb-blue' 
                          : 'text-gray-600 hover:text-ccb-blue hover:bg-white/60'
                      }`}
                    >
                      {sub.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Relatório */}
          <Link
            to="/relatorio"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-3 rounded-md font-semibold text-sm transition-colors ${
              location.pathname === '/relatorio' 
                ? 'bg-ccb-blue/10 text-ccb-blue font-bold border-l-4 border-ccb-blue' 
                : 'text-gray-700 hover:bg-gray-50 hover:text-ccb-blue'
            }`}
          >
            {t('nav.relatorio')}
          </Link>

          {/* Ofrendas */}
          <Link
            to="/ofrendas"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-3 rounded-md font-semibold text-sm transition-colors ${
              location.pathname === '/ofrendas' 
                ? 'bg-ccb-blue/10 text-ccb-blue font-bold border-l-4 border-ccb-blue' 
                : 'text-gray-700 hover:bg-gray-50 hover:text-ccb-blue'
            }`}
          >
            {t('nav.ofrendas')}
          </Link>
        </div>
      )}

      {/* ================= DESKTOP NAVIGATION BAR (md:) ================= */}
      <div className="hidden md:flex items-center justify-between text-sm font-semibold">
        <div className="flex items-center divide-x divide-ccb-blue">
          {links.map((link, idx) => {
            const isActive = link.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith('/' + link.path.split('/')[1]);

            if (link.dropdown) {
              return (
                <div 
                  key={idx} 
                  ref={desktopDropdownRef}
                  className="group relative"
                  onMouseEnter={() => setDesktopDropdownOpen(true)}
                  onMouseLeave={() => setDesktopDropdownOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}
                    className={`px-5 py-3 flex items-center transition-colors cursor-pointer ${
                      isActive ? 'text-ccb-blue font-bold' : 'text-ccb-blue/80 hover:text-ccb-blue'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown size={16} className={`ml-1 transition-transform ${desktopDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Desktop Dropdown Menu */}
                  {desktopDropdownOpen && link.sublinks && (
                    <div className="absolute left-0 top-full bg-white shadow-lg border border-gray-200 z-50 min-w-[220px] rounded-b-md">
                      {link.sublinks.map((sub, sIdx) => {
                        const isSubActive = location.pathname === sub.path;
                        return (
                          <Link
                            key={sIdx}
                            to={sub.path}
                            onClick={() => setDesktopDropdownOpen(false)}
                            className={`block px-6 py-3 font-medium hover:bg-gray-50 border-b border-gray-100 last:border-b-0 whitespace-nowrap transition-colors ${
                              isSubActive ? 'text-ccb-blue font-bold bg-blue-50/50' : 'text-ccb-blue'
                            }`}
                          >
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div key={idx}>
                <Link
                  to={link.path}
                  className={`px-5 py-3 flex items-center transition-colors ${
                    isActive ? 'text-ccb-blue font-bold' : 'text-ccb-blue/80 hover:text-ccb-blue'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              </div>
            );
          })}
        </div>

        <Link 
          to="/area-restringida" 
          className="flex items-center gap-2 bg-[#d4d9e2] text-ccb-blue px-6 py-3 font-semibold hover:bg-[#c9d4de] transition-colors"
        >
          <Lock size={18} />
          {t('nav.area_restringida')}
        </Link>
      </div>
    </nav>
  );
}
