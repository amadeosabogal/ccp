import { Outlet, useLocation, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useFontSize } from '../../context/FontSizeContext';
import FontSizeControls from '../../components/FontSizeControls';

export default function InstitucionalLayout() {
  const location = useLocation();
  const { t } = useLanguage();
  const { fontSize, fontScale } = useFontSize();

  const pathNames: Record<string, string> = {
    '/institucional/quienes-somos': t('nav.quienes_somos'),
    '/institucional/estatuto': t('nav.estatuto'),
    '/institucional/historia': t('nav.historia'),
    '/institucional/puntos-de-doctrina': t('nav.puntos_doctrina'),
    '/institucional/contactenos': t('nav.contactenos'),
  };

  const currentTitle = pathNames[location.pathname] || 'Institucional';

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Breadcrumb */}
        <div className="text-sm font-medium mb-6 no-font-scale">
          <Link to="/" className="text-ccb-blue hover:underline">Institucional</Link>
          <span className="text-gray-400 mx-2">/</span>
          <span className="text-gray-600">{currentTitle}</span>
        </div>

        {/* Content Box */}
        <div 
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 content-scalable transition-all duration-200"
          style={{ 
            fontSize: `${fontSize}px`,
            '--route-font-size': `${fontSize}px`,
            '--font-scale': fontScale
          } as React.CSSProperties}
        >
          <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
            <h1 className="text-2xl font-bold text-ccb-blue uppercase">{currentTitle}</h1>
            <FontSizeControls />
          </div>
          <div className="transition-all duration-200">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
