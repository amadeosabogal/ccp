import { useState, useEffect } from 'react';
import DataTable from '../../components/servicios/DataTable';
import { X } from 'lucide-react';

interface Servicio {
  id: string;
  tipo: string;
  fecha: string;
  anciano: string;
  sala_oracion: string;
  hombres: number;
  mujeres: number;
  anciano_id?: number;
  sala_id?: number;
}

export default function Bautizos() {
  const [data, setData] = useState<Servicio[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [salasRegistradas, setSalasRegistradas] = useState<{id: number | string, nombre: string}[]>([]);
  const [ancianosRegistrados, setAncianosRegistrados] = useState<{id: number | string, nombre: string, apellidos: string}[]>([]);

  const loadData = async () => {
    try {
      const res = await fetch('/api/servicios');
      if (res.ok) {
        const servicios = await res.json();
        // format date properly for table and forms (YYYY-MM-DD)
        const formatted = servicios.map((s: any) => ({
          ...s,
          fecha: s.fecha ? s.fecha.split('T')[0] : ''
        }));
        setData(formatted.filter((s: Servicio) => s.tipo === 'bautizo'));
      }
      
      const resSalas = await fetch('/api/salas');
      if (resSalas.ok) {
        setSalasRegistradas(await resSalas.json());
      }
      
      const resAncianos = await fetch('/api/ancianos');
      if (resAncianos.ok) {
        setAncianosRegistrados(await resAncianos.json());
      }
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener('servicios_registrados-updated', loadData);
    return () => window.removeEventListener('servicios_registrados-updated', loadData);
  }, []);
  
  // form state
  const [fecha, setFecha] = useState('');
  const [anciano, setAnciano] = useState('');
  const [sala, setSala] = useState('');
  const [hermanos, setHermanos] = useState<number | ''>('');
  const [hermanas, setHermanas] = useState<number | ''>('');

  const handleOpenEdit = (item: Servicio) => {
    setEditingId(item.id);
    setFecha(item.fecha);
    
    let a_id = item.anciano_id;
    if (!a_id) {
      const foundA = ancianosRegistrados.find(a => (a.nombre + ' ' + a.apellidos) === item.anciano);
      if (foundA) a_id = Number(foundA.id);
    }
    setAnciano(a_id ? String(a_id) : '');
    
    let s_id = item.sala_id;
    if (!s_id) {
      const foundS = salasRegistradas.find(s => s.nombre === item.sala_oracion);
      if (foundS) s_id = Number(foundS.id);
    }
    setSala(s_id ? String(s_id) : '');
    
    setHermanos(item.hombres);
    setHermanas(item.mujeres);
    setIsModalOpen(true);
  };

  const handleDelete = async (item: Servicio) => {
    if(window.confirm('¿Eliminar este registro?')) {
      try {
        const res = await fetch(`/api/servicios/${item.id}`, { method: 'DELETE' });
        if (res.ok) {
          window.dispatchEvent(new Event('servicios_registrados-updated'));
        } else {
          alert('Error al eliminar');
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      try {
        const res = await fetch(`/api/servicios/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fecha,
            anciano_id: Number(anciano),
            sala_id: Number(sala),
            hombres: Number(hermanos) || 0,
            mujeres: Number(hermanas) || 0
          })
        });
        if (res.ok) {
          window.dispatchEvent(new Event('servicios_registrados-updated'));
          setIsModalOpen(false);
        } else {
          alert('Error al actualizar');
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const columns = [
    { header: 'Fecha del Servicio', accessor: 'fecha' as keyof Servicio },
    { header: 'Anciano Oficiante', accessor: 'anciano' as keyof Servicio },
    { header: 'Sala de Oración', accessor: 'sala_oracion' as keyof Servicio },
    { 
      header: 'Hombres Bautizados', 
      accessor: 'hombres' as keyof Servicio,
      cell: (item: Servicio) => <span className="font-medium text-gray-900">{item.hombres}</span>
    },
    { 
      header: 'Mujeres Bautizadas', 
      accessor: 'mujeres' as keyof Servicio,
      cell: (item: Servicio) => <span className="font-medium text-gray-900">{item.mujeres}</span>
    },
    {
      header: 'Total',
      accessor: 'id' as keyof Servicio,
      cell: (item: Servicio) => (
        <span className="font-bold text-gray-900 border border-gray-300 px-2 py-1 bg-gray-50">
          {item.hombres + item.mujeres}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Registro General de Bautizos"
        description="Bitácora administrativa de todos los bautizos registrados a nivel nacional."
        data={data}
        columns={columns}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white border border-gray-200 shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider">
                Editar Registro de Bautizo
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-1">Fecha del Servicio</label>
                <input type="date" required value={fecha} onChange={e => setFecha(e.target.value)} className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-ccb-dark focus:ring-1 focus:ring-ccb-dark text-sm bg-white text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-1">Anciano Oficiante</label>
                <select required value={anciano} onChange={e => setAnciano(e.target.value)} className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-ccb-dark focus:ring-1 focus:ring-ccb-dark text-sm bg-white text-gray-900">
                  <option value="" disabled>Seleccione...</option>
                  {ancianosRegistrados.map(a => (
                    <option key={a.id} value={a.id}>{a.nombre} {a.apellidos}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-1">Sala de Oración</label>
                <select required value={sala} onChange={e => setSala(e.target.value)} className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-ccb-dark focus:ring-1 focus:ring-ccb-dark text-sm bg-white text-gray-900 uppercase">
                  <option value="" disabled>Seleccione...</option>
                  {salasRegistradas.map(s => (
                    <option key={s.id} value={s.id}>{s.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-1">Hombres</label>
                  <input type="number" min="0" required value={hermanos} onChange={e => setHermanos(e.target.value === '' ? '' : Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-ccb-dark focus:ring-1 focus:ring-ccb-dark text-sm bg-white text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-1">Mujeres</label>
                  <input type="number" min="0" required value={hermanas} onChange={e => setHermanas(e.target.value === '' ? '' : Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-ccb-dark focus:ring-1 focus:ring-ccb-dark text-sm bg-white text-gray-900" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-gray-600 border border-gray-300 hover:bg-gray-50 uppercase tracking-widest transition-colors">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm font-bold text-white bg-ccb-dark hover:bg-black border border-transparent uppercase tracking-widest transition-colors">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
