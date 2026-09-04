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
}

export default function Bautizos() {
  const [data, setData] = useState<Servicio[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadData = () => {
    const saved = localStorage.getItem('servicios_registrados');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData(parsed.filter((s: Servicio) => s.tipo === 'bautizo'));
      } catch (e) {}
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
    setAnciano(item.anciano);
    setSala(item.sala_oracion);
    setHermanos(item.hombres);
    setHermanas(item.mujeres);
    setIsModalOpen(true);
  };

  const handleDelete = (item: Servicio) => {
    if(window.confirm('¿Eliminar este registro?')) {
      const saved = localStorage.getItem('servicios_registrados');
      if (saved) {
        const parsed = JSON.parse(saved);
        const filtered = parsed.filter((s: Servicio) => s.id !== item.id);
        localStorage.setItem('servicios_registrados', JSON.stringify(filtered));
        window.dispatchEvent(new Event('servicios_registrados-updated'));
      }
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const saved = localStorage.getItem('servicios_registrados');
      if (saved) {
        const parsed = JSON.parse(saved);
        const updated = parsed.map((s: Servicio) => s.id === editingId ? {
          ...s,
          fecha,
          anciano,
          sala_oracion: sala,
          hombres: Number(hermanos) || 0,
          mujeres: Number(hermanas) || 0
        } : s);
        localStorage.setItem('servicios_registrados', JSON.stringify(updated));
        window.dispatchEvent(new Event('servicios_registrados-updated'));
      }
    }
    setIsModalOpen(false);
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
                <input type="text" required value={anciano} onChange={e => setAnciano(e.target.value)} className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-ccb-dark focus:ring-1 focus:ring-ccb-dark text-sm bg-white text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-1">Sala de Oración</label>
                <input type="text" required value={sala} onChange={e => setSala(e.target.value)} className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-ccb-dark focus:ring-1 focus:ring-ccb-dark text-sm bg-white text-gray-900" />
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
