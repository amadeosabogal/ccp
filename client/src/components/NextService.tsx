import { PlayCircle, Hand, Volume2, Phone } from 'lucide-react';

export default function NextService() {
  const options = [
    { icon: <PlayCircle className="text-red-600" size={20} />, label: 'Video' },
    { icon: <Hand className="text-blue-500" size={20} />, label: 'Lengua de señas' },
    { icon: <Volume2 className="text-green-600" size={20} />, label: 'Audio' },
    { icon: <Phone className="text-amber-700" size={20} />, label: 'Teléfono' },
  ];

  return (
    <section className="mt-8">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-2">
          <div className="mt-1">
            <svg className="w-5 h-5 text-ccb-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
            </svg>
          </div>
          <div>
            <h2 className="text-ccb-blue font-bold text-lg">Próximo Culto en línea</h2>
            <p className="text-ccb-red font-medium">02/08 a las 10h</p>
          </div>
        </div>
        
        <button className="border border-ccb-blue text-ccb-blue px-4 py-1.5 rounded text-sm font-semibold hover:bg-ccb-blue hover:text-white transition-colors">
          Pedir oración
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {options.map((opt, idx) => (
          <button key={idx} className="flex items-center justify-center gap-2 border border-ccb-blue rounded-md py-2 hover:bg-ccb-gray transition-colors text-sm font-medium text-gray-700">
            {opt.icon}
            {opt.label}
          </button>
        ))}
      </div>
    </section>
  );
}
