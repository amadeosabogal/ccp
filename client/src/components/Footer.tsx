import logo from '../assets/logo_bw_transparent.png';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#d4d9e2] border-t-4 border-ccb-blue pt-12 pb-16 text-sm text-ccb-blue">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-8">
        <img src={logo} alt="Congregación Cristiana en Brasil" className="h-20 object-contain opacity-90" />
        <h3 className="text-2xl font-bold tracking-widest uppercase text-ccb-blue">{t('general.proximamente')}</h3>
      </div>
    </footer>
  );
}
