import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold text-ccb-blue mb-6 tracking-widest uppercase">{t('general.proximamente')}</h1>
      <p className="text-gray-500 text-lg">Estamos trabajando en los contenidos de esta sección.</p>
    </main>
  );
}
