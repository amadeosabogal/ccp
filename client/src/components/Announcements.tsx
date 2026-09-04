
export default function Announcements() {
  return (
    <section>
      <div className="flex items-center mb-4">
        <h2 className="text-ccb-blue font-bold text-lg whitespace-nowrap mr-4">Comunicado Importante</h2>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>
      <div className="overflow-hidden text-sm text-gray-600 font-medium">
        <div className="flex space-x-8 animate-marquee whitespace-nowrap">
          <span>28/06/2026 - Reunión de los Cooperadores de Jóvenes y Menores - 28/jun/26 - Temas</span>
          <span>05/06/2026 - Colecta Obra de Piedad - Campinas/SP y región</span>
        </div>
      </div>
    </section>
  );
}
