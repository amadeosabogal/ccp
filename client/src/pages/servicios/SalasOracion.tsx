import { useState, useEffect } from 'react';
import DataTable from '../../components/servicios/DataTable';
import { MapPin } from 'lucide-react';

interface Congregacion {
  id: string;
  nombre: string;
  ubicacion: string;
  lat?: number;
  lng?: number;
  leyendaId?: string;
}

export default function SalasOracion() {
  const [data, setData] = useState<Congregacion[]>([]);
  
  const loadData = async () => {
    try {
      const res = await fetch('/api/salas');
      if (res.ok) {
        setData(await res.json());
      }
    } catch (e) {
      console.error('Error fetching salas:', e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (item: Congregacion) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este punto de referencia? Se eliminará del mapa.')) {
      try {
        const res = await fetch(`/api/salas/${item.id}`, { method: 'DELETE' });
        if (res.ok) {
          loadData();
        }
      } catch (e) {
        console.error('Error deleting sala:', e);
      }
    }
  };

  const columns = [
    { 
      header: 'Nombre', 
      accessor: 'nombre' as keyof Congregacion,
      cell: (item: Congregacion) => (
        <div className="flex items-center">
          <MapPin className="w-4 h-4 text-gray-400 mr-2" />
          <span className="uppercase">{item.nombre}</span>
        </div>
      )
    },
    { header: 'Ubicación', accessor: 'ubicacion' as keyof Congregacion },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Salas de Oración"
        description="Gestión de locales y salas de oración conectados con el mapa."
        data={data}
        columns={columns}
        onDelete={handleDelete}
      />
    </div>
  );
}
