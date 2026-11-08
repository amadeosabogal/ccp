import { useEffect, useRef } from 'react';
import { MapPin, X } from 'lucide-react';

interface RelatorioModalProps {
  isOpen: boolean;
  onClose: () => void;
  htmlContent: string;
  isLoading: boolean;
}

export default function RelatorioModal({ isOpen, onClose, htmlContent, isLoading }: RelatorioModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          onClose();
        }
      }}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[92vh] sm:max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-3.5 sm:p-4 border-b border-gray-200 bg-gray-50/50">
          <h3 className="text-base sm:text-lg font-bold text-ccb-blue flex items-center gap-2">
            <MapPin size={20} className="text-ccb-blue shrink-0" />
            <span>Detalles de la Localidad</span>
          </h3>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            aria-label="Cerrar ventana"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto overflow-x-auto flex-1">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center py-12 space-y-3">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-ccb-blue"></div>
              <span className="text-xs sm:text-sm text-gray-500 font-medium">Cargando detalles...</span>
            </div>
          ) : (
            <div 
              className="prose max-w-none text-xs sm:text-sm text-gray-700 [&_table]:w-full [&_td]:py-2 [&_td]:border-b [&_td]:border-gray-100 [&_th]:text-left [&_th]:py-2 [&_th]:border-b-2 [&_th]:border-gray-200 [&_h4]:font-bold [&_h4]:text-ccb-blue [&_h4]:text-sm sm:[&_h4]:text-base [&_h4]:mt-3 [&_h4]:mb-1 [&_strong]:text-gray-900"
              dangerouslySetInnerHTML={{ __html: htmlContent }} 
            />
          )}
        </div>
        
        {/* Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button 
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-gray-200 text-gray-800 rounded font-medium hover:bg-gray-300 transition-colors cursor-pointer text-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
