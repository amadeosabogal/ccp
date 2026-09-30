import React, { useState, useEffect, useRef } from 'react';
import { Plus, Pencil, Trash2, MapPin, Navigation } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCongregacion, setCurrentCongregacion] = useState<Partial<Congregacion> | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: -9.189967, lng: -75.015152 });
  const [mapZoom, setMapZoom] = useState(5);
  const [isMapActive, setIsMapActive] = useState(false);
  const [isSavingDisabled, setIsSavingDisabled] = useState(false);

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

  const handleSaveCongregacion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !currentCongregacion?.nombre || 
      currentCongregacion.lat === undefined || 
      currentCongregacion.lng === undefined || 
      !currentCongregacion.ubicacion || 
      !currentCongregacion.leyendaId
    ) {
      alert("Por favor asegúrate de que todos los campos estén llenos (Nombre, Ubicación, Coordenadas y Categoría).");
      return;
    }

    try {
      if (currentCongregacion.id) {
        // Update
        const res = await fetch(`/api/salas/${currentCongregacion.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentCongregacion)
        });
        if (res.ok) loadData();
      } else {
        // Create
        const res = await fetch('/api/salas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentCongregacion)
        });
        if (res.ok) loadData();
      }
      setIsModalOpen(false);
      setCurrentCongregacion(null);
    } catch (e) {
      console.error('Error saving congregacion:', e);
    }
  };

  // Referencia para el timeout del geocoding (evitar spam a la API)
  const geocodeTimeoutRef = useRef<number | null>(null);
  const saveTimeoutRef = useRef<number | null>(null);

  const geocodePosition = async (lat: number, lng: number) => {
    try {
      setCurrentCongregacion(prev => prev ? { ...prev, ubicacion: 'Buscando dirección...' } : null);
      setIsSavingDisabled(true); // Bloquear guardado temporalmente
      
      // Usar Nominatim (OpenStreetMap) de forma gratuita y sin restricciones de CORS
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`, {
        headers: {
          'Accept-Language': 'es'
        }
      });
      if (!res.ok) {
        setCurrentCongregacion(prev => prev ? { ...prev, ubicacion: '' } : null);
        setIsSavingDisabled(false);
        return;
      }
      const data = await res.json();
      
      if (data && data.display_name) {
        // Nominatim devuelve la dirección completa en display_name
        setCurrentCongregacion(prev => prev ? { ...prev, ubicacion: data.display_name } : null);
        
        // Mantener deshabilitado por 1 segundo extra
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = setTimeout(() => {
          setIsSavingDisabled(false);
        }, 1000);
      } else {
        setCurrentCongregacion(prev => prev ? { ...prev, ubicacion: '' } : null);
        setIsSavingDisabled(false);
      }
    } catch (e) {
      console.error("Error al obtener la dirección:", e);
      setCurrentCongregacion(prev => prev ? { ...prev, ubicacion: '' } : null);
      setIsSavingDisabled(false);
    }
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newPos = { lat: position.coords.latitude, lng: position.coords.longitude };
        setMapCenter(newPos);
        setMapZoom(18); // Zoom automático al punto
        setIsMapActive(true); // Activa la chincheta central
        setCurrentCongregacion(prev => prev ? { 
          ...prev, 
          ...newPos
        } : null);
        
        // Obtener la dirección en texto
        geocodePosition(newPos.lat, newPos.lng);
      },
      (error) => {
        alert("Error al obtener la ubicación: " + error.message);
      }
    );
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

      <div className="mt-12 flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Puntos de Referencia Registrados</h2>
        <button
          onClick={() => {
            const initialPos = { lat: -9.189967, lng: -75.015152 };
            setCurrentCongregacion({ nombre: '', ubicacion: '', lat: initialPos.lat, lng: initialPos.lng, leyendaId: '' });
            setMapCenter(initialPos);
            setMapZoom(5);
            setIsMapActive(false);
            setIsSavingDisabled(false);
            setIsModalOpen(true);
          }}
          className="bg-ccb-blue text-white px-4 py-2 rounded font-medium hover:bg-ccb-dark transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> Agregar Punto
        </button>
      </div>
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
                            onClick={() => {
                              setCurrentCongregacion(c);
                              setMapCenter({ lat: c.lat, lng: c.lng });
                              setMapZoom(16);
                              setIsMapActive(false);
                              setIsModalOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                            title="Editar punto"
                          >
                            <Pencil size={18} />
                          </button>
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
                      <div className="flex justify-end gap-4 pt-2 border-t border-gray-50">
                        <button
                          onClick={() => {
                            setCurrentCongregacion(c);
                            setMapCenter({ lat: c.lat, lng: c.lng });
                            setMapZoom(16);
                            setIsMapActive(false);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 text-sm font-bold flex items-center"
                        >
                          <Pencil size={16} className="mr-1" /> Editar
                        </button>
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

      {/* Modal CRUD Congregacion */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-6">
          <div className="bg-white p-5 sm:p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 mb-4 shrink-0">
              {currentCongregacion?.id ? 'Editar Punto de Referencia' : 'Nuevo Punto de Referencia'}
            </h2>
            <form onSubmit={handleSaveCongregacion} className="flex flex-col gap-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    value={currentCongregacion?.nombre || ''}
                    onChange={e => setCurrentCongregacion({ ...currentCongregacion, nombre: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-ccb-blue outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación (Texto)</label>
                  <input
                    type="text"
                    value={currentCongregacion?.ubicacion || ''}
                    readOnly
                    placeholder="Se rellena automáticamente en el mapa"
                    className="w-full px-3 py-2 border border-gray-300 rounded outline-none bg-gray-100 text-gray-600 cursor-not-allowed select-none"
                    required
                  />
                </div>
              </div>
              
              {/* Botón de Ubicación Actual y Mini Mapa */}
              <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col">
                <div className="bg-gray-50 p-3 border-b border-gray-200 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Ubicación en el Mapa</span>
                  <button
                    type="button"
                    onClick={handleCurrentLocation}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md text-xs font-semibold transition-colors"
                  >
                    <Navigation size={14} /> Usar mi ubicación
                  </button>
                </div>
                <div className="h-56 relative bg-gray-100 cursor-crosshair">
                  <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}>
                    <Map
                      mapId="MINI_MAP_MODAL"
                      zoom={mapZoom}
                      onZoomChanged={(ev) => setMapZoom(ev.detail.zoom)}
                      center={mapCenter}
                      onCameraChanged={(ev) => {
                        // Sincronizar el estado del centro
                        setMapCenter(ev.detail.center);
                        // Actualizar coordenadas al mover el mapa SOLO si estamos en modo activo (uber)
                        if (isMapActive) {
                          setCurrentCongregacion(prev => prev ? {
                            ...prev,
                            lat: ev.detail.center.lat,
                            lng: ev.detail.center.lng
                          } : null);
                          
                          // Deshabilitar el botón de guardar apenas se mueve
                          setIsSavingDisabled(true);
                          
                          // Debounce para el geocoding
                          if (geocodeTimeoutRef.current) clearTimeout(geocodeTimeoutRef.current);
                          geocodeTimeoutRef.current = setTimeout(() => {
                            geocodePosition(ev.detail.center.lat, ev.detail.center.lng);
                          }, 1200);
                        }
                      }}
                      disableDefaultUI={true}
                      gestureHandling={'greedy'}
                    >
                      {/* Si estamos editando y no en modo uber, mostrar el marcador normal */}
                      {!isMapActive && currentCongregacion?.id && currentCongregacion?.lat && currentCongregacion?.lng && (
                        <AdvancedMarker position={{ lat: currentCongregacion.lat, lng: currentCongregacion.lng }} />
                      )}
                    </Map>
                  </APIProvider>
                  
                  {isMapActive && (
                    <>
                      {/* Pin fijo en el centro (Estilo Uber) */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none z-10 drop-shadow-xl animate-bounce-short">
                        <MapPin size={36} className="text-red-600" fill="currentColor" />
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-900 rounded-full opacity-50 pointer-events-none z-0"></div>

                      <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur text-xs px-2 py-1.5 rounded shadow-sm text-center pointer-events-none text-gray-700 font-medium border border-gray-200">
                        Desliza el mapa para ajustar la chincheta a la ubicación exacta
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Latitud</label>
                  <input
                    type="number"
                    step="any"
                    value={currentCongregacion?.lat || ''}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded outline-none bg-gray-100 text-gray-600 cursor-not-allowed select-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Longitud</label>
                  <input
                    type="number"
                    step="any"
                    value={currentCongregacion?.lng || ''}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded outline-none bg-gray-100 text-gray-600 cursor-not-allowed select-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría (Leyenda)</label>
                <select
                  value={currentCongregacion?.leyendaId || ''}
                  onChange={e => setCurrentCongregacion({ ...currentCongregacion, leyendaId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-ccb-blue outline-none"
                  required
                >
                  <option value="">-- Sin categoría --</option>
                  {legends.map(l => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </div>
              <div className="mt-4 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setCurrentCongregacion(null);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSavingDisabled || currentCongregacion?.ubicacion === 'Buscando dirección...'}
                  className="px-4 py-2 bg-ccb-blue text-white rounded font-medium hover:bg-ccb-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSavingDisabled ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Espere...</>
                  ) : (
                    'Guardar'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
