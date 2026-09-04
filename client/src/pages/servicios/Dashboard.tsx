import { useState, useEffect } from 'react';
import { Users, Droplets, Church } from 'lucide-react';

export default function Dashboard() {
  const [bautizosTotal, setBautizosTotal] = useState(0);
  const [salasTotal, setSalasTotal] = useState(0);
  const [ancianosTotal, setAncianosTotal] = useState(0);

  const calculateStats = async () => {
    try {
      // Fetch Bautizos
      const resServicios = await fetch('/api/servicios');
      if (resServicios.ok) {
        const servicios = await resServicios.json();
        const currentYear = new Date().getFullYear().toString();
        const totalBautizos = servicios
          .filter((s: any) => s.tipo === 'bautizo' && s.fecha.startsWith(currentYear))
          .reduce((acc: number, curr: any) => acc + curr.hombres + curr.mujeres, 0);
        setBautizosTotal(totalBautizos);
      }

      // Fetch Salas
      const resSalas = await fetch('/api/salas');
      if (resSalas.ok) {
        const salas = await resSalas.json();
        setSalasTotal(salas.length);
      }
      
      // Fetch Ancianos
      const resAncianos = await fetch('/api/ancianos');
      if (resAncianos.ok) {
        const ancianos = await resAncianos.json();
        setAncianosTotal(ancianos.length);
      }
    } catch (e) {
      console.error('Error fetching dashboard stats:', e);
    }
  };

  useEffect(() => {
    calculateStats();
    window.addEventListener('servicios_registrados-updated', calculateStats);
    window.addEventListener('congregaciones-updated', calculateStats);
    window.addEventListener('ancianos-updated', calculateStats);
    return () => {
      window.removeEventListener('servicios_registrados-updated', calculateStats);
      window.removeEventListener('congregaciones-updated', calculateStats);
      window.removeEventListener('ancianos-updated', calculateStats);
    };
  }, []);

  const stats = [
    { name: 'Ancianos Registrados', value: ancianosTotal.toString(), icon: Users },
    { name: 'Bautizos Este Año', value: bautizosTotal.toString(), icon: Droplets },
    { name: 'Salas de Oración', value: salasTotal.toString(), icon: Church },
  ];
  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Portal de Servicios</h2>
        <p className="mt-1 text-sm text-gray-500">
          Resumen general de las actividades y registros a nivel nacional.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative bg-white pt-5 px-4 pb-6 sm:pt-6 sm:px-6 border border-gray-200 shadow-sm"
          >
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
    </div>
  );
}
