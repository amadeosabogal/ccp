import { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SuperLoginProps {
  onLogin: () => void;
}

export default function SuperAdminLogin({ onLogin }: SuperLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Para enviar/recibir cookies
        body: JSON.stringify({ usuario: username, password, modulo: 'super' })
      });
      const data = await res.json();

      if (res.ok) {
        // El token ahora viene en una cookie HttpOnly
        localStorage.setItem('super_user', JSON.stringify(data.user));
        onLogin();
      } else {
        setError(data.error || 'Credenciales incorrectas');
      }
    } catch {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-sm border border-gray-100 rounded-lg sm:px-12">

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-black mb-1">
              Super Administrador
            </h2>
            <p className="text-sm font-semibold text-gray-500">
              Ingrese sus credenciales de acceso superior
            </p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-600 text-sm font-semibold p-3 text-center rounded border border-red-200">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-900 mb-2">
                Usuario
              </label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="block w-full py-2 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-ccb-blue bg-transparent text-gray-900 text-sm transition-colors"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="block w-full py-2 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-ccb-blue bg-transparent text-gray-900 text-sm transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-bold text-white bg-ccb-blue hover:bg-ccb-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ccb-blue uppercase transition-colors rounded disabled:opacity-60"
              >
                {loading ? 'Verificando...' : (
                  <>Ingresar al Sistema <ArrowRight className="ml-2 w-4 h-4" /></>
                )}
              </button>
            </div>
            
            <div className="text-center mt-6">
              <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-ccb-blue transition-colors">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Volver a la página principal
              </Link>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
