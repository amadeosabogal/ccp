import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import logo from '../../assets/logo_bw_transparent.png';

// Las salas y ancianos se cargarán dinámicamente desde el localStorage

export default function RegistroPublico() {
  const [tipoServicio, setTipoServicio] = useState<'bautizo' | 'santa_cena'>('bautizo');
  const [nombreAnciano, setNombreAnciano] = useState('');
  const [fecha, setFecha] = useState('');
  const [sala, setSala] = useState('');
  const [salasRegistradas, setSalasRegistradas] = useState<string[]>([]);
  const [ancianosRegistrados, setAncianosRegistrados] = useState<string[]>([]);
  const [hombres, setHombres] = useState<number | ''>('');
  const [mujeres, setMujeres] = useState<number | ''>('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('congregaciones');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Extract names, convert to uppercase, and remove duplicates
        const nombres = parsed.map((c: any) => (c.nombre || '').toUpperCase());
        const uniqueSalas = Array.from(new Set(nombres)).filter(Boolean).sort() as string[];
        setSalasRegistradas(uniqueSalas);
      } catch (e) {
        console.error("Error cargando salas:", e);
      }
    }

    const savedA = localStorage.getItem('ancianos');
    if (savedA) {
      try {
        const parsed = JSON.parse(savedA);
        const nombres = parsed.map((a: any) => `${a.nombre} ${a.apellidos}`);
        setAncianosRegistrados(nombres.sort());
      } catch (e) {
        console.error("Error cargando ancianos:", e);
      }
    } else {
      // Fallback for demo
      setAncianosRegistrados([
        "Juan Pérez García",
        "Carlos Mendoza Ruiz",
        "Miguel Torres Silva"
      ]);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreAnciano || !fecha || !sala || hombres === '' || mujeres === '') return;

    const nuevoServicio = {
      id: Date.now().toString(),
      tipo: tipoServicio,
      fecha,
      anciano: nombreAnciano,
      sala_oracion: sala,
      hombres: Number(hombres),
      mujeres: Number(mujeres)
    };

    const saved = localStorage.getItem('servicios_registrados');
    const servicios = saved ? JSON.parse(saved) : [];
    servicios.push(nuevoServicio);
    localStorage.setItem('servicios_registrados', JSON.stringify(servicios));

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setNombreAnciano('');
      setFecha('');
      setSala('');
      setHombres('');
      setMujeres('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header / Brand */}
        <div className="text-center mb-10">
          <div className="flex justify-center mx-auto w-32 h-32 mb-6">
            <img src={logo} alt="Logo" className="w-full h-full object-contain drop-shadow-sm" />
          </div>
          <h2 className="text-3xl font-bold text-ccb-blue">
            Registro de Servicios
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Uso exclusivo para Ancianos
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-gray-200 shadow-sm p-6 sm:p-10 relative overflow-hidden">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
              <div className="h-16 w-16 bg-green-50 border border-green-200 flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Servicio Registrado</h3>
              <p className="mt-2 text-gray-500">Los datos se han guardado en la bitácora administrativa exitosamente.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Type Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Tipo de Servicio Realizado
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setTipoServicio('bautizo')}
                    className={`py-3 px-4 text-sm font-bold border transition-colors ${tipoServicio === 'bautizo'
                        ? 'border-ccb-blue bg-ccb-blue text-white'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    Bautizo
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipoServicio('santa_cena')}
                    className={`py-3 px-4 text-sm font-bold border transition-colors ${tipoServicio === 'santa_cena'
                        ? 'border-ccb-blue bg-ccb-blue text-white'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    Santa Cena
                  </button>
                </div>
              </div>

              {/* Fields */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Nombres y Apellidos del Anciano
                  </label>
                  <select
                    required
                    value={nombreAnciano}
                    onChange={(e) => setNombreAnciano(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-ccb-dark focus:ring-1 focus:ring-ccb-dark text-sm bg-white"
                  >
                    <option value="" disabled>Seleccione su nombre...</option>
                    {ancianosRegistrados.length === 0 && (
                      <option value="" disabled>No hay ancianos registrados</option>
                    )}
                    {ancianosRegistrados.map((anciano) => (
                      <option key={anciano} value={anciano}>{anciano}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Fecha del Servicio
                  </label>
                  <input
                    type="date"
                    required
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-ccb-dark focus:ring-1 focus:ring-ccb-dark text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Sala de Oración
                  </label>
                  <select
                    required
                    value={sala}
                    onChange={(e) => setSala(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-ccb-dark focus:ring-1 focus:ring-ccb-dark text-sm bg-white uppercase"
                  >
                    <option value="" disabled>Seleccione una sala...</option>
                    {salasRegistradas.length === 0 && (
                      <option value="" disabled>No hay salas registradas aún</option>
                    )}
                    {salasRegistradas.map((salaName) => (
                      <option key={salaName} value={salaName}>{salaName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Cantidad de Hombres
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={hombres}
                    onChange={(e) => setHombres(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-ccb-dark focus:ring-1 focus:ring-ccb-dark text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Cantidad de Mujeres
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={mujeres}
                    onChange={(e) => setMujeres(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-ccb-dark focus:ring-1 focus:ring-ccb-dark text-sm bg-white"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-bold text-white bg-ccb-blue hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ccb-blue transition-colors"
                >
                  Registrar Servicio
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Link to Admin Portal */}
        <div className="mt-8 text-center border-t border-gray-200 pt-8">
          <Link
            to="/servicios/admin"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors"
          >
            Ingresar al Portal Administrativo
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
