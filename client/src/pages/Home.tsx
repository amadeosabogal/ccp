import { useLanguage } from '../context/LanguageContext';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  const { t } = useLanguage();
  return (
    <>
      <Helmet>
        <title>Inicio | Congregación Cristiana</title>
        <meta name="description" content="Bienvenido al sitio oficial de la Congregación Cristiana. Encuentre información sobre nuestras salas de oración, servicios, y estatutos." />
        <meta property="og:title" content="Inicio | Congregación Cristiana" />
        <meta property="og:description" content="Sitio oficial de la Congregación Cristiana. Información, servicios y horarios." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Congregación Cristiana en el Perú",
              "url": "https://congregacion-landing.vercel.app/",
              "logo": "https://congregacion-landing.vercel.app/logo.webp",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer support"
              }
            }
          `}
        </script>
      </Helmet>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        {/* SEO Header - Visually subtle but structurally an H1 */}
        <h1 className="text-3xl md:text-4xl font-bold text-ccb-blue mb-2">Congregación Cristiana en el Perú</h1>
        <p className="text-xl font-medium text-gray-500 mb-8 tracking-widest uppercase">{t('general.proximamente')}</p>
        <p className="text-gray-500 text-lg max-w-2xl">Sitio web oficial en construcción. Aquí encontrará información sobre nuestras salas de oración, servicios, horarios e información institucional.</p>
      </main>
    </>
  );
}
