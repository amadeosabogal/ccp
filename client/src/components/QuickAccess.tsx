import { Building2, Megaphone, MonitorPlay, FileText, Inbox } from 'lucide-react';

export default function QuickAccess() {
  const cards = [
    { icon: <Building2 className="w-10 h-10 mb-3 text-ccb-blue" />, label: 'Institucional' },
    { icon: <Megaphone className="w-10 h-10 mb-3 text-ccb-blue" />, label: 'Hermandad' },
    { icon: <MonitorPlay className="w-10 h-10 mb-3 text-ccb-blue" />, label: 'Culto en línea' },
    { icon: <FileText className="w-10 h-10 mb-3 text-ccb-blue" />, label: 'Relatório' },
    { icon: <Inbox className="w-10 h-10 mb-3 text-ccb-blue" />, label: 'Ofrendas' },
  ];

  return (
    <section>
      <div className="flex items-center mb-6">
        <h2 className="text-ccb-blue font-bold text-lg whitespace-nowrap mr-4">Acceso rápido</h2>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, idx) => (
          <div key={idx} className="border border-gray-300 rounded-md p-6 flex flex-col items-center justify-center hover:shadow-md hover:border-ccb-blue transition-all cursor-pointer bg-white">
            {card.icon}
            <span className="text-sm font-bold text-ccb-blue text-center">{card.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
