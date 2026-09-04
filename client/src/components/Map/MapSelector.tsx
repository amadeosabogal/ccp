/// <reference types="@types/google.maps" />
import { useState, useEffect, useRef } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
  useMapsLibrary
} from '@vis.gl/react-google-maps';

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

interface MapSelectorProps {
  onClose?: () => void;
  isReadOnly?: boolean;
  inline?: boolean;
}

const DEFAULT_CENTER = { lat: -9.189967, lng: -75.015152 };

export default function MapSelector({ onClose, isReadOnly = false, inline = false }: MapSelectorProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const [isSatellite, setIsSatellite] = useState(false);
  
  if (!apiKey) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 flex flex-col gap-4 relative animate-in fade-in zoom-in-95 duration-200">
           <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
           </button>
           <h3 className="text-xl font-bold text-red-600">Error de Configuración</h3>
           <p className="text-gray-700">Falta la clave de API de Google Maps (VITE_GOOGLE_MAPS_API_KEY) en tu archivo .env.</p>
           <p className="text-sm text-gray-500">Por favor, agrega la clave y reinicia el servidor de desarrollo.</p>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div className={inline ? "w-full h-full min-h-[500px] flex flex-col bg-white rounded-lg shadow-sm border border-gray-200" : "fixed inset-0 z-[100] bg-white flex flex-col animate-in fade-in zoom-in-95 duration-200"}>
        {!inline && (
          <div className="px-5 py-2.5 flex justify-between items-center bg-[#d4d9e2] text-ccb-dark shrink-0 shadow-sm z-10 border-b border-black/5">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-ccb-dark">
              {isReadOnly ? "Puntos de Referencia" : "Registrar Casa de Oración"}
            </h2>
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-black/10 rounded-full transition-colors text-ccb-dark"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        )}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 relative">
          {!isReadOnly && (
            <div className="w-full md:w-80 lg:w-96 border-t md:border-t-0 md:border-r p-5 overflow-y-auto bg-white flex flex-col shrink-0 order-2 md:order-1 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:shadow-none">
              <MapInteractionForm onClose={() => onClose && onClose()} />
            </div>
          )}
          <div className="flex-1 relative min-h-[40vh] md:min-h-0 order-1 md:order-2">
            <Map
              mapId="DEMO_MAP_ID"
              defaultZoom={6}
              defaultCenter={DEFAULT_CENTER}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
              clickableIcons={false}
              mapTypeId={isSatellite ? 'hybrid' : 'roadmap'}
            >
              <MapMarkerAndSearch isReadOnly={isReadOnly} />
            </Map>

            {/* Satellite Toggle */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setIsSatellite(!isSatellite)}
                className="bg-white/95 backdrop-blur-md p-2.5 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.15)] border border-gray-100 text-ccb-dark hover:bg-gray-50 hover:scale-105 transition-all flex items-center justify-center"
                title={isSatellite ? "Ver como plano" : "Ver como satélite"}
              >
                {isSatellite ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </APIProvider>
  );
}

// @ts-ignore
function MapInteractionForm({ onClose }: { onClose?: () => void }) {
  const [nombre, setNombre] = useState('');
  const [leyendas, setLeyendas] = useState<LegendCategory[]>([]);
  const [leyendaId, setLeyendaId] = useState('');
  const [locationData, setLocationData] = useState<{lat: number, lng: number, address: string} | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const savedL = localStorage.getItem('leyendas_mapa');
    if (savedL) {
      try {
        const parsed = JSON.parse(savedL);
        setLeyendas(parsed);
        if (parsed.length > 0) setLeyendaId(parsed[0].id);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    const handleLocationUpdate = (e: CustomEvent) => {
      setLocationData(e.detail);
    };
    window.addEventListener('map-location-updated', handleLocationUpdate as EventListener);
    return () => window.removeEventListener('map-location-updated', handleLocationUpdate as EventListener);
  }, []);

  const handleSave = () => {
    setErrorMsg('');
    if (!nombre.trim() || !locationData || !leyendaId) {
      setErrorMsg("Por favor completa todos los campos (nombre, ubicación y categoría).");
      return;
    }

    const newCongregacion: Congregacion = {
      id: Date.now().toString(),
      nombre,
      ubicacion: locationData.address,
      lat: locationData.lat,
      lng: locationData.lng,
      leyendaId
    };

    const saved = localStorage.getItem('congregaciones');
    const congregaciones: Congregacion[] = saved ? JSON.parse(saved) : [];
    congregaciones.push(newCongregacion);
    localStorage.setItem('congregaciones', JSON.stringify(congregaciones));

    setShowSuccess(true);
    setNombre('');
    setLocationData(null);
    window.dispatchEvent(new Event('congregaciones-updated'));
    window.dispatchEvent(new Event('map-clear-selection'));
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div>
        <label className="block text-sm font-semibold text-ccb-dark mb-2">
          Nombre de la Casa de Oración
        </label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Congregación Central de Lima"
          className="w-full px-4 py-2 border border-ccb-border rounded focus:ring-2 focus:ring-ccb-blue focus:border-ccb-blue outline-none transition-shadow"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-ccb-dark mb-2">
          Categoría / Leyenda
        </label>
        {leyendas.length === 0 ? (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded border border-red-200">
            No hay leyendas creadas. Debes crear al menos una categoría en el Área Restringida.
          </div>
        ) : (
          <select
            value={leyendaId}
            onChange={(e) => setLeyendaId(e.target.value)}
            className="w-full px-4 py-2 border border-ccb-border rounded focus:ring-2 focus:ring-ccb-blue focus:border-ccb-blue outline-none transition-shadow bg-white"
          >
            {leyendas.map(l => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-ccb-dark mb-2">
          Ubicación Seleccionada
        </label>
        <textarea
          readOnly
          value={locationData?.address || 'Selecciona un punto en el mapa o busca una dirección...'}
          className="w-full px-4 py-3 border border-ccb-border rounded bg-ccb-gray text-ccb-dark text-sm h-28 resize-none shadow-inner"
        />
        {locationData && (
          <div className="text-xs text-gray-500 mt-2 font-mono bg-ccb-gray p-2 rounded-md">
            Lat: {locationData.lat.toFixed(6)}<br/>
            Lng: {locationData.lng.toFixed(6)}
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded border border-red-200 mt-2">
          {errorMsg}
        </div>
      )}

      <div className="mt-auto pt-4">
        <button
          onClick={handleSave}
          disabled={!nombre.trim() || !locationData || !leyendaId}
          className="w-full bg-ccb-blue text-white font-semibold py-3 px-4 rounded hover:bg-ccb-dark disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-all shadow-md active:scale-[0.98]"
        >
          Guardar Punto de Referencia
        </button>
      </div>

      {showSuccess && (
        <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-200">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">¡Punto Registrado!</h3>
          <p className="text-gray-600 mb-6">La casa de oración ha sido registrada con éxito en el mapa.</p>
          <button
            onClick={() => {
              setShowSuccess(false);
            }}
            className="bg-ccb-blue text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-ccb-dark transition-colors shadow-md"
          >
            Aceptar
          </button>
        </div>
      )}
    </div>
  );
}

function MapMarkerAndSearch({ isReadOnly }: { isReadOnly: boolean }) {
  const map = useMap();
  const places = useMapsLibrary('places');
  const geocoding = useMapsLibrary('geocoding');
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [savedMarkers, setSavedMarkers] = useState<Congregacion[]>([]);
  const [leyendas, setLeyendas] = useState<LegendCategory[]>([]);
  const [selectedSavedMarker, setSelectedSavedMarker] = useState<Congregacion | null>(null);
  const [servicios, setServicios] = useState<any[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  // Load saved markers & legends
  useEffect(() => {
    // Load legends
    const savedL = localStorage.getItem('leyendas_mapa');
    if (savedL) {
      try {
        setLeyendas(JSON.parse(savedL));
      } catch(e) {}
    }

    const loadCongregaciones = () => {
      const savedC = localStorage.getItem('congregaciones');
      if (savedC) {
        try {
          const parsed = JSON.parse(savedC);
          if (parsed.length > 0 && !parsed[0].leyendaId) {
            localStorage.removeItem('congregaciones');
            setSavedMarkers([]);
            console.log("Puntos antiguos eliminados para dar paso al nuevo sistema de leyendas.");
          } else {
            setSavedMarkers(parsed);
          }
        } catch (e) {
          console.error("Error al cargar congregaciones", e);
        }
      }
    };

    const loadServicios = () => {
      const savedS = localStorage.getItem('servicios_registrados');
      if (savedS) {
        try {
          setServicios(JSON.parse(savedS));
        } catch(e) {}
      }
    };

    const handleClearSelection = () => {
      setMarkerPosition(null);
      setSelectedSavedMarker(null);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    };

    loadCongregaciones();
    loadServicios();

    window.addEventListener('congregaciones-updated', loadCongregaciones);
    window.addEventListener('servicios_registrados-updated', loadServicios);
    window.addEventListener('map-clear-selection', handleClearSelection);
    return () => {
      window.removeEventListener('congregaciones-updated', loadCongregaciones);
      window.removeEventListener('servicios_registrados-updated', loadServicios);
      window.removeEventListener('map-clear-selection', handleClearSelection);
    };
  }, []);

  // Setup SearchBox
  useEffect(() => {
    if (!places || !inputRef.current || isReadOnly) return;
    
    searchBoxRef.current = new places.SearchBox(inputRef.current);
    
    if (map) {
      searchBoxRef.current.bindTo('bounds', map);
    }

    const listener = searchBoxRef.current.addListener('places_changed', () => {
      const placesResult = searchBoxRef.current?.getPlaces();
      if (!placesResult || placesResult.length === 0) return;

      const place = placesResult[0];
      if (!place.geometry || !place.geometry.location) return;

      const newPos = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };

      setMarkerPosition(newPos);
      if (map) {
        map.setCenter(newPos);
        map.setZoom(16);
      }
      
      emitLocationUpdate(newPos, place.formatted_address || place.name || '');
    });

    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [places, map]);

  // Click on map
  useEffect(() => {
    if (!map) return;
    
    const clickListener = map.addListener('click', async (e: google.maps.MapMouseEvent) => {
      // Siempre cerrar el popup al hacer clic en cualquier parte del mapa
      setSelectedSavedMarker(null);

      if (isReadOnly) return;

      if (!e.latLng) return;
      const newPos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      setMarkerPosition(newPos);
      
      // Reverse Geocoding to get address
      if (geocoding) {
        const geocoder = new geocoding.Geocoder();
        try {
          const response = await geocoder.geocode({ location: newPos });
          const address = response.results[0]?.formatted_address || "Dirección aproximada (haz clic para ser más preciso)";
          emitLocationUpdate(newPos, address);
          
          if (inputRef.current) {
            inputRef.current.value = address;
          }
        } catch (error) {
          console.error("Error al obtener la dirección:", error);
          emitLocationUpdate(newPos, "Dirección desconocida");
        }
      } else {
         emitLocationUpdate(newPos, "Dirección desconocida");
      }
    });

    const contextMenuListener = map.addListener('contextmenu', (e: google.maps.MapMouseEvent) => {
      e.stop();
      setMarkerPosition(null);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      // Emitir null para limpiar el formulario
      const event = new CustomEvent('map-location-updated', { detail: null });
      window.dispatchEvent(event);
    });

    return () => {
      google.maps.event.removeListener(clickListener);
      google.maps.event.removeListener(contextMenuListener);
    };
  }, [map, geocoding]);

  const emitLocationUpdate = (pos: google.maps.LatLngLiteral, address: string) => {
    const event = new CustomEvent('map-location-updated', {
      detail: { ...pos, address }
    });
    window.dispatchEvent(event);
  };

  return (
    <>
      {!isReadOnly && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-11/12 max-w-md z-10">
          <input
            ref={inputRef}
            type="text"
            placeholder="Busca una calle, ciudad o punto..."
            className="w-full bg-white px-5 py-3 rounded-full shadow-lg border-0 outline-none focus:ring-2 focus:ring-ccb-blue text-sm font-medium text-ccb-dark"
          />
        </div>
      )}

      {leyendas.length > 0 && (
        <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-4 rounded shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-ccb-border z-10 max-h-[40vh] overflow-y-auto min-w-[150px]">
          <h4 className="text-sm font-bold text-ccb-dark mb-3 border-b border-ccb-border pb-2">Leyenda</h4>
          <div className="flex flex-col gap-3">
            {leyendas.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full shadow-sm border border-black/10" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm font-medium text-ccb-dark">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {savedMarkers.map((marker, idx) => {
        const category = leyendas.find(l => l.id === marker.leyendaId);
        const markerColor = category ? category.color : '#c00';
        return (
          <AdvancedMarker 
            key={marker.id || idx} 
            position={{ lat: marker.lat, lng: marker.lng }} 
            title={marker.nombre}
            onClick={() => setSelectedSavedMarker(marker)}
          >
             <div className="flex flex-col items-center group relative cursor-pointer">
               <div className="bg-white px-2 py-1 rounded shadow text-xs font-bold text-ccb-dark mb-1 pointer-events-none whitespace-nowrap border border-black/5 uppercase">
                 {marker.nombre}
               </div>
               <div className="text-white p-1.5 rounded-full border-2 border-white shadow-md transition-transform group-hover:scale-110" style={{ backgroundColor: markerColor }}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
               </div>
             </div>
          </AdvancedMarker>
        );
      })}

      {selectedSavedMarker && (() => {
        // Calcular totales para esta sala
        const serviciosSala = servicios.filter(s => s.sala_oracion.toUpperCase() === selectedSavedMarker.nombre.toUpperCase());
        
        let bautizosHombres = 0;
        let bautizosMujeres = 0;
        let santaCenaHombres = 0;
        let santaCenaMujeres = 0;
        
        serviciosSala.forEach(s => {
          if (s.tipo === 'bautizo') {
            bautizosHombres += s.hombres;
            bautizosMujeres += s.mujeres;
          } else if (s.tipo === 'santa_cena') {
            santaCenaHombres += s.hombres;
            santaCenaMujeres += s.mujeres;
          }
        });
        
        const totalBautizos = bautizosHombres + bautizosMujeres;
        const totalSantaCena = santaCenaHombres + santaCenaMujeres;

        return (
          <InfoWindow
            position={{ lat: selectedSavedMarker.lat, lng: selectedSavedMarker.lng }}
            onCloseClick={() => setSelectedSavedMarker(null)}
            headerDisabled={true}
          >
            <div className="p-2 max-w-[240px]">
              <h3 className="font-bold text-ccb-dark text-sm mb-1 uppercase">{selectedSavedMarker.nombre}</h3>
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{selectedSavedMarker.ubicacion}</p>
              
              {!isReadOnly && (
                <div className="mb-3 space-y-2 border-t border-gray-200 pt-2">
                  <div>
                    <p className="text-xs font-bold text-ccb-dark">Bautizos ({totalBautizos})</p>
                    <p className="text-[10px] text-gray-500">Hombres: {bautizosHombres} | Mujeres: {bautizosMujeres}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-ccb-dark">Santas Cenas ({totalSantaCena})</p>
                    <p className="text-[10px] text-gray-500">Hombres: {santaCenaHombres} | Mujeres: {santaCenaMujeres}</p>
                  </div>
                </div>
              )}

              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedSavedMarker.lat},${selectedSavedMarker.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-ccb-blue text-white py-1.5 px-3 rounded text-sm font-semibold hover:bg-ccb-dark transition-colors shadow-sm"
              >
                Cómo llegar
              </a>
            </div>
          </InfoWindow>
        );
      })()}

      {markerPosition && (
        <AdvancedMarker position={markerPosition} />
      )}
    </>
  );
}
