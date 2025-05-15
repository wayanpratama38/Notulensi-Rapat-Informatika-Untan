import React from 'react';
import { flexRender } from '@tanstack/react-table';

const TableHeader = ({ headerGroups, onSort }) => {
  return (
    <thead className="bg-background-secondary">
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id} colSpan={header.colSpan}
              className="px-4 py-3 border-b-2 border-border-strong text-left text-text-primary font-semibold whitespace-nowrap"
            >
              {header.isPlaceholder ? null : (
                <button type="button"
                  className="bg-transparent border-none p-0 cursor-pointer font-semibold text-text-primary inline-flex items-center hover:text-text-link"
                  onClick={() => header.column.getCanSort() && onSort(header)}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.id !== 'select' && header.column.id !== 'actions' && (
                    <span className="ml-1.5 w-4 h-4 inline-flex items-center justify-center">
                        {header.column.getCanSort() && header.column.getIsSorted() ? (header.column.getIsSorted() === "asc" ? 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                        </svg> 
                        : <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                          </svg>) 
                        : <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                          </svg>
                        }
                    </span>
                  )}
                </button>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;