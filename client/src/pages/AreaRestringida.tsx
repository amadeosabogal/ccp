import { Link } from 'react-router-dom';
import { Settings, BarChart2 } from 'lucide-react';

export default function AreaRestringida() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-ccb-dark mb-4">Área Restringida</h1>
        <p className="text-lg text-gray-600">
          Seleccione el sistema administrativo al que desea ingresar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
        <Link 
          to="/servicios/admin" 
          className="bg-white rounded-md border border-gray-300 p-8 flex flex-col items-center justify-center text-center hover:bg-[#e2e8f0] transition-colors group h-40"
        >
          <div className="text-ccb-dark mb-4">
            <Settings size={52} strokeWidth={1.5} />
          </div>
          <h2 className="text-sm font-bold text-ccb-dark group-hover:underline decoration-2 underline-offset-4 tracking-wide uppercase">Servicios</h2>
        </Link>

        <Link 
          to="/relatorio/admin" 
          className="bg-white rounded-md border border-gray-300 p-8 flex flex-col items-center justify-center text-center hover:bg-[#e2e8f0] transition-colors group h-40"
        >
          <div className="text-ccb-dark mb-4">
            <BarChart2 size={52} strokeWidth={1.5} />
          </div>
          <h2 className="text-sm font-bold text-ccb-dark group-hover:underline decoration-2 underline-offset-4 tracking-wide uppercase">Relatorios</h2>
        </Link>
      </div>
    </div>
  );
}
