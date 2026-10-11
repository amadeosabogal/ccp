import { Link } from 'react-router-dom';
import logo from '../assets/logo_bw_transparent.webp';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const paginasPrincipales = [
    { label: t('nav.inicio'), path: '/' },
    { label: t('nav.relatorio'), path: '/relatorio' },
    { label: t('nav.ofrendas'), path: '/ofrendas' },
  ];

  const paginasInstitucionales = [
    { label: t('nav.quienes_somos'), path: '/institucional/quienes-somos' },
    { label: t('nav.historia'), path: '/institucional/historia' },
    { label: t('nav.estatuto'), path: '/institucional/estatuto' },
    { label: t('nav.puntos_doctrina'), path: '/institucional/puntos-de-doctrina' },
    { label: t('nav.contactenos'), path: '/institucional/contactenos' },
  ];

  return (
    <footer className="bg-[#d4d9e2] border-t-4 border-ccb-blue text-sm text-ccb-blue select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-ccb-blue/20">
          
          {/* Column 1: Brand & Identity (6 cols) */}
          <div className="md:col-span-6 flex flex-col items-start space-y-3">
            <Link to="/" className="inline-block group" aria-label="Inicio">
              <img
                src={logo}
                alt="Congregación Cristiana en el Perú"
                className="h-20 md:h-24 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
            <h2 className="text-base font-bold text-ccb-blue tracking-wide">
              {t('footer.titulo')}
            </h2>
            <p className="text-xs text-ccb-blue leading-relaxed">
              {t('footer.direccion')}
            </p>
          </div>

          {/* Column 2: Páginas Principales (3 cols) */}
          <div className="md:col-span-3 flex flex-col space-y-3">
            <h3 className="text-xs font-bold text-ccb-blue tracking-widest uppercase pb-1 border-b border-ccb-blue/20 inline-block">
              {t('footer.paginas_principales')}
            </h3>
            <ul className="space-y-2.5 pt-1">
              {paginasPrincipales.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="text-ccb-blue hover:text-ccb-dark hover:underline transition-colors font-medium inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Institucional (3 cols) */}
          <div className="md:col-span-3 flex flex-col space-y-3">
            <h3 className="text-xs font-bold text-ccb-blue tracking-widest uppercase pb-1 border-b border-ccb-blue/20 inline-block">
              {t('footer.institucional')}
            </h3>
            <ul className="space-y-2.5 pt-1">
              {paginasInstitucionales.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="text-ccb-blue hover:text-ccb-dark hover:underline transition-colors inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Scroll to top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ccb-blue">
          <p className="text-center sm:text-left">
            &copy; {currentYear} {t('footer.titulo')}. {t('footer.derechos')}
          </p>

          <button
            onClick={scrollToTop}
            className="text-ccb-blue hover:text-ccb-dark font-medium cursor-pointer transition-colors px-2 py-1 rounded hover:underline hover:bg-white/40"
            aria-label={t('footer.volver_arriba')}
          >
            {t('footer.volver_arriba')}
          </button>
        </div>
      </div>
    </footer>
  );
}


