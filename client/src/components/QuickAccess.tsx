import { Link } from 'react-router-dom';
import { Map, Lock, ClipboardList, HandCoins } from 'lucide-react';
import logo from '../assets/logo_bw_transparent.webp';
import { useLanguage } from '../context/LanguageContext';

export default function QuickAccess() {
  const { t } = useLanguage();

  const cards = [
    { 
      icon: (
        <img 
          src={logo} 
          alt="Institucional" 
          className="h-12 w-auto object-contain mb-3 group-hover:scale-105 transition-transform duration-200" 
        />
      ), 
      label: t('nav.institucional'),
      path: '/institucional/quienes-somos'
    },
    { 
      icon: <Map className="w-12 h-12 mb-3 text-ccb-blue stroke-[1.5] group-hover:scale-105 transition-transform duration-200" />, 
      label: t('home.mapa'),
      onClick: () => {
        window.dispatchEvent(new CustomEvent('open-map-modal'));
      }
    },
    { 
      icon: <Lock className="w-12 h-12 mb-3 text-ccb-blue stroke-[1.5] group-hover:scale-105 transition-transform duration-200" />, 
      label: t('nav.area_restringida'),
      path: '/area-restringida'
    },
    { 
      icon: <ClipboardList className="w-12 h-12 mb-3 text-ccb-blue stroke-[1.5] group-hover:scale-105 transition-transform duration-200" />, 
      label: t('nav.relatorio'),
      path: '/relatorio'
    },
    { 
      icon: <HandCoins className="w-12 h-12 mb-3 text-ccb-blue stroke-[1.5] group-hover:scale-105 transition-transform duration-200" />, 
      label: t('nav.ofrendas'),
      path: '/ofrendas'
    },
  ];

  const commonClasses = "border border-gray-300 rounded-md p-6 sm:p-8 flex flex-col items-center justify-center hover:shadow-md hover:border-ccb-blue transition-all duration-200 cursor-pointer bg-white group text-center select-none min-h-[140px] w-full";

  return (
    <section className="w-full">
      <div className="flex items-center mb-6">
        <h2 className="text-ccb-blue font-bold text-lg md:text-xl whitespace-nowrap mr-4">
          {t('home.acesso_rapido')}
        </h2>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card, idx) => {
          const cardContent = (
            <>
              {card.icon}
              <span className="text-sm font-bold text-ccb-blue group-hover:text-ccb-dark transition-colors">
                {card.label}
              </span>
            </>
          );

          if (card.onClick) {
            return (
              <button
                key={idx}
                type="button"
                onClick={card.onClick}
                className={commonClasses}
                title="Abrir mapa en pantalla completa"
              >
                {cardContent}
              </button>
            );
          }

          return (
            <Link
              key={idx}
              to={card.path!}
              className={commonClasses}
            >
              {cardContent}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

