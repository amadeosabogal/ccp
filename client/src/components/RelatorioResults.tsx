import { useEffect, useRef } from 'react';
import { Info } from 'lucide-react';

interface RelatorioResultsProps {
  htmlContent: string;
  isLoading: boolean;
  onRowClick: (id: string) => void;
  onPageChange?: (page: number) => void;
}

export default function RelatorioResults({ 
  htmlContent, 
  isLoading, 
  onRowClick, 
  onPageChange 
}: RelatorioResultsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Intercept clicks on the injected HTML (details and pagination)
  useEffect(() => {
    const handleContainerClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // 1. Check if clicked element or parent is a pagination button (e.g. Próximo, Anterior)
      const button = target.closest('button');
      if (button) {
        const pageVal = button.value || button.getAttribute('value');
        if (pageVal && onPageChange) {
          e.preventDefault();
          e.stopPropagation();
          const pageNum = parseInt(pageVal, 10);
          if (!isNaN(pageNum)) {
            onPageChange(pageNum);
            return;
          }
        }
      }

      // 2. Check for item row with data-id to open details modal
      const elementWithId = target.closest('[data-id]') as HTMLElement | null;
      if (elementWithId && elementWithId.dataset.id) {
        e.preventDefault();
        onRowClick(elementWithId.dataset.id);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('click', handleContainerClick);
    }

    return () => {
      if (container) {
        container.removeEventListener('click', handleContainerClick);
      }
    };
  }, [onRowClick, onPageChange, htmlContent]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-16 space-y-3">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ccb-blue"></div>
        <span className="text-sm text-gray-500 font-medium">Cargando resultados...</span>
      </div>
    );
  }

  if (!htmlContent) {
    return null;
  }

  const isFullTable = htmlContent.includes('<table');

  return (
    <div className="mt-8">
      {/* Mobile Hint Banner */}
      <div className="flex items-center justify-between text-xs text-gray-600 bg-blue-50/70 border border-blue-100 rounded-t-md px-3.5 py-2">
        <span className="flex items-center gap-1.5 font-medium">
          <Info size={14} className="text-ccb-blue shrink-0" />
          <span>Toca una localidad para ver días y horarios de culto</span>
        </span>
        <span className="md:hidden text-gray-400 text-[11px] shrink-0 ml-2">
          ⇄ Desliza
        </span>
      </div>

      <div 
        ref={containerRef}
        className="bg-white p-2.5 sm:p-4 rounded-b-md shadow-sm overflow-x-auto border border-t-0 border-gray-100 [&_table]:w-full [&_table]:text-left [&_table]:border-collapse [&_tbody>tr]:cursor-pointer [&_tbody>tr]:transition-colors [&_tbody>tr:hover]:bg-blue-50/40 [&_tbody>tr:active]:bg-blue-100/50 [&_tbody_td]:p-3 sm:[&_tbody_td]:p-4 [&_tbody_td]:text-xs sm:[&_tbody_td]:text-sm [&_thead_th]:p-3 sm:[&_thead_th]:p-4 [&_thead_th]:border-b [&_thead_th]:border-gray-200 [&_thead_th]:text-gray-700 [&_thead_th]:font-semibold [&_thead_th]:text-xs sm:[&_thead_th]:text-sm [&_tfoot_td]:p-4 sm:[&_tfoot_td]:p-6 [&_tfoot_td]:text-center [&_button]:bg-[#004f71] [&_button]:text-white [&_button]:px-4 sm:[&_button]:px-8 [&_button]:py-2 sm:[&_button]:py-2.5 [&_button]:rounded [&_button]:font-medium [&_button]:hover:bg-[#003853] [&_button]:transition-colors [&_button]:mx-1 sm:[&_button]:mx-2 [&_button]:my-1 [&_button]:cursor-pointer [&_button]:shadow-sm [&_button]:text-xs sm:[&_button]:text-sm [&_[data-id]]:cursor-pointer"
      >
        {isFullTable ? (
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        ) : (
          <table className="w-full text-left border-collapse">
            <tbody 
              className="divide-y divide-gray-200 cursor-pointer [&>tr:hover]:bg-gray-50 [&_td]:p-3 sm:[&_td]:p-4 text-xs sm:text-sm"
              dangerouslySetInnerHTML={{ __html: htmlContent }} 
            />
          </table>
        )}
      </div>
    </div>
  );
}
