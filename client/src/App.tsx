import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import InstitucionalLayout from './pages/institucional/InstitucionalLayout';
import PaginaEjemplo from './pages/institucional/PaginaEjemplo';
import Estatuto from './pages/institucional/Estatuto';
import PuntosDoctrina from './pages/institucional/PuntosDoctrina';
import Contactenos from './pages/institucional/Contactenos';
import Relatorio from './pages/Relatorio';
import Ofrendas from './pages/Ofrendas';

import AreaRestringida from './pages/AreaRestringida';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';

// Import pages for the /servicios system
import RegistroPublico from './pages/servicios/RegistroPublico';
import ServiciosLayout from './pages/servicios/ServiciosLayout';
import Dashboard from './pages/servicios/Dashboard';
import Ancianos from './pages/servicios/Ancianos';
import Bautizos from './pages/servicios/Bautizos';
import SalasOracion from './pages/servicios/SalasOracion';
import SantasCenas from './pages/servicios/SantasCenas';

// Import SuperAdmin (acceso solo por URL directa, sin enlaces públicos)
import SuperAdminApp from './pages/superadmin/SuperAdminApp';

// Import pages for the /relatorio/admin system
import RelatorioLayout from './pages/relatorio_admin/RelatorioLayout';
import LeyendasMapa from './pages/relatorio_admin/LeyendasMapa';
import RegistroMapa from './pages/relatorio_admin/RegistroMapa';

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

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
