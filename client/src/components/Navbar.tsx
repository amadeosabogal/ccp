import { Lock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const location = useLocation();
  const { t } = useLanguage();

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

  return (
    <nav className="flex items-center justify-between text-sm font-semibold relative">
      <div className="flex items-center space-x-1 divide-x divide-ccb-blue">
        {links.map((link, idx) => {
          const isActive = link.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith('/' + link.path.split('/')[1]);

          return (
            <div key={idx} className="group relative">
              <Link
                to={link.path}
                className={`px-5 py-3 flex items-center transition-colors ${isActive ? 'text-ccb-blue' : 'text-ccb-blue/80 hover:text-ccb-blue'}`}
              >
                <span>{link.label}</span>
                {link.dropdown && (
                  <svg className="w-4 h-4 ml-1 text-ccb-blue/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                )}
              </Link>

              {/* Dropdown Menu */}
              {link.sublinks && (
                <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg border border-gray-200 z-50 min-w-[200px]">
                  {link.sublinks.map((sub, sIdx) => (
                    <Link
                      key={sIdx}
                      to={sub.path}
                      className="block px-6 py-3 text-ccb-blue font-bold hover:bg-gray-50 border-b border-gray-100 last:border-b-0 whitespace-nowrap"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Link to="/area-restringida" className="flex items-center gap-2 bg-[#d4d9e2] text-ccb-blue px-6 py-3 font-semibold hover:bg-[#c9d4de] transition-colors">
        <Lock size={18} />
        {t('nav.area_restringida')}
      </Link>
    </nav>
  );
}
