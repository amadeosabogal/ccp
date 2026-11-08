import { useLanguage } from '../../context/LanguageContext';

export default function PaginaEjemplo() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[350px] text-center p-8 bg-gray-50/50 rounded-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-ccb-blue mb-3">
        {t('general.proximamente')}
      </h2>
      <p className="text-gray-500 max-w-md text-sm">
        {t('general.en_construccion')}
      </p>
    </div>
  );
}
