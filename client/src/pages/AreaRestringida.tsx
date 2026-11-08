import { Link } from 'react-router-dom';
import { Settings, BarChart2 } from 'lucide-react';

export default function AreaRestringida() {
  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-16 px-4">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-4xl font-bold text-ccb-dark mb-2 sm:mb-4">Área Restringida</h1>
        <p className="text-sm sm:text-lg text-gray-600">
          Seleccione el sistema administrativo al que desea ingresar.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-lg mx-auto">
        <Link 
          to="/servicios/admin" 
          className="bg-white rounded-md border border-gray-300 p-6 sm:p-8 flex flex-col items-center justify-center text-center hover:bg-[#e2e8f0] transition-colors group h-36 sm:h-40 shadow-xs"
        >
          <div className="text-ccb-dark mb-3 sm:mb-4">
            <Settings size={44} strokeWidth={1.5} className="sm:w-[52px] sm:h-[52px]" />
          </div>
          <h2 className="text-xs sm:text-sm font-bold text-ccb-dark group-hover:underline decoration-2 underline-offset-4 tracking-wide uppercase">Servicios</h2>
        </Link>

        <Link 
          to="/relatorio/admin" 
          className="bg-white rounded-md border border-gray-300 p-6 sm:p-8 flex flex-col items-center justify-center text-center hover:bg-[#e2e8f0] transition-colors group h-36 sm:h-40 shadow-xs"
        >
          <div className="text-ccb-dark mb-3 sm:mb-4">
            <BarChart2 size={44} strokeWidth={1.5} className="sm:w-[52px] sm:h-[52px]" />
          </div>
          <h2 className="text-xs sm:text-sm font-bold text-ccb-dark group-hover:underline decoration-2 underline-offset-4 tracking-wide uppercase">Relatorios</h2>
        </Link>
      </div>
    </div>
  );
}
