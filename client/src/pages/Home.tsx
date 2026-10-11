import { Helmet } from 'react-helmet-async';
import Announcements from '../components/Announcements';
import QuickAccess from '../components/QuickAccess';

export default function Home() {
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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">
        {/* SEO Header */}
        <div className="text-center pt-2">
          <h1 className="text-3xl md:text-4xl font-bold text-ccb-blue tracking-tight">
            Congregación Cristiana en el Perú
          </h1>
        </div>
        <Announcements />
        <QuickAccess />
      </main>
    </>
  );
}
