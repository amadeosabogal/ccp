import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LoginProps {
  onLogin: () => void;
}

export default function RelatorioLogin({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ usuario: username, password, modulo: 'relatorios' })
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('relatorio_user', JSON.stringify(data.user));
        onLogin();
      } else {
        setError(data.error || 'Credenciales incorrectas');
      }
    } catch (e) {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative font-sans">
      <div className="absolute top-4 left-4">
        <Link to="/area-restringida" className="text-sm font-semibold text-ccb-blue hover:underline">
          &larr; Volver al Área Restringida
        </Link>
      </div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-sm border border-gray-100 rounded-lg sm:px-12">
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-black mb-1">
              Autenticación
            </h2>
            <p className="text-sm font-semibold text-gray-500">
              Ingrese sus credenciales (Relatorios)
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
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full py-2 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-ccb-blue bg-transparent text-gray-900 text-sm transition-colors"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full py-2 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-ccb-blue bg-transparent text-gray-900 text-sm transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-bold text-white bg-ccb-blue hover:bg-ccb-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ccb-blue uppercase transition-colors rounded"
              >
                Ingresar al Sistema
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
