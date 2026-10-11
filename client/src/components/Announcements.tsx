
import { useLanguage } from '../context/LanguageContext';

export default function Announcements() {
  const { t } = useLanguage();

  const message = t('home.sin_anuncios');

  return (
    <section className="w-full">
      <div className="flex items-center mb-3">
        <h2 className="text-ccb-blue font-bold text-lg md:text-xl whitespace-nowrap mr-4">
          {t('home.comunicado_importante')}
        </h2>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>
      <div className="overflow-hidden text-sm text-gray-800 py-1">
        <div className="flex space-x-16 animate-marquee whitespace-nowrap hover:[animation-play-state:paused] cursor-pointer">
          <span className="hover:text-ccb-blue transition-colors font-medium">
            {message}
          </span>
          {/* Duplicado para ciclo continuo fluido */}
          <span className="hover:text-ccb-blue transition-colors font-medium">
            {message}
          </span>
        </div>
      </div>
    </section>
  );
}

