import { useState, useEffect } from 'react';
import SuperAdminLogin from './SuperAdminLogin';
import SuperAdminDashboard from './SuperAdminDashboard';

export default function SuperAdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Validar si la cookie de sesión es válida
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          if (data.user.rol === 'super') {
            setIsAuthenticated(true);
          }
        } else {
          localStorage.removeItem('super_user');
        }
      } catch (error) {
        console.error('Error checking session', error);
      }
    };
    checkSession();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch (e) {
      console.error(e);
    }
    localStorage.removeItem('super_user');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <SuperAdminLogin onLogin={handleLogin} />;
  }

  return <SuperAdminDashboard onLogout={handleLogout} />;
}
