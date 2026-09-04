import { useEffect, useRef } from 'react';

interface RelatorioResultsProps {
  htmlContent: string;
  isLoading: boolean;
  onRowClick: (id: string) => void;
}

export default function RelatorioResults({ htmlContent, isLoading, onRowClick }: RelatorioResultsProps) {
  const containerRef = useRef<HTMLTableSectionElement>(null);

  // Intercept clicks on the injected HTML
  useEffect(() => {
    const handleTableClick = (e: MouseEvent) => {
      // The original CCB page puts data-id on a child element or the tr itself.
      // Usually it's on an element inside the td or the td itself. Let's look for closest element with data-id.
      const target = e.target as HTMLElement;
      const elementWithId = target.closest('[data-id]') as HTMLElement;
      
      if (elementWithId && elementWithId.dataset.id) {
        onRowClick(elementWithId.dataset.id);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('click', handleTableClick);
    }

    return () => {
      if (container) {
        container.removeEventListener('click', handleTableClick);
      }
    };
  }, [onRowClick, htmlContent]); // Re-bind if htmlContent changes, though delegation on container works anyway

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ccb-blue"></div>
      </div>
    );
  }

  if (!htmlContent) {
    return null;
  }

  return (
    <div className="mt-8 bg-white p-4 rounded-md shadow-sm overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <tbody 
          ref={containerRef}
          className="divide-y divide-gray-200 cursor-pointer [&>tr:hover]:bg-gray-50 [&_td]:p-4"
          dangerouslySetInnerHTML={{ __html: htmlContent }} 
        />
      </table>
    </div>
  );
}
