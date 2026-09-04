import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import RelatorioSidebar from './RelatorioSidebar';
import RelatorioLogin from './RelatorioLogin';

export default function RelatorioLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          const roles = data.user.rol ? data.user.rol.split(',').map((r: string) => r.trim()) : [];
          if (roles.includes('relatorios')) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('relatorio_user');
          }
        } else {
          localStorage.removeItem('relatorio_user');
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/relatorio/admin');
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch (e) {
      console.error(e);
    }
    setIsAuthenticated(false);
    localStorage.removeItem('relatorio_user');
    navigate('/relatorio/admin');
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-gray-50">Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <RelatorioLogin onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      <RelatorioSidebar 
        onLogout={handleLogout} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar móvil */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <div className="text-lg font-bold text-gray-900">Relatorios</div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -mr-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
