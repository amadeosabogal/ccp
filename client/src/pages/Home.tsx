import { useLanguage } from '../context/LanguageContext';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  const { t } = useLanguage();
  return (
    <>
      <Helmet>
        <title>Congregación Cristiana en el Perú | Inicio</title>
        <meta name="description" content="Bienvenido al sitio oficial de la Congregación Cristiana en el Perú. Encuentre información sobre nuestras salas de oración, servicios, horarios e información institucional." />
        <meta property="og:title" content="Congregación Cristiana en el Perú | Inicio" />
        <meta property="og:description" content="Sitio oficial de la Congregación Cristiana en el Perú. Información, servicios y horarios." />
        <link rel="canonical" href="https://www.congregacioncristianaenelperu.org/" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Congregación Cristiana en el Perú",
              "url": "https://www.congregacioncristianaenelperu.org/",
              "logo": "https://www.congregacioncristianaenelperu.org/logo.webp",
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
