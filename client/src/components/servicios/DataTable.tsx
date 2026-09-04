import type { ReactNode } from 'react';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: keyof T;
  cell?: (item: T) => ReactNode;
}

interface DataTableProps<T> {
  title: string;
  description: string;
  data: T[];
  columns: Column<T>[];
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  addLabel?: string;
  emptyStateMessage?: string;
}

export default function DataTable<T>({
  title,
  description,
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
  addLabel = 'Nuevo',
  emptyStateMessage = 'No hay registros disponibles.'
}: DataTableProps<T>) {
  return (
    <div className="bg-white border border-gray-200 flex flex-col shadow-sm">
      <div className="p-6 sm:flex sm:items-center sm:justify-between border-b border-gray-200">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full sm:w-64 pl-10 pr-3 py-2 text-sm border border-gray-300 focus:outline-none focus:border-ccb-dark focus:ring-1 focus:ring-ccb-dark bg-white"
              placeholder="Buscar..."
            />
          </div>
          {onAdd && (
            <button
              onClick={onAdd}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-bold text-white bg-ccb-dark hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ccb-dark transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              {addLabel}
            </button>
          )}
        </div>
      </div>
      
      {/* Vista de Tablas para Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase"
                >
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">
                  Acciones
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((item, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-gray-50 transition-colors">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                      {col.cell ? col.cell(item) : String(item[col.accessor])}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        {onEdit && (
                          <button onClick={() => onEdit(item)} className="text-gray-400 hover:text-ccb-dark transition-colors" title="Editar">
                            <Pencil className="w-4 h-4" />
                          </button>
                        )}
                        {onDelete && (
                          <button onClick={() => onDelete(item)} className="text-gray-400 hover:text-red-600 transition-colors" title="Eliminar">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500 text-sm">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Search className="h-6 w-6 text-gray-400 mb-2" />
                    <p className="font-bold text-gray-900">No hay datos</p>
                    <p>{emptyStateMessage}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Vista de Tarjetas para Móviles */}
      <div className="md:hidden">
        {data.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {data.map((item, rowIdx) => (
              <div key={rowIdx} className="p-4 space-y-3 bg-white">
                {columns.map((col, colIdx) => (
                  <div key={colIdx} className="flex flex-col">
                    <span className="text-xs font-bold text-gray-500 uppercase">{col.header}</span>
                    <span className="text-sm text-gray-900 font-medium mt-1">
                      {col.cell ? col.cell(item) : String(item[col.accessor])}
                    </span>
                  </div>
                ))}
                {(onEdit || onDelete) && (
                  <div className="flex justify-end gap-4 pt-2 border-t border-gray-100">
                    {onEdit && (
                      <button onClick={() => onEdit(item)} className="text-gray-500 flex items-center text-sm font-bold hover:text-ccb-dark">
                        <Pencil className="w-4 h-4 mr-1" /> Editar
                      </button>
                    )}
                    {onDelete && (
                      <button onClick={() => onDelete(item)} className="text-gray-500 flex items-center text-sm font-bold hover:text-red-600">
                        <Trash2 className="w-4 h-4 mr-1" /> Eliminar
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500 text-sm bg-white">
            <div className="flex flex-col items-center justify-center gap-2">
              <Search className="h-6 w-6 text-gray-400 mb-2" />
              <p className="font-bold text-gray-900">No hay datos</p>
              <p>{emptyStateMessage}</p>
            </div>
          </div>
        )}
      </div>
      
      {data.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 flex justify-between items-center font-bold">
          <span>Mostrando {data.length} resultados</span>
        </div>
      )}
    </div>
  );
}
