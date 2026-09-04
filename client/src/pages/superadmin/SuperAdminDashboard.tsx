import { Users, Building2, Droplets, LogOut, ShieldCheck, Plus, X, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import logo from '../../assets/logo_bw_transparent.png';

interface SuperAdminDashboardProps {
  onLogout: () => void;
}

export default function SuperAdminDashboard({ onLogout }: SuperAdminDashboardProps) {
  const [stats, setStats] = useState({ salas: 0, ancianos: 0, servicios: 0, usuarios: 0 });
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'usuarios'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [formNombre, setFormNombre] = useState('');
  const [formUsuario, setFormUsuario] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formModulos, setFormModulos] = useState<string[]>(['servicios']);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Password reset states
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const user = JSON.parse(localStorage.getItem('super_user') || '{}');

  const authHeaders = {
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    fetchStats();
    fetchUsuarios();
  }, []);

  const fetchStats = async () => {
    try {
      const [resSalas, resAncianos, resServicios] = await Promise.all([
        fetch('/api/salas'),
        fetch('/api/ancianos'),
        fetch('/api/servicios'),
      ]);
      const salas = resSalas.ok ? await resSalas.json() : [];
      const ancianos = resAncianos.ok ? await resAncianos.json() : [];
      const servicios = resServicios.ok ? await resServicios.json() : [];
      setStats(s => ({ ...s, salas: salas.length, ancianos: ancianos.length, servicios: servicios.length }));
    } catch (e) {
      console.error(e);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const res = await fetch('/api/usuarios', { 
        headers: authHeaders,
        credentials: 'include' 
      });
      if (res.ok) {
        const data = await res.json();
        setUsuarios(data);
        setStats(s => ({ ...s, usuarios: data.length }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!window.confirm('¿Eliminar este usuario?')) return;
    try {
      await fetch(`/api/usuarios/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
        credentials: 'include'
      });
      fetchUsuarios();
    } catch (e) {
      console.error(e);
    }
  };

  const toggleModulo = (modulo: string) => {
    setFormModulos(prev =>
      prev.includes(modulo) ? prev.filter(m => m !== modulo) : [...prev, modulo]
    );
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    if (formModulos.length === 0) {
      setFormError('Debes seleccionar al menos un módulo de acceso');
      return;
    }
    try {
      const res = await fetch('/api/usuarios', {
        method: 'POST',
        headers: authHeaders,
        credentials: 'include',
        body: JSON.stringify({ nombre: formNombre, usuario: formUsuario, password: formPassword, modulos: formModulos })
      });
      const data = await res.json();
      if (res.ok) {
        setFormSuccess('Usuario creado exitosamente.');
        setFormNombre(''); setFormUsuario(''); setFormPassword(''); setFormModulos(['servicios']);
        fetchUsuarios();
        setTimeout(() => { setShowForm(false); setFormSuccess(''); }, 1500);
      } else {
        setFormError(data.error || 'Error al crear el usuario');
      }
    } catch {
      setFormError('Error de conexión con el servidor');
    }
  };

  const submitChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    
    if (newPassword.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const res = await fetch(`/api/usuarios/${selectedUser.id}/password`, {
        method: 'PUT',
        headers: authHeaders,
        credentials: 'include',
        body: JSON.stringify({ password: newPassword })
      });
      const data = await res.json();
      
      if (res.ok) {
        setPasswordSuccess('Contraseña cambiada exitosamente.');
        setNewPassword('');
        setTimeout(() => {
          setShowPasswordModal(false);
          setSelectedUser(null);
          setPasswordSuccess('');
        }, 1500);
      } else {
        setPasswordError(data.error || 'Error al cambiar contraseña');
      }
    } catch {
      setPasswordError('Error de conexión con el servidor');
    }
  };

  const rolBadge: Record<string, string> = {
    super: 'bg-purple-100 text-purple-700 border border-purple-200',
    servicios: 'bg-blue-50 text-blue-700 border border-blue-200',
    relatorios: 'bg-green-50 text-green-700 border border-green-200',
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: ShieldCheck },
    { id: 'usuarios', label: 'Usuarios del Sistema', icon: Users },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      
      {/* Overlay móvil para sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 md:hidden transition-opacity" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="flex items-center justify-between h-24 border-b border-gray-200 px-6">
          <img src={logo} alt="Logo" className="h-full w-auto object-contain py-2" />
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-2 -mr-2 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-6 py-3 text-sm font-bold transition-colors border-l-2 text-left
                    ${isActive
                      ? 'border-ccb-dark bg-gray-50 text-ccb-dark'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                >
                  <item.icon className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? 'text-ccb-dark' : 'text-gray-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-400 px-3 mb-2 truncate">{user.nombre || user.usuario}</div>
          <button
            onClick={onLogout}
            className="flex w-full items-center px-3 py-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
          >
            <LogOut className="mr-3 flex-shrink-0 h-4 w-4 text-gray-400" />
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Topbar móvil */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <div className="text-lg font-bold text-gray-900">Panel Super Admin</div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -mr-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">

          {activeTab === 'dashboard' && (
            <>
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold text-gray-900">Panel Super Administrador</h2>
                <p className="mt-1 text-sm text-gray-500">Resumen general del sistema.</p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { name: 'Usuarios del Sistema', value: stats.usuarios, icon: Users },
                  { name: 'Salas de Oración', value: stats.salas, icon: Building2 },
                  { name: 'Ancianos', value: stats.ancianos, icon: Users },
                  { name: 'Servicios Registrados', value: stats.servicios, icon: Droplets },
                ].map((item) => (
                  <div key={item.name} className="relative bg-white pt-5 px-4 pb-6 sm:pt-6 sm:px-6 border border-gray-200 shadow-sm">
                    <dt>
                      <div className="absolute p-3 border border-gray-200 bg-gray-50">
                        <item.icon className="h-5 w-5 text-gray-700" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-xs font-bold text-gray-500">{item.name}</p>
                    </dt>
                    <dd className="ml-16 pb-2 flex items-baseline sm:pb-3 mt-1">
                      <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                    </dd>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'usuarios' && (
            <>
              <div className="border-b border-gray-200 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Usuarios del Sistema</h2>
                  <p className="mt-1 text-sm text-gray-500">Gestiona los accesos a los distintos módulos.</p>
                </div>
                <button
                  onClick={() => { setShowForm(true); setFormError(''); setFormSuccess(''); }}
                  className="flex items-center gap-2 px-4 py-2 bg-ccb-blue hover:bg-ccb-dark text-white text-sm font-bold uppercase tracking-widest rounded transition-colors"
                >
                  <Plus className="w-4 h-4" /> Nuevo Usuario
                </button>
              </div>

              {/* Modal de creación */}
              {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="bg-white border border-gray-200 shadow-xl w-full max-w-md">
                    <div className="flex justify-between items-center p-4 border-b border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider">Crear Usuario</h3>
                      <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-700">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <form onSubmit={handleCreateUser} className="p-6 space-y-4">
                      {formError && <div className="bg-red-50 text-red-600 text-sm p-3 rounded border border-red-200 text-center">{formError}</div>}
                      {formSuccess && <div className="bg-green-50 text-green-700 text-sm p-3 rounded border border-green-200 text-center">{formSuccess}</div>}

                      <div>
                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-1">Nombre Completo</label>
                        <input type="text" required value={formNombre} onChange={e => setFormNombre(e.target.value)}
                          placeholder="Ej. Juan Pérez"
                          className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-ccb-blue focus:ring-1 focus:ring-ccb-blue text-sm bg-white text-gray-900" />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-1">Nombre de Usuario</label>
                        <input type="text" required value={formUsuario} onChange={e => setFormUsuario(e.target.value)}
                          placeholder="Ej. jperez"
                          className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-ccb-blue focus:ring-1 focus:ring-ccb-blue text-sm bg-white text-gray-900" />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-1">Contraseña</label>
                        <input type="password" required value={formPassword} onChange={e => setFormPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-ccb-blue focus:ring-1 focus:ring-ccb-blue text-sm bg-white text-gray-900" />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-2">Módulo(s) de Acceso</label>
                        <div className="space-y-2">
                          {[
                            { value: 'servicios', label: 'Servicios' },
                            { value: 'relatorios', label: 'Relatorios' },
                          ].map(({ value, label }) => (
                            <label key={value} className="flex items-center gap-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formModulos.includes(value)}
                                onChange={() => toggleModulo(value)}
                                className="h-4 w-4 text-ccb-blue border-gray-300 rounded focus:ring-ccb-blue"
                              />
                              <span className="text-sm text-gray-700 font-medium">{label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 flex justify-end gap-3">
                        <button type="button" onClick={() => setShowForm(false)}
                          className="px-4 py-2 text-sm font-bold text-gray-600 border border-gray-300 hover:bg-gray-50 uppercase tracking-widest transition-colors">
                          Cancelar
                        </button>
                        <button type="submit"
                          className="px-4 py-2 text-sm font-bold text-white bg-ccb-blue hover:bg-ccb-dark border border-transparent uppercase tracking-widest transition-colors">
                          Crear Usuario
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Modal de Cambio de Contraseña */}
              {showPasswordModal && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="bg-white border border-gray-200 shadow-xl w-full max-w-md">
                    <div className="flex justify-between items-center p-4 border-b border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider">Cambiar Contraseña</h3>
                      <button onClick={() => setShowPasswordModal(false)} className="text-gray-400 hover:text-gray-700">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <form onSubmit={submitChangePassword} className="p-6 space-y-4">
                      <p className="text-sm text-gray-600 mb-4">
                        Ingresa una nueva contraseña para el usuario <strong className="text-gray-900">{selectedUser.usuario}</strong>.
                      </p>

                      {passwordError && <div className="bg-red-50 text-red-600 text-sm p-3 rounded border border-red-200 text-center">{passwordError}</div>}
                      {passwordSuccess && <div className="bg-green-50 text-green-700 text-sm p-3 rounded border border-green-200 text-center">{passwordSuccess}</div>}

                      <div>
                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-1">Nueva Contraseña</label>
                        <input type="password" required value={newPassword} onChange={e => setNewPassword(e.target.value)}
                          placeholder="Mínimo 6 caracteres"
                          className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-ccb-blue focus:ring-1 focus:ring-ccb-blue text-sm bg-white text-gray-900" />
                      </div>

                      <div className="pt-2 flex justify-end gap-3">
                        <button type="button" onClick={() => setShowPasswordModal(false)}
                          className="px-4 py-2 text-sm font-bold text-gray-600 border border-gray-300 hover:bg-gray-50 uppercase tracking-widest transition-colors">
                          Cancelar
                        </button>
                        <button type="submit"
                          className="px-4 py-2 text-sm font-bold text-white bg-ccb-blue hover:bg-ccb-dark border border-transparent uppercase tracking-widest transition-colors">
                          Guardar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
                {/* Vista Desktop */}
                <div className="hidden md:block">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Usuario</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Módulo / Rol</th>
                        <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {usuarios.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="text-center py-10 text-gray-400 text-sm">No hay usuarios registrados</td>
                        </tr>
                      ) : (
                        usuarios.map((u: any) => (
                          <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{u.nombre}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{u.usuario}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-0.5 text-xs font-bold uppercase rounded ${rolBadge[u.rol] || 'bg-gray-100 text-gray-600'}`}>
                                {u.rol}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              {u.rol !== 'super' && (
                                <div className="flex justify-end gap-4">
                                  <button
                                    onClick={() => {
                                      setSelectedUser(u);
                                      setNewPassword('');
                                      setPasswordError('');
                                      setPasswordSuccess('');
                                      setShowPasswordModal(true);
                                    }}
                                    className="text-ccb-blue hover:text-ccb-dark text-sm font-medium transition-colors"
                                  >
                                    Clave
                                  </button>
                                  <button
                                    onClick={() => handleDeleteUser(u.id)}
                                    className="text-red-600 hover:text-red-900 text-sm font-medium transition-colors"
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Vista Móvil (Tarjetas) */}
                <div className="md:hidden">
                  {usuarios.length === 0 ? (
                    <div className="text-center py-10 text-gray-400 text-sm">No hay usuarios registrados</div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {usuarios.map((u: any) => (
                        <div key={u.id} className="p-4 space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="text-sm font-bold text-gray-900">{u.nombre}</div>
                              <div className="text-sm text-gray-600 mt-1">{u.usuario}</div>
                            </div>
                            <span className={`px-2 py-0.5 text-xs font-bold uppercase rounded ${rolBadge[u.rol] || 'bg-gray-100 text-gray-600'}`}>
                              {u.rol}
                            </span>
                          </div>
                          
                          {u.rol !== 'super' && (
                            <div className="flex justify-end gap-4 pt-2 border-t border-gray-50">
                              <button
                                onClick={() => {
                                  setSelectedUser(u);
                                  setNewPassword('');
                                  setPasswordError('');
                                  setPasswordSuccess('');
                                  setShowPasswordModal(true);
                                }}
                                className="text-ccb-blue hover:text-ccb-dark text-sm font-bold transition-colors"
                              >
                                Clave
                              </button>
                              <button
                                onClick={() => handleDeleteUser(u.id)}
                                className="text-red-600 hover:text-red-900 text-sm font-bold transition-colors"
                              >
                                Eliminar
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

        </main>
      </div>
    </div>
  );
}
