
"use client"

import * as React from "react"
import ReactDOM from "react-dom" 
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

const data = [
  { id: "m1", namaRapat: "Rapat Anggaran Q1 2024", tanggalRapat: "2024-01-15", status: "Selesai" },
  { id: "m2", namaRapat: "Kick-off Proyek Phoenix", tanggalRapat: "2024-02-01", status: "Aktif" },
  { id: "m3", namaRapat: "Evaluasi Kinerja Bulanan", tanggalRapat: "2024-02-28", status: "Aktif" },
  { id: "m4", namaRapat: "Brainstorming Fitur Baru", tanggalRapat: "2024-03-05", status: "Arsip" },
  { id: "m5", namaRapat: "Rapat Tim Teknis Mingguan", tanggalRapat: "2024-03-10", status: "Selesai" },
  { id: "m6", namaRapat: "Presentasi Klien Alpha", tanggalRapat: "2024-03-15", status: "Aktif" },
];

const darkThemeColors = {
  backgroundBody: '#171f2f', 
  backgroundPrimary: '#161B22', 
  backgroundSecondary: '#21262D', 
  backgroundTertiary: '#30363D', 
  textPrimary: '#C9D1D9', 
  textSecondary: '#8B949E', 
  textTertiary: '#586069', 
  textDisabled: '#484F58',
  borderDefault: '#30363D', 
  borderStrong: '#21262D', 
  borderFocus: '#58A6FF', 
  brandPrimary: '#58A6FF', 
  brandPrimaryHover: '#79C0FF',
  textOnBrand: '#0D1117', 
  rowSelectedBg: '#2D4F7C', 
  rowSelectedText: '#C9D1D9',
};

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  
  const [activeActionMenuRowId, setActiveActionMenuRowId] = React.useState(null);
  const [isColumnToggleMenuVisible, setIsColumnToggleMenuVisible] = React.useState(false);

 
  const [menuPosition, setMenuPosition] = React.useState(null); 
  const [activeRapatForMenu, setActiveRapatForMenu] = React.useState(null);

  const closeActionMenu = () => {
    setActiveActionMenuRowId(null);
    setMenuPosition(null);
    setActiveRapatForMenu(null);
  };

  const columns = React.useMemo(() => [
    {
      id: "select",
      header: ({ table }) => ( <input type="checkbox" style={{ accentColor: darkThemeColors.brandPrimary, backgroundColor: darkThemeColors.backgroundSecondary, borderColor: darkThemeColors.borderStrong, borderRadius: '3px', width: '16px', height: '16px' }}
          ref={el => { if (el) { el.indeterminate = table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(); } }}
          checked={table.getIsAllPageRowsSelected()} onChange={e => table.toggleAllPageRowsSelected(!!e.target.checked)} aria-label="Select all" />
      ),
      cell: ({ row }) => ( <input type="checkbox" style={{ accentColor: darkThemeColors.brandPrimary, backgroundColor: darkThemeColors.backgroundSecondary, borderColor: darkThemeColors.borderStrong, borderRadius: '3px', width: '16px', height: '16px' }}
          checked={row.getIsSelected()} onChange={e => row.toggleSelected(!!e.target.checked)} aria-label="Select row" />
      ),
      enableSorting: false, enableHiding: false,
    },
    {
      accessorKey: "namaRapat",
      header: ({ column }) => ( <button type="button" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontWeight: '600', color: darkThemeColors.textPrimary, display: 'inline-flex', alignItems: 'center' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}> Nama Rapat <span style={{ marginLeft: '6px' }}>↕</span> </button>
      ),
      cell: ({ row }) => <div style={{ color: darkThemeColors.textSecondary }}>{row.getValue("namaRapat")}</div>,
    },
    {
      accessorKey: "tanggalRapat",
      header: ({ column }) => ( <button type="button" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontWeight: '600', color: darkThemeColors.textPrimary, display: 'inline-flex', alignItems: 'center' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}> Tanggal Rapat <span style={{ marginLeft: '6px' }}>↕</span> </button>
      ),
      cell: ({ row }) => <div style={{ color: darkThemeColors.textSecondary }}>{row.getValue("tanggalRapat")}</div>,
    },
    {
      accessorKey: "status", header: "Status",
      cell: ({ row }) => <div style={{ textTransform: 'capitalize', color: darkThemeColors.textSecondary }}>{row.getValue("status")}</div>,
    },
    {
      id: "actions", enableHiding: false,
      cell: ({ row }) => {
        const isMenuOpen = activeActionMenuRowId === row.id;
        return (
          <div style={{ position: 'relative' }}>
            <button type="button" id={`action-menu-button-${row.id}`} aria-label="Open actions menu"
              style={{ background: 'none', border: '1px solid transparent', color: darkThemeColors.textSecondary, padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkThemeColors.backgroundTertiary}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              onClick={(e) => {
                if (isMenuOpen) {
                  closeActionMenu();
                } else {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setActiveActionMenuRowId(row.id);
                  setActiveRapatForMenu(row.original);
                  setMenuPosition({
                    top: rect.bottom + window.scrollY + 4, 
                    left: rect.left + window.scrollX,
                  });
                }
              }}> ... </button>
           
          </div>
        )
      },
    },
  ], [activeActionMenuRowId, activeRapatForMenu, menuPosition]); 

  const table = useReactTable({
    data, columns, onSortingChange: setSorting, onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(), getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility, onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection, },
  });

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      const actionMenuPortaled = document.getElementById('action-menu-content-portaled');
      const actionButton = activeActionMenuRowId ? document.getElementById(`action-menu-button-${activeActionMenuRowId}`) : null;

      if (activeActionMenuRowId && 
          (!actionButton || !actionButton.contains(event.target)) && 
          (!actionMenuPortaled || !actionMenuPortaled.contains(event.target))) {
        closeActionMenu();
      }

      if (isColumnToggleMenuVisible && !event.target.closest('#column-toggle-button') && !event.target.closest('#columns-visibility-dropdown')) {
        setIsColumnToggleMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeActionMenuRowId, isColumnToggleMenuVisible]); 

  const inputStyle = { padding: '10px 14px', border: `1px solid ${darkThemeColors.borderStrong}`, borderRadius: '6px', fontSize: '14px', backgroundColor: darkThemeColors.backgroundSecondary, color: darkThemeColors.textPrimary, '::placeholder': { color: darkThemeColors.textTertiary } };
  const buttonStyle = { padding: '8px 14px', border: `1px solid ${darkThemeColors.borderDefault}`, borderRadius: '6px', backgroundColor: darkThemeColors.backgroundSecondary, color: darkThemeColors.textPrimary, cursor: 'pointer', fontSize: '14px', fontWeight: '500', };
  const buttonHoverStyle = { backgroundColor: darkThemeColors.backgroundTertiary };
  const buttonDisabledStyle = { opacity: 0.5, cursor: 'not-allowed', backgroundColor: darkThemeColors.backgroundTertiary, color: darkThemeColors.textDisabled };

  
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div style={{ width: "100%", fontFamily: 'Outfit, sans-serif', backgroundColor: darkThemeColors.backgroundBody, color: darkThemeColors.textPrimary, padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', gap: '12px' }}>
        <input type="text" placeholder="Filter nama rapat..." value={table.getColumn("namaRapat")?.getFilterValue() ?? ""} 
          onChange={(event) => table.getColumn("namaRapat")?.setFilterValue(event.target.value)}
          style={{ ...inputStyle, flexGrow: 1, }} />
        <select value={table.getColumn("status")?.getFilterValue() ?? ""}
          onChange={(event) => table.getColumn("status")?.setFilterValue(event.target.value || undefined)}
          style={{ ...inputStyle, flexBasis: '200px', WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none', paddingRight: '30px', }}>
          <option value="">Semua Status</option> <option value="Aktif">Aktif</option> <option value="Selesai">Selesai</option> <option value="Arsip">Arsip</option>
        </select>
        <div style={{ position: 'relative' }}>
          <button id="column-toggle-button" type="button" onClick={() => setIsColumnToggleMenuVisible(!isColumnToggleMenuVisible)}
            style={{...buttonStyle}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}>
            Kolom <span style={{ marginLeft: '6px' }}>▼</span>
          </button>
          {isColumnToggleMenuVisible && (
            <div id="columns-visibility-dropdown" style={{ position: 'absolute', right: 0, top: '100%', marginTop: '4px', backgroundColor: darkThemeColors.backgroundSecondary, border: `1px solid ${darkThemeColors.borderDefault}`, borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', zIndex: 1000, minWidth: '180px', padding: '8px 0' }}>
              {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => {
                  let columnLabel = column.id; if (column.id === "namaRapat") columnLabel = "Nama Rapat"; if (column.id === "tanggalRapat") columnLabel = "Tanggal Rapat";
                  return ( <label key={column.id} style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', textTransform: 'capitalize', cursor: 'pointer', color: darkThemeColors.textPrimary }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkThemeColors.backgroundTertiary} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <input type="checkbox" style={{ marginRight: '10px', accentColor: darkThemeColors.brandPrimary, backgroundColor: darkThemeColors.backgroundSecondary, borderColor: darkThemeColors.borderStrong }}
                        checked={column.getIsVisible()} onChange={(e) => column.toggleVisibility(!!e.target.checked)} /> {columnLabel} </label> )
                })}
            </div>
          )}
        </div>
      </div>
      <div style={{ overflowX: 'auto', border: `1px solid ${darkThemeColors.borderDefault}`, borderRadius: '8px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          
           <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} style={{ padding: '12px 15px', borderBottom: `1px solid ${darkThemeColors.borderDefault}`, textAlign: 'left', backgroundColor: darkThemeColors.backgroundSecondary, color: darkThemeColors.textPrimary, fontWeight: '600', whiteSpace: 'nowrap' }}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, rowIndex) => (
                <tr key={row.id} style={{ backgroundColor: row.getIsSelected() ? darkThemeColors.rowSelectedBg : (rowIndex % 2 === 0 ? darkThemeColors.backgroundPrimary : darkThemeColors.backgroundSecondary), color: row.getIsSelected() ? darkThemeColors.rowSelectedText : darkThemeColors.textSecondary, transition: 'background-color 0.15s ease' }}
                  onMouseEnter={(e) => { if (!row.getIsSelected()) e.currentTarget.style.backgroundColor = darkThemeColors.backgroundTertiary; }}
                  onMouseLeave={(e) => { if (!row.getIsSelected()) e.currentTarget.style.backgroundColor = (rowIndex % 2 === 0 ? darkThemeColors.backgroundPrimary : darkThemeColors.backgroundSecondary); }}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} style={{ padding: '12px 15px', borderBottom: `1px solid ${darkThemeColors.borderDefault}` }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : ( <tr> <td colSpan={columns.length} style={{ padding: '40px 0', textAlign: 'center', color: darkThemeColors.textTertiary, fontStyle: 'italic' }}> Tidak ada hasil. </td> </tr> )}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', fontSize: '14px', color: darkThemeColors.textSecondary }}>
        <div> {table.getFilteredSelectedRowModel().rows.length} dari {table.getFilteredRowModel().rows.length} baris dipilih. </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button type="button" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}
            style={!table.getCanPreviousPage() ? {...buttonStyle, ...buttonDisabledStyle} : {...buttonStyle}}
            onMouseEnter={(e) => { if(!table.getCanPreviousPage()) return; e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor; }}
            onMouseLeave={(e) => { if(!table.getCanPreviousPage()) return; e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor; }}> Sebelumnya </button>
          <button type="button" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}
            style={!table.getCanNextPage() ? {...buttonStyle, ...buttonDisabledStyle} : {...buttonStyle}}
            onMouseEnter={(e) => { if(!table.getCanNextPage()) return; e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor; }}
            onMouseLeave={(e) => { if(!table.getCanNextPage()) return; e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor; }}> Berikutnya </button>
        </div>
      </div>

      
      {isClient && activeActionMenuRowId && menuPosition && activeRapatForMenu && ReactDOM.createPortal(
        <div
          id="action-menu-content-portaled"
          style={{
            position: 'absolute',
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
            
            backgroundColor: darkThemeColors.backgroundSecondary,
            border: `1px solid ${darkThemeColors.borderDefault}`,
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            zIndex: 2000,
            minWidth: '180px',
            padding: '8px 0',
          }}
        >
          <div style={{ padding: '8px 16px', fontSize: '12px', fontWeight: '600', color: darkThemeColors.textTertiary }}>Aksi</div>
          {[
            { label: "Hapus", action: () => alert(`Hapus rapat: ${activeRapatForMenu.namaRapat} (ID: ${activeRapatForMenu.id})`) },
            { label: "Lengkapi Dokumen", action: () => alert(`Lengkapi dokumen untuk: ${activeRapatForMenu.namaRapat}`) },
            { label: "Download", action: () => alert(`Download data rapat: ${activeRapatForMenu.namaRapat}`) },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '8px 16px', fontSize: '14px', color: darkThemeColors.textPrimary, cursor: 'pointer' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkThemeColors.backgroundTertiary}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              onClick={() => { item.action(); closeActionMenu(); }}
            >
              {item.label}
            </button>
          ))}
        </div>,
        document.body 
      )}
    </div>
  )
}