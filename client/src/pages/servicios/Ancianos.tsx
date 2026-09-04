import { useState, useEffect } from 'react';
import DataTable from '../../components/servicios/DataTable';
import { X } from 'lucide-react';

interface Anciano {
  id: string;
  nombre: string;
  apellidos: string;
}

export default function Ancianos() {
  const [data, setData] = useState<Anciano[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const API_URL = '/api/ancianos';

  const loadData = async () => {
    try {
      const res = await fetch(API_URL, { credentials: 'include' });
      if (res.ok) {
        const json = await res.json();
        setData(json);
        // Notificamos otros componentes (si es necesario)
        window.dispatchEvent(new Event('ancianos-updated'));
      }
    } catch (e) {
      console.error('Error fetching ancianos:', e);
    }
  };

  useEffect(() => {
    loadData();
    // Podemos seguir escuchando el evento por si otro componente lo dispara
    window.addEventListener('ancianos-updated', loadData);
    return () => window.removeEventListener('ancianos-updated', loadData);
  }, []);

  // form state
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');

  const handleOpenAdd = () => {
    setEditingId(null);
    setNombre('');
    setApellidos('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Anciano) => {
    setEditingId(item.id);
    setNombre(item.nombre);
    setApellidos(item.apellidos);
    setIsModalOpen(true);
  };

  const handleDelete = async (item: Anciano) => {
    if(window.confirm('¿Eliminar este anciano?')) {
      try {
        const res = await fetch(`${API_URL}/${item.id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });
        if (res.ok) {
          loadData();
        } else {
          alert('Error al eliminar, verifica tu sesión.');
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res;
      if (editingId) {
        res = await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ nombre, apellidos })
        });
      } else {
        res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ nombre, apellidos })
        });
      }

      if (res.ok) {
        loadData();
        setIsModalOpen(false);
      } else {
        alert('Error al guardar, verifica tu sesión.');
      }
    } catch (e) {
      console.error(e);
      alert('Error de conexión con el servidor.');
    }
  };

  const columns = [
    { header: 'Nombres', accessor: 'nombre' as keyof Anciano },
    { header: 'Apellidos', accessor: 'apellidos' as keyof Anciano },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Registro de Ancianos"
        description="Gestiona el directorio de Ancianos a nivel nacional."
        data={data}
        columns={columns}
        onAdd={handleOpenAdd}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        addLabel="Registrar Anciano"
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white border border-gray-200 shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider">
                {editingId ? 'Editar Anciano' : 'Registrar Anciano'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-1">Nombres</label>
                <input type="text" required value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ej. Juan Carlos" className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-ccb-dark focus:ring-1 focus:ring-ccb-dark text-sm bg-white text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-1">Apellidos</label>
                <input type="text" required value={apellidos} onChange={e => setApellidos(e.target.value)} placeholder="Ej. Pérez García" className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-ccb-dark focus:ring-1 focus:ring-ccb-dark text-sm bg-white text-gray-900" />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-gray-600 border border-gray-300 hover:bg-gray-50 uppercase tracking-widest transition-colors">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm font-bold text-white bg-ccb-dark hover:bg-black border border-transparent uppercase tracking-widest transition-colors">Guardar Registro</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
