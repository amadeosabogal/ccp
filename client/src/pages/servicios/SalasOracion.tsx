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
  
  useEffect(() => {
    const saved = localStorage.getItem('congregaciones');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {}
    }
    
    const handleUpdate = () => {
      const updated = localStorage.getItem('congregaciones');
      if (updated) {
        try {
          setData(JSON.parse(updated));
        } catch (e) {}
      }
    };
    
    window.addEventListener('congregaciones-updated', handleUpdate);
    return () => window.removeEventListener('congregaciones-updated', handleUpdate);
  }, []);

  const handleDelete = (item: Congregacion) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este punto de referencia? Se eliminará del mapa.')) {
      const newData = data.filter(d => d.id !== item.id);
      setData(newData);
      localStorage.setItem('congregaciones', JSON.stringify(newData));
      window.dispatchEvent(new Event('congregaciones-updated'));
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
