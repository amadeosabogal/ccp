import React from 'react';
import MapSelector from '../../components/Map/MapSelector';

export default function RegistroMapa() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col h-[calc(100vh-6rem)]">
      <div className="mb-6 shrink-0">
        <h1 className="text-3xl font-bold text-gray-800">Registrar Casa de Oración</h1>
        <p className="text-gray-600 mt-2">
          Busca una ubicación en el mapa o haz clic para marcar y guardar un nuevo punto de referencia oficial.
        </p>
      </div>

      <div className="flex-1 min-h-[500px] w-full relative">
        <MapSelector inline={true} isReadOnly={false} />
      </div>
    </div>
  );
}
