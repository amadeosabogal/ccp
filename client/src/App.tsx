import { lazy, Suspense } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));
const InstitucionalLayout = lazy(() => import('./pages/institucional/InstitucionalLayout'));
const PaginaEjemplo = lazy(() => import('./pages/institucional/PaginaEjemplo'));
const Estatuto = lazy(() => import('./pages/institucional/Estatuto'));
const PuntosDoctrina = lazy(() => import('./pages/institucional/PuntosDoctrina'));
const Contactenos = lazy(() => import('./pages/institucional/Contactenos'));
const Relatorio = lazy(() => import('./pages/Relatorio'));
const Ofrendas = lazy(() => import('./pages/Ofrendas'));

const AreaRestringida = lazy(() => import('./pages/AreaRestringida'));
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';

// Import pages for the /servicios system
const RegistroPublico = lazy(() => import('./pages/servicios/RegistroPublico'));
const ServiciosLayout = lazy(() => import('./pages/servicios/ServiciosLayout'));
const Dashboard = lazy(() => import('./pages/servicios/Dashboard'));
const Ancianos = lazy(() => import('./pages/servicios/Ancianos'));
const Bautizos = lazy(() => import('./pages/servicios/Bautizos'));
const SalasOracion = lazy(() => import('./pages/servicios/SalasOracion'));
const SantasCenas = lazy(() => import('./pages/servicios/SantasCenas'));

// Import SuperAdmin (acceso solo por URL directa, sin enlaces públicos)
const SuperAdminApp = lazy(() => import('./pages/superadmin/SuperAdminApp'));

// Import pages for the /relatorio/admin system
const RelatorioLayout = lazy(() => import('./pages/relatorio_admin/RelatorioLayout'));
const LeyendasMapa = lazy(() => import('./pages/relatorio_admin/LeyendasMapa'));
const RegistroMapa = lazy(() => import('./pages/relatorio_admin/RegistroMapa'));

function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Header />
      </div>
      <div className="border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Navbar />
        </div>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

import RouteTracker from './components/RouteTracker';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <RouteTracker />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">Cargando...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/relatorio" element={<Relatorio />} />
              <Route path="/ofrendas" element={<Ofrendas />} />
              <Route path="/area-restringida" element={<AreaRestringida />} />
              <Route path="/institucional" element={<InstitucionalLayout />}>
                <Route path="quienes-somos" element={<PaginaEjemplo />} />
                <Route path="estatuto" element={<Estatuto />} />
                <Route path="historia" element={<PaginaEjemplo />} />
                <Route path="puntos-de-doctrina" element={<PuntosDoctrina />} />
                <Route path="contactenos" element={<Contactenos />} />
              </Route>
            </Route>

            {/* SuperAdmin - Solo accesible por URL directa */}
            <Route path="/super-admin" element={<SuperAdminApp />} />

            {/* Public Facing Registration Form for Elders */}
            <Route path="/servicios" element={<RegistroPublico />} />

            {/* Hidden Internal System Routes (Admin Portal) */}
            <Route path="/servicios/admin" element={<ServiciosLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="ancianos" element={<Ancianos />} />
              <Route path="bautizos" element={<Bautizos />} />
              <Route path="salas" element={<SalasOracion />} />
              <Route path="santas-cenas" element={<SantasCenas />} />
            </Route>

            {/* Relatorios System Routes */}
            <Route path="/relatorio/admin" element={<RelatorioLayout />}>
              <Route index element={<LeyendasMapa />} />
              <Route path="registro-mapa" element={<RegistroMapa />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
