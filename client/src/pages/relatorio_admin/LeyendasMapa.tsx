import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, MapPin } from 'lucide-react';

export interface LegendCategory {
  id: string;
  name: string;
  color: string;
}

export interface Congregacion {
  id: string;
  nombre: string;
  ubicacion: string;
  lat: number;
  lng: number;
  leyendaId: string;
}

export default function LeyendasMapa() {
  const [legends, setLegends] = useState<LegendCategory[]>([]);
  const [name, setName] = useState('');
  const [color, setColor] = useState('#c00');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [congregaciones, setCongregaciones] = useState<Congregacion[]>([]);

  const loadData = async () => {
    try {
      const resLegends = await fetch('/api/leyendas');
      if (resLegends.ok) {
        setLegends(await resLegends.json());
      }
      const resSalas = await fetch('/api/salas');
      if (resSalas.ok) {
        setCongregaciones(await resSalas.json());
      }
    } catch (e) {
      console.error('Error loading data:', e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingId) {
      try {
        const res = await fetch(`/api/leyendas/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, color })
        });
        if (res.ok) {
          loadData();
          setEditingId(null);
        }
      } catch (e) {
        console.error('Error updating legend', e);
      }
    } else {
      const newId = Date.now().toString();
      try {
        const res = await fetch('/api/leyendas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: newId, name, color })
        });
        if (res.ok) {
          loadData();
        }
      } catch (e) {
        console.error('Error saving legend', e);
      }
    }

    setName('');
    setColor('#c00');
  };

  const handleEdit = (legend: LegendCategory) => {
    setEditingId(legend.id);
    setName(legend.name);
    setColor(legend.color);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta leyenda? Los puntos del mapa podrían quedar sin color.')) {
      try {
        const res = await fetch(`/api/leyendas/${id}`, { method: 'DELETE' });
        if (res.ok) {
          loadData();
        }
      } catch (e) {
        console.error('Error deleting legend', e);
      }
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName('');
    setColor('#c00');
  };

  const handleDeleteCongregacion = async (id: string) => {
    if (window.confirm('¿Eliminar este punto de referencia del mapa?')) {
      try {
        const res = await fetch(`/api/salas/${id}`, { method: 'DELETE' });
        if (res.ok) {
          loadData();
        }
      } catch (e) {
        console.error('Error deleting congregacion', e);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Leyendas del Mapa</h1>
        <p className="text-gray-600 mt-2">
          Administra las categorías y colores de las casas de oración que aparecerán en el mapa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Formulario */}
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {editingId ? 'Editar Leyenda' : 'Nueva Leyenda'}
          </h2>

          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la Categoría
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ej: Sala"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-ccb-blue focus:border-ccb-blue outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Asignado
              </label>
              <div className="flex flex-wrap gap-2 mb-2 items-center">
                {['#c00', '#004f71', '#16a34a', '#ca8a04', '#9333ea', '#db2777', '#000000', '#64748b'].map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-8 h-8 rounded-full border-2 ${color === c ? 'border-gray-900 scale-110' : 'border-transparent'} transition-transform`}
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
                
                {/* Botón de Color Personalizado */}
                <div 
                  className={`relative w-8 h-8 rounded-full border-2 flex items-center justify-center overflow-hidden transition-transform cursor-pointer
                    ${!['#c00', '#004f71', '#16a34a', '#ca8a04', '#9333ea', '#db2777', '#000000', '#64748b'].includes(color) 
                      ? 'border-gray-900 scale-110' 
                      : 'border-gray-300 bg-white hover:bg-gray-50'}`}
                  style={{ 
                    backgroundColor: !['#c00', '#004f71', '#16a34a', '#ca8a04', '#9333ea', '#db2777', '#000000', '#64748b'].includes(color) 
                      ? color 
                      : 'white' 
                  }}
                  title="Color personalizado"
                >
                  {['#c00', '#004f71', '#16a34a', '#ca8a04', '#9333ea', '#db2777', '#000000', '#64748b'].includes(color) && (
                    <span className="text-gray-500 font-bold text-lg leading-none mt-[-2px] pointer-events-none">+</span>
                  )}
                  <input 
                    type="color" 
                    value={color} 
                    onChange={(e) => setColor(e.target.value)} 
                    className="absolute -inset-4 opacity-0 cursor-pointer w-[200%] h-[200%]" 
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-ccb-blue text-white px-4 py-2 rounded font-medium hover:bg-ccb-dark transition-colors flex items-center justify-center gap-2"
              >
                {editingId ? 'Actualizar' : <><Plus size={18} /> Agregar</>}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Lista */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Vista Desktop */}
          <div className="hidden md:block">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {legends.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                      No hay leyendas registradas. Comienza agregando una en el panel.
                    </td>
                  </tr>
                ) : (
                  legends.map(legend => (
                    <tr key={legend.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-gray-900">{legend.name}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full border border-gray-200 shadow-sm" style={{ backgroundColor: legend.color }}></div>
                          <span className="text-sm text-gray-500 font-mono">{legend.color}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(legend)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(legend.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Vista Móvil (Tarjetas) */}
          <div className="md:hidden">
            {legends.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500 text-sm">
                No hay leyendas registradas. Comienza agregando una en el panel.
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {legends.map(legend => (
                  <div key={legend.id} className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">{legend.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full border border-gray-200 shadow-sm" style={{ backgroundColor: legend.color }}></div>
                        <span className="text-xs text-gray-500 font-mono">{legend.color}</span>
                      </div>
                    </div>
                    <div className="flex justify-end gap-4 pt-2 border-t border-gray-50">
                      <button
                        onClick={() => handleEdit(legend)}
                        className="text-blue-600 hover:text-blue-900 text-sm font-bold flex items-center"
                      >
                        <Pencil size={16} className="mr-1" /> Editar
                      </button>
                      <button
                        onClick={() => handleDelete(legend.id)}
                        className="text-red-600 hover:text-red-900 text-sm font-bold flex items-center"
                      >
                        <Trash2 size={16} className="mr-1" /> Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Puntos de Referencia Registrados</h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Vista Desktop */}
          <div className="hidden md:block">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {congregaciones.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No hay puntos registrados. Puedes agregarlos desde el mapa en la página principal.
                    </td>
                  </tr>
                ) : (
                  congregaciones.map(c => {
                    const legend = legends.find(l => l.id === c.leyendaId);
                    return (
                      <tr key={c.id}>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <MapPin size={16} className="text-gray-400 mr-2 shrink-0" />
                            <span className="font-medium text-gray-900">{c.nombre}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500 truncate max-w-xs block">{c.ubicacion}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {legend ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              <span className="w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: legend.color }}></span>
                              {legend.name}
                            </span>
                          ) : (
                            <span className="text-sm text-red-500">Categoría eliminada</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleDeleteCongregacion(c.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Eliminar punto"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Vista Móvil (Tarjetas) */}
          <div className="md:hidden">
            {congregaciones.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500 text-sm">
                No hay puntos registrados. Puedes agregarlos desde el mapa en la página principal.
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {congregaciones.map(c => {
                  const legend = legends.find(l => l.id === c.leyendaId);
                  return (
                    <div key={c.id} className="p-4 space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex flex-col">
                          <div className="flex items-center font-bold text-gray-900">
                            <MapPin size={16} className="text-gray-400 mr-1 shrink-0" />
                            {c.nombre}
                          </div>
                          <span className="text-xs text-gray-500 mt-1">{c.ubicacion}</span>
                        </div>
                        {legend ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gray-100 text-gray-800 shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full mr-1" style={{ backgroundColor: legend.color }}></span>
                            {legend.name}
                          </span>
                        ) : (
                          <span className="text-[10px] uppercase font-bold text-red-500 shrink-0">Eliminada</span>
                        )}
                      </div>
                      <div className="flex justify-end pt-2 border-t border-gray-50">
                        <button
                          onClick={() => handleDeleteCongregacion(c.id)}
                          className="text-red-600 hover:text-red-900 text-sm font-bold flex items-center"
                        >
                          <Trash2 size={16} className="mr-1" /> Eliminar
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
