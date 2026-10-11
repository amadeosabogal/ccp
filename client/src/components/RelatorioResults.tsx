import { useEffect, useRef } from 'react';

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
    <div 
      ref={containerRef}
      className="mt-8 bg-white p-4 rounded-md shadow-sm overflow-x-auto [&_table]:w-full [&_table]:text-left [&_table]:border-collapse [&_tbody>tr]:cursor-pointer [&_tbody>tr:hover]:bg-gray-50 [&_tbody_td]:p-4 [&_thead_th]:p-4 [&_thead_th]:border-b [&_thead_th]:border-gray-200 [&_thead_th]:text-gray-700 [&_thead_th]:font-semibold [&_tfoot_td]:p-6 [&_tfoot_td]:text-center [&_button]:bg-[#004f71] [&_button]:text-white [&_button]:px-8 [&_button]:py-2.5 [&_button]:rounded [&_button]:font-medium [&_button]:hover:bg-[#003853] [&_button]:transition-colors [&_button]:mx-2 [&_button]:cursor-pointer [&_button]:shadow-sm"
    >
      {isFullTable ? (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      ) : (
        <table className="w-full text-left border-collapse">
          <tbody 
            className="divide-y divide-gray-200 cursor-pointer [&>tr:hover]:bg-gray-50 [&_td]:p-4"
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
          />
        </table>
      )}
    </div>
  );
}
