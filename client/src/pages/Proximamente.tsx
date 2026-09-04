import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Proximamente() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold text-ccb-blue mb-6 tracking-widest uppercase">{t('general.proximamente')}</h1>
      <p className="text-gray-500 text-lg mb-10 max-w-lg">
        {t('general.en_construccion')}
      </p>
      <button 
        onClick={() => navigate(-1)} 
        className="bg-[#003853] text-white px-8 py-3 rounded-sm text-sm font-semibold hover:bg-ccb-dark uppercase tracking-wide transition-colors"
      >
        {t('general.volver_atras')}
      </button>
    </div>
  );
}
