// "use client" // Pertahankan jika Anda menggunakan Next.js App Router

// import * as React from "react"
// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table"

// // Data tetap sama
// const data = [
//   { id: "m5gr84i9", amount: 316, status: "success", email: "ken99@example.com" },
//   { id: "3u1reuv4", amount: 242, status: "success", email: "Abe45@example.com" },
//   { id: "derv1ws0", amount: 837, status: "processing", email: "Monserrat44@example.com" },
//   { id: "5kma53ae", amount: 874, status: "success", email: "Silas22@example.com" },
//   { id: "bhqecj4p", amount: 721, status: "failed", email: "carmella@example.com" },
//   { id: "l2k3j4h5", amount: 100, status: "pending", email: "user1@example.com" },
//   { id: "g6f7e8d9", amount: 200, status: "success", email: "user2@example.com" },
//   { id: "c0b1a2z3", amount: 150, status: "processing", email: "user3@example.com" },
//   { id: "y4x5w6v7", amount: 50, status: "failed", email: "user4@example.com" },
//   { id: "u8t9s0r1", amount: 250, status: "success", email: "user5@example.com" },
//   { id: "q2p3o4n5", amount: 300, status: "pending", email: "user6@example.com" },
// ];

// export function DataTableDemo() {
//   const [sorting, setSorting] = React.useState([])
//   const [columnFilters, setColumnFilters] = React.useState([])
//   const [columnVisibility, setColumnVisibility] = React.useState({})
//   const [rowSelection, setRowSelection] = React.useState({})
  
//   const [activeActionMenuRowId, setActiveActionMenuRowId] = React.useState(null);
//   const [isColumnToggleMenuVisible, setIsColumnToggleMenuVisible] = React.useState(false);

//   const columns = React.useMemo(() => [
//     {
//       id: "select",
//       header: ({ table }) => (
//         <input
//           type="checkbox"
//           ref={el => {
//             if (el) {
//               el.indeterminate = table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected();
//             }
//           }}
//           checked={table.getIsAllPageRowsSelected()}
//           onChange={e => table.toggleAllPageRowsSelected(!!e.target.checked)}
//           aria-label="Select all"
//         />
//       ),
//       cell: ({ row }) => (
//         <input
//           type="checkbox"
//           checked={row.getIsSelected()}
//           onChange={e => row.toggleSelected(!!e.target.checked)}
//           aria-label="Select row"
//         />
//       ),
//       enableSorting: false,
//       enableHiding: false,
//     },
//     {
//       accessorKey: "status",
//       header: "Status",
//       cell: ({ row }) => (
//         <div style={{ textTransform: 'capitalize' }}>{row.getValue("status")}</div>
//       ),
//     },
//     {
//       accessorKey: "email",
//       header: ({ column }) => {
//         return (
//           <button
//             type="button"
//             className="table-header-sort-button"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             Email
//             <span>↕</span>
//           </button>
//         )
//       },
//       cell: ({ row }) => <div style={{ textTransform: 'lowercase' }}>{row.getValue("email")}</div>,
//     },
//     {
//       accessorKey: "amount",
//       header: () => <div style={{ textAlign: 'right' }}>Amount</div>,
//       cell: ({ row }) => {
//         const amount = parseFloat(row.getValue("amount"))
//         const formatted = new Intl.NumberFormat("en-US", {
//           style: "currency",
//           currency: "USD",
//         }).format(amount)
//         return <div style={{ textAlign: 'right', fontWeight: '500' }}>{formatted}</div>
//       },
//     },
//     {
//       id: "actions",
//       enableHiding: false,
//       cell: ({ row }) => {
//         const payment = row.original
//         const isMenuOpen = activeActionMenuRowId === row.id;

//         return (
//           <div className="action-menu-container">
//             <button
//               type="button"
//               id={`action-menu-button-${row.id}`} // ID untuk logika click outside
//               className="action-menu-trigger"
//               aria-label="Open actions menu"
//               onClick={() => setActiveActionMenuRowId(isMenuOpen ? null : row.id)}
//             >
//               ...
//             </button>
//             {isMenuOpen && (
//               <div 
//                 id={`action-menu-content-${row.id}`} // ID untuk logika click outside
//                 className="dropdown-menu-content action-menu-dropdown"
//               >
//                 <div className="dropdown-menu-label">Actions</div>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     navigator.clipboard.writeText(payment.id);
//                     setActiveActionMenuRowId(null);
//                   }}
//                 >
//                   Copy payment ID
//                 </button>
//                 <hr/>
//                 <button
//                   type="button"
//                   onClick={() => { alert('View customer: ' + payment.email); setActiveActionMenuRowId(null); }}
//                 >
//                   View customer
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => { alert('View payment details for ID: ' + payment.id); setActiveActionMenuRowId(null); }}
//                 >
//                   View payment details
//                 </button>
//               </div>
//             )}
//           </div>
//         )
//       },
//     },
//   ], [activeActionMenuRowId]);


//   const table = useReactTable({
//     data,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   })

//   React.useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (activeActionMenuRowId && !event.target.closest(`#action-menu-button-${activeActionMenuRowId}`) && !event.target.closest(`#action-menu-content-${activeActionMenuRowId}`)) {
//         setActiveActionMenuRowId(null);
//       }
//       if (isColumnToggleMenuVisible && !event.target.closest('#column-toggle-button') && !event.target.closest('#columns-visibility-dropdown')) {
//         setIsColumnToggleMenuVisible(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [activeActionMenuRowId, isColumnToggleMenuVisible]);


//   return (
//     <div className="data-table-container"> {/* Wrapper utama */}
//       <div className="top-controls"> {/* Kontrol atas (filter & tombol kolom) */}
//         <input
//           type="text"
//           placeholder="Filter emails..."
//           value={(table.getColumn("email")?.getFilterValue()) ?? ""}
//           onChange={(event) =>
//             table.getColumn("email")?.setFilterValue(event.target.value)
//           }
//         />
//         <div className="columns-toggle-container"> {/* Pembungkus untuk tombol dan menu kolom */}
//           <button
//             id="column-toggle-button" // ID untuk logika click outside
//             type="button"
//             onClick={() => setIsColumnToggleMenuVisible(!isColumnToggleMenuVisible)}
//           >
//             Columns <span>▼</span>
//           </button>
//           {isColumnToggleMenuVisible && (
//             <div 
//                 id="columns-visibility-dropdown" // ID untuk logika click outside
//                 className="dropdown-menu-content columns-visibility-dropdown"
//             >
//               {table
//                 .getAllColumns()
//                 .filter((column) => column.getCanHide())
//                 .map((column) => {
//                   return (
//                     <label key={column.id} className="dropdown-menu-checkbox-item">
//                       <input
//                         type="checkbox"
//                         checked={column.getIsVisible()}
//                         onChange={(e) =>
//                           column.toggleVisibility(!!e.target.checked)
//                         }
//                       />
//                       {column.id}
//                     </label>
//                   )
//                 })}
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="table-wrapper"> {/* Pembungkus untuk tabel agar bisa scroll horizontal jika perlu */}
//         <table>
//           <thead>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <th key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </th>
//                   )
//                 })}
//               </tr>
//             ))}
//           </thead>
//           <tbody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <tr
//                   key={row.id}
//                   data-state={row.getIsSelected() ? "selected" : undefined} // data-state untuk styling
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <td key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={columns.length} className="no-results-cell">
//                   No results.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       <div className="pagination-controls"> {/* Kontrol paginasi */}
//         <div className="selected-rows-info">
//           {table.getFilteredSelectedRowModel().rows.length} of{" "}
//           {table.getFilteredRowModel().rows.length} row(s) selected.
//         </div>
//         <div className="pagination-buttons">
//           <button
//             type="button"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//           >
//             Previous
//           </button>
//           <button
//             type="button"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }



// ITERASI KEDUA
"use client" // Pertahankan jika Anda menggunakan Next.js App Router

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

// Data tetap sama
const data = [
  { id: "m5gr84i9", amount: 316, status: "success", email: "ken99@example.com" },
  { id: "3u1reuv4", amount: 242, status: "success", email: "Abe45@example.com" },
  { id: "derv1ws0", amount: 837, status: "processing", email: "Monserrat44@example.com" },
  { id: "5kma53ae", amount: 874, status: "success", email: "Silas22@example.com" },
  { id: "bhqecj4p", amount: 721, status: "failed", email: "carmella@example.com" },
  { id: "l2k3j4h5", amount: 100, status: "pending", email: "user1@example.com" },
  { id: "g6f7e8d9", amount: 200, status: "success", email: "user2@example.com" },
  { id: "c0b1a2z3", amount: 150, status: "processing", email: "user3@example.com" },
  { id: "y4x5w6v7", amount: 50, status: "failed", email: "user4@example.com" },
  { id: "u8t9s0r1", amount: 250, status: "success", email: "user5@example.com" },
  { id: "q2p3o4n5", amount: 300, status: "pending", email: "user6@example.com" },
];

// Warna hardcoded untuk tema gelap
const darkThemeColors = {
  backgroundBody: '#171f2f', // Mirip github dark atau --color-gray-900 Anda
  backgroundPrimary: '#161B22', // Mirip --color-gray-800 Anda (untuk container tabel)
  backgroundSecondary: '#21262D', // Mirip --color-gray-700 Anda (untuk header, input bg)
  backgroundTertiary: '#30363D', // Mirip --color-gray-600 Anda (untuk hover)
  
  textPrimary: '#C9D1D9', // Mirip --color-gray-50 atau --color-gray-100 Anda
  textSecondary: '#8B949E', // Mirip --color-gray-300 atau --color-gray-400 Anda
  textTertiary: '#586069', // Mirip --color-gray-500 atau --color-gray-400 Anda (untuk placeholder)
  textDisabled: '#484F58',

  borderDefault: '#30363D', // Mirip --color-gray-700 atau --color-gray-600 Anda
  borderStrong: '#21262D', // Mirip --color-gray-600 atau --color-gray-500 Anda (untuk border input)
  borderFocus: '#58A6FF', // Mirip --color-brand-400 Anda (biru terang)

  brandPrimary: '#58A6FF', // Mirip --color-brand-400 atau --color-brand-500 (dark) Anda
  brandPrimaryHover: '#79C0FF',
  textOnBrand: '#0D1117', // Teks gelap di atas background brand terang

  rowSelectedBg: '#2D4F7C', // Warna biru gelap untuk baris terpilih
  rowSelectedText: '#C9D1D9',
};


export function DataTableDemo() {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  
  const [activeActionMenuRowId, setActiveActionMenuRowId] = React.useState(null);
  const [isColumnToggleMenuVisible, setIsColumnToggleMenuVisible] = React.useState(false);

  const columns = React.useMemo(() => [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          style={{ accentColor: darkThemeColors.brandPrimary, backgroundColor: darkThemeColors.backgroundSecondary, borderColor: darkThemeColors.borderStrong, borderRadius: '3px', width: '16px', height: '16px' }}
          ref={el => {
            if (el) {
              el.indeterminate = table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected();
            }
          }}
          checked={table.getIsAllPageRowsSelected()}
          onChange={e => table.toggleAllPageRowsSelected(!!e.target.checked)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          style={{ accentColor: darkThemeColors.brandPrimary, backgroundColor: darkThemeColors.backgroundSecondary, borderColor: darkThemeColors.borderStrong, borderRadius: '3px', width: '16px', height: '16px' }}
          checked={row.getIsSelected()}
          onChange={e => row.toggleSelected(!!e.target.checked)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div style={{ textTransform: 'capitalize', color: darkThemeColors.textSecondary }}>{row.getValue("status")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <button
            type="button"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontWeight: '600', color: darkThemeColors.textPrimary, display: 'inline-flex', alignItems: 'center' }}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <span style={{ marginLeft: '6px' }}>↕</span>
          </button>
        )
      },
      cell: ({ row }) => <div style={{ textTransform: 'lowercase', color: darkThemeColors.textSecondary }}>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "amount",
      header: () => <div style={{ textAlign: 'right', color: darkThemeColors.textPrimary, fontWeight: '600' }}>Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
        return <div style={{ textAlign: 'right', fontWeight: '500', color: darkThemeColors.textSecondary }}>{formatted}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original
        const isMenuOpen = activeActionMenuRowId === row.id;

        return (
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              id={`action-menu-button-${row.id}`}
              aria-label="Open actions menu"
              style={{ background: 'none', border: '1px solid transparent', color: darkThemeColors.textSecondary, padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkThemeColors.backgroundTertiary}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              onClick={() => setActiveActionMenuRowId(isMenuOpen ? null : row.id)}
            >
              ...
            </button>
            {isMenuOpen && (
              <div 
                id={`action-menu-content-${row.id}`}
                style={{
                  position: 'absolute', right: 0, top: '100%', marginTop: '4px',
                  backgroundColor: darkThemeColors.backgroundSecondary,
                  border: `1px solid ${darkThemeColors.borderDefault}`,
                  borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  zIndex: 100, minWidth: '180px', padding: '8px 0'
                }}
              >
                <div style={{ padding: '8px 16px', fontSize: '12px', fontWeight: '600', color: darkThemeColors.textTertiary }}>Actions</div>
                {[
                  { label: "Copy payment ID", action: () => navigator.clipboard.writeText(payment.id) },
                  null, // Separator
                  { label: "View customer", action: () => alert('View customer: ' + payment.email) },
                  { label: "View payment details", action: () => alert('View payment details for ID: ' + payment.id) },
                ].map((item, index) => item === null ? <hr key={`sep-${index}`} style={{ margin: '8px 0', borderColor: darkThemeColors.borderStrong }} /> : (
                  <button
                    key={item.label}
                    type="button"
                    style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '8px 16px', fontSize: '14px', color: darkThemeColors.textPrimary, cursor: 'pointer' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkThemeColors.backgroundTertiary}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    onClick={() => { item.action(); setActiveActionMenuRowId(null); }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )
      },
    },
  ], [activeActionMenuRowId]);


  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeActionMenuRowId && !event.target.closest(`#action-menu-button-${activeActionMenuRowId}`) && !event.target.closest(`#action-menu-content-${activeActionMenuRowId}`)) {
        setActiveActionMenuRowId(null);
      }
      if (isColumnToggleMenuVisible && !event.target.closest('#column-toggle-button') && !event.target.closest('#columns-visibility-dropdown')) {
        setIsColumnToggleMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeActionMenuRowId, isColumnToggleMenuVisible]);

  // Button Style
  const buttonStyle = {
    padding: '8px 14px',
    border: `1px solid ${darkThemeColors.borderDefault}`,
    borderRadius: '6px',
    backgroundColor: darkThemeColors.backgroundSecondary,
    color: darkThemeColors.textPrimary,
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  };
  const buttonHoverStyle = { backgroundColor: darkThemeColors.backgroundTertiary };
  const buttonDisabledStyle = { opacity: 0.5, cursor: 'not-allowed', backgroundColor: darkThemeColors.backgroundTertiary, color: darkThemeColors.textDisabled };


  return (
    <div style={{ width: "100%", fontFamily: 'Outfit, sans-serif', backgroundColor: darkThemeColors.backgroundBody, color: darkThemeColors.textPrimary, padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', gap: '12px' }}>
        <input
          type="text"
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          style={{
            flexGrow: 1, padding: '10px 14px', border: `1px solid ${darkThemeColors.borderStrong}`, borderRadius: '6px',
            fontSize: '14px', backgroundColor: darkThemeColors.backgroundSecondary, color: darkThemeColors.textPrimary,
            '::placeholder': { color: darkThemeColors.textTertiary } 
          }}
        />
        <div style={{ position: 'relative' }}>
          <button
            id="column-toggle-button"
            type="button"
            onClick={() => setIsColumnToggleMenuVisible(!isColumnToggleMenuVisible)}
            style={{...buttonStyle}}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
          >
            Columns <span style={{ marginLeft: '6px' }}>▼</span>
          </button>
          {isColumnToggleMenuVisible && (
            <div 
                id="columns-visibility-dropdown"
                style={{
                  position: 'absolute', right: 0, top: '100%', marginTop: '4px',
                  backgroundColor: darkThemeColors.backgroundSecondary,
                  border: `1px solid ${darkThemeColors.borderDefault}`,
                  borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  zIndex: 100, minWidth: '180px', padding: '8px 0'
                }}
            >
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <label key={column.id} style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', textTransform: 'capitalize', cursor: 'pointer', color: darkThemeColors.textPrimary }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkThemeColors.backgroundTertiary}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <input
                        type="checkbox"
                        style={{ marginRight: '10px', accentColor: darkThemeColors.brandPrimary, backgroundColor: darkThemeColors.backgroundSecondary, borderColor: darkThemeColors.borderStrong }}
                        checked={column.getIsVisible()}
                        onChange={(e) =>
                          column.toggleVisibility(!!e.target.checked)
                        }
                      />
                      {column.id}
                    </label>
                  )
                })}
            </div>
          )}
        </div>
      </div>
      <div style={{ overflowX: 'auto', border: `1px solid ${darkThemeColors.borderDefault}`, borderRadius: '8px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} >
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} style={{ padding: '12px 15px', borderBottom: `1px solid ${darkThemeColors.borderDefault}`, textAlign: 'left', backgroundColor: darkThemeColors.backgroundSecondary, color: darkThemeColors.textPrimary, fontWeight: '600', whiteSpace: 'nowrap' }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  style={{
                    backgroundColor: row.getIsSelected() ? darkThemeColors.rowSelectedBg : (rowIndex % 2 === 0 ? darkThemeColors.backgroundPrimary : darkThemeColors.backgroundSecondary), // Stripe, atau pilih satu warna
                    color: row.getIsSelected() ? darkThemeColors.rowSelectedText : darkThemeColors.textSecondary,
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => { if (!row.getIsSelected()) e.currentTarget.style.backgroundColor = darkThemeColors.backgroundTertiary; }}
                  onMouseLeave={(e) => { if (!row.getIsSelected()) e.currentTarget.style.backgroundColor = (rowIndex % 2 === 0 ? darkThemeColors.backgroundPrimary : darkThemeColors.backgroundSecondary); }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} style={{ padding: '12px 15px', borderBottom: `1px solid ${darkThemeColors.borderDefault}` }}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} style={{ padding: '40px 0', textAlign: 'center', color: darkThemeColors.textTertiary, fontStyle: 'italic' }}>
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', fontSize: '14px', color: darkThemeColors.textSecondary }}>
        <div>
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            style={!table.getCanPreviousPage() ? {...buttonStyle, ...buttonDisabledStyle} : {...buttonStyle}}
            onMouseEnter={(e) => { if(!table.getCanPreviousPage()) return; e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor; }}
            onMouseLeave={(e) => { if(!table.getCanPreviousPage()) return; e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor; }}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            style={!table.getCanNextPage() ? {...buttonStyle, ...buttonDisabledStyle} : {...buttonStyle}}
            onMouseEnter={(e) => { if(!table.getCanNextPage()) return; e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor; }}
            onMouseLeave={(e) => { if(!table.getCanNextPage()) return; e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor; }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
