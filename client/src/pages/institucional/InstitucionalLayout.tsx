import { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function InstitucionalLayout() {
  const location = useLocation();
  const { t } = useLanguage();
  const [fontSize, setFontSize] = useState(14);

  const increaseFont = () => setFontSize(prev => Math.min(prev + 2, 24));
  const decreaseFont = () => setFontSize(prev => Math.max(prev - 2, 10));
  const resetFont = () => setFontSize(14);

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
        <div className="text-sm font-medium mb-6">
          <Link to="/" className="text-ccb-blue hover:underline">Institucional</Link>
          <span className="text-gray-400 mx-2">/</span>
          <span className="text-gray-600">{currentTitle}</span>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
            <h1 className="text-2xl font-bold text-ccb-blue uppercase">{currentTitle}</h1>
            <div className="flex space-x-2">
              <button onClick={decreaseFont} className="bg-ccb-dark hover:bg-ccb-blue transition-colors text-white w-8 h-8 flex items-center justify-center rounded text-sm font-bold cursor-pointer" title="Reducir letra">A</button>
              <button onClick={increaseFont} className="bg-ccb-dark hover:bg-ccb-blue transition-colors text-white w-8 h-8 flex items-center justify-center rounded text-lg font-bold cursor-pointer" title="Aumentar letra">A</button>
              <button onClick={resetFont} className="bg-ccb-dark hover:bg-ccb-blue transition-colors text-white w-8 h-8 flex items-center justify-center rounded cursor-pointer" title="Restablecer tamaño">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              </button>
            </div>
          </div>
          <div style={{ fontSize: `${fontSize}px` }} className="transition-all duration-200">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
