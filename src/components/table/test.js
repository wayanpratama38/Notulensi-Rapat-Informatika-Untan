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

import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal"; // Pastikan path ini benar

// Data awal, kita akan pindahkan ini ke state
const initialData = [
  { id: "m1", namaRapat: "Rapat Anggaran Q1 2024", tanggalRapat: "2024-01-15", status: "Selesai" },
  { id: "m2", namaRapat: "Kick-off Proyek Phoenix", tanggalRapat: "2024-02-01", status: "Aktif" },
  { id: "m3", namaRapat: "Evaluasi Kinerja Bulanan", tanggalRapat: "2024-02-28", status: "Aktif" },
  { id: "m4", namaRapat: "Brainstorming Fitur Baru", tanggalRapat: "2024-03-05", status: "Arsip" }, // Sudah arsip
  { id: "m5", namaRapat: "Rapat Tim Teknis Mingguan", tanggalRapat: "2024-03-10", status: "Selesai" },
  { id: "m6", namaRapat: "Presentasi Klien Alpha", tanggalRapat: "2024-03-15", status: "Aktif" },
  { id: "m7", namaRapat: "Presentasi Keren", tanggalRapat: "2024-03-15", status: "Arsip" }, // Sudah arsip
  { id: "m8", namaRapat: "Presentasi a", tanggalRapat: "2024-03-15", status: "Arsip" }, // Sudah arsip
  { id: "m9", namaRapat: "Presentasi bn", tanggalRapat: "2024-03-15", status: "Arsip" }, // Sudah arsip
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

// --- STYLES DEFINITION ---
const inputBaseStyle = {
  padding: '8px 12px',
  backgroundColor: darkThemeColors.backgroundSecondary,
  color: darkThemeColors.textPrimary,
  borderWidth: '1px', // longhand
  borderStyle: 'solid', // longhand
  borderColor: darkThemeColors.borderDefault, // longhand
  borderRadius: '6px',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
};

const selectArrowSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='${encodeURIComponent(darkThemeColors.textSecondary)}'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E")`;

const selectStyle = {
  ...inputBaseStyle, // Inherits borderWidth, borderStyle, borderColor
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none',
  paddingRight: '36px',
  backgroundImage: selectArrowSvg,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: `right 10px center`,
  backgroundSize: '16px 16px',
  cursor: 'pointer',
};

const buttonBaseSharedStyle = { // Properti yang sama untuk semua state tombol
  padding: '8px 16px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'background-color 0.15s ease-in-out, border-color 0.15s ease-in-out',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  whiteSpace: 'nowrap',
  borderWidth: '1px', // longhand
  borderStyle: 'solid', // longhand
};

const buttonStyle = {
  ...buttonBaseSharedStyle,
  backgroundColor: darkThemeColors.backgroundSecondary,
  color: darkThemeColors.textPrimary,
  borderColor: darkThemeColors.borderDefault, // longhand
};

const buttonHoverStyle = { // Hanya properti yang berubah saat hover
  backgroundColor: darkThemeColors.backgroundTertiary,
  borderColor: darkThemeColors.borderFocus,
};

const buttonDisabledStyle = {
  ...buttonBaseSharedStyle,
  color: darkThemeColors.textDisabled,
  backgroundColor: darkThemeColors.backgroundTertiary,
  cursor: 'not-allowed',
  opacity: 0.7,
  borderColor: darkThemeColors.borderDefault, // Atau warna border disabled khusus
};
// --- END STYLES DEFINITION ---


const ActionCell = React.memo(({ row, activeActionMenuRowId, openActionMenu, closeActionMenu }) => {
    const isMenuOpen = activeActionMenuRowId === row.id;
    return (
      <div style={{ position: 'relative' }}>
        <button
          type="button"
          id={`action-menu-button-${row.id}`}
          aria-label="Open actions menu"
          style={{ background: 'none', border: '1px solid transparent', color: darkThemeColors.textSecondary, padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '18px', lineHeight: '1' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkThemeColors.backgroundTertiary}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          onClick={(e) => {
            if (isMenuOpen) {
              closeActionMenu();
            } else {
              openActionMenu(row, e.currentTarget);
            }
          }}
        >
          …
        </button>
      </div>
    );
});
ActionCell.displayName = 'ActionCell';


export function DataTableDemo() {
  const { isOpen, openModal, closeModal } = useModal();
  const [tableData, setTableData] = React.useState(initialData);
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const [activeActionMenuRowId, setActiveActionMenuRowId] = React.useState(null);
  const [isColumnToggleMenuVisible, setIsColumnToggleMenuVisible] = React.useState(false);
  const [menuPosition, setMenuPosition] = React.useState(null);
  const [activeRapatForMenu, setActiveRapatForMenu] = React.useState(null);
  const [rapatUntukModal, setRapatUntukModal] = React.useState(null);

  const [namaDokumen, setNamaDokumen] = React.useState("");
  const [fileDokumen, setFileDokumen] = React.useState(null);


  const closeActionMenu = React.useCallback(() => {
    setActiveActionMenuRowId(null);
    setMenuPosition(null);
  }, []);

  const openActionMenu = React.useCallback((row, targetElement) => {
    const rect = targetElement.getBoundingClientRect();
    setActiveActionMenuRowId(row.id);
    setActiveRapatForMenu(row.original);
    setMenuPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
    });
  }, []);


  const handleLengkapiDokumenClick = React.useCallback((rapatData) => {
    if (rapatData.status !== "Selesai") {
        alert("Dokumen hanya bisa dilengkapi untuk rapat dengan status 'Selesai'.");
        return;
    }
    console.log("Data untuk modal:", rapatData);
    setRapatUntukModal(rapatData);
    setNamaDokumen("");
    setFileDokumen(null);
    openModal();
  }, [openModal]);


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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}> Nama Rapat <span style={{ marginLeft: '6px' }}>{column.getIsSorted() ? (column.getIsSorted() === "asc" ? '🔼' : '🔽') : '↕️'}</span> </button>
      ),
      cell: ({ row }) => <div style={{ color: darkThemeColors.textSecondary }}>{row.getValue("namaRapat")}</div>,
    },
    {
      accessorKey: "tanggalRapat",
      header: ({ column }) => ( <button type="button" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontWeight: '600', color: darkThemeColors.textPrimary, display: 'inline-flex', alignItems: 'center' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}> Tanggal Rapat <span style={{ marginLeft: '6px' }}>{column.getIsSorted() ? (column.getIsSorted() === "asc" ? '🔼' : '🔽') : '↕️'}</span> </button>
      ),
      cell: ({ row }) => <div style={{ color: darkThemeColors.textSecondary }}>{row.getValue("tanggalRapat")}</div>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => ( <button type="button" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontWeight: '600', color: darkThemeColors.textPrimary, display: 'inline-flex', alignItems: 'center' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}> Status <span style={{ marginLeft: '6px' }}>{column.getIsSorted() ? (column.getIsSorted() === "asc" ? '🔼' : '🔽') : '↕️'}</span> </button>
      ),
      cell: ({ row }) => {
        const status = row.getValue("status");
        let statusColor = darkThemeColors.textSecondary;
        if (status === "Aktif") statusColor = darkThemeColors.brandPrimary;
        if (status === "Selesai") statusColor = '#3FB950';
        if (status === "Arsip") statusColor = darkThemeColors.textTertiary;

        return <div style={{ textTransform: 'capitalize', color: statusColor, fontWeight: status === "Aktif" || status === "Selesai" ? '500' : 'normal' }}>{status}</div>
      },
    },
    {
      id: "actions", enableHiding: false,
      cell: ({ row }) => (
        <ActionCell
            row={row}
            activeActionMenuRowId={activeActionMenuRowId}
            openActionMenu={openActionMenu}
            closeActionMenu={closeActionMenu}
        />
      ),
    },
  ], [activeActionMenuRowId, openActionMenu, closeActionMenu, handleLengkapiDokumenClick]);

  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection, },
    getRowId: row => row.id,
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
  }, [activeActionMenuRowId, isColumnToggleMenuVisible, closeActionMenu]);

  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSimpanDokumen = React.useCallback(() => {
    if (!rapatUntukModal) {
        alert("Tidak ada data rapat yang dipilih.");
        return;
    }
    if (!namaDokumen.trim()) {
        alert("Nama dokumen tidak boleh kosong.");
        return;
    }
    if (!fileDokumen) {
        alert("Silakan pilih file dokumen.");
        return;
    }

    console.log(`Menyimpan dokumen "${namaDokumen}" untuk rapat: ${rapatUntukModal.namaRapat}`);
    console.log("File:", fileDokumen.name);

    setTableData(prevData =>
        prevData.map(rapat =>
            rapat.id === rapatUntukModal.id
                ? { ...rapat, status: "Arsip" }
                : rapat
        )
    );

    alert(`Dokumen untuk rapat "${rapatUntukModal.namaRapat}" berhasil disimpan dan status diubah menjadi Arsip.`);

    closeModal();
    setRapatUntukModal(null);
    setNamaDokumen("");
    setFileDokumen(null);

  }, [closeModal, rapatUntukModal, namaDokumen, fileDokumen, setTableData]);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
        setFileDokumen(event.target.files[0]);
    } else {
        setFileDokumen(null);
    }
  };


  return (
    <div style={{ width: "100%", fontFamily: 'Outfit, sans-serif', backgroundColor: darkThemeColors.backgroundBody, padding: '20px', color: darkThemeColors.textPrimary }}>
       <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '12px' }}>
        <input type="text" placeholder="Filter nama rapat..." value={table.getColumn("namaRapat")?.getFilterValue() ?? ""}
          onChange={(event) => table.getColumn("namaRapat")?.setFilterValue(event.target.value)}
          style={{
            ...inputBaseStyle, // Menggunakan borderWidth, borderStyle, borderColor dari inputBaseStyle
            flexGrow: 1,
          }}
          onFocus={(e) => { e.target.style.borderColor = darkThemeColors.borderFocus; e.target.style.boxShadow = `0 0 0 2px ${darkThemeColors.brandPrimary}30`; }}
          onBlur={(e) => { e.target.style.borderColor = darkThemeColors.borderDefault; e.target.style.boxShadow = 'none'; }}
        />
        <select value={table.getColumn("status")?.getFilterValue() ?? ""}
          onChange={(event) => table.getColumn("status")?.setFilterValue(event.target.value || undefined)}
          style={{
            ...selectStyle, // Menggunakan borderWidth, borderStyle, borderColor dari selectStyle (yang diwarisi dari inputBaseStyle)
            flexBasis: '200px',
          }}
          onFocus={(e) => { e.target.style.borderColor = darkThemeColors.borderFocus; e.target.style.boxShadow = `0 0 0 2px ${darkThemeColors.brandPrimary}30`; }}
          onBlur={(e) => { e.target.style.borderColor = darkThemeColors.borderDefault; e.target.style.boxShadow = 'none'; }}
        >
          <option value="" style={{backgroundColor: darkThemeColors.backgroundSecondary, color: darkThemeColors.textPrimary}}>Semua Status</option>
          <option value="Aktif" style={{backgroundColor: darkThemeColors.backgroundSecondary, color: darkThemeColors.textPrimary}}>Aktif</option>
          <option value="Selesai" style={{backgroundColor: darkThemeColors.backgroundSecondary, color: darkThemeColors.textPrimary}}>Selesai</option>
          <option value="Arsip" style={{backgroundColor: darkThemeColors.backgroundSecondary, color: darkThemeColors.textPrimary}}>Arsip</option>
        </select>

        <div style={{ position: 'relative' }}>
          <button id="column-toggle-button" type="button" onClick={() => setIsColumnToggleMenuVisible(!isColumnToggleMenuVisible)}
            style={buttonStyle} // Style dasar
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor;
                e.currentTarget.style.borderColor = buttonHoverStyle.borderColor; // Hanya borderColor
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor;
                e.currentTarget.style.borderColor = buttonStyle.borderColor; // Hanya borderColor
            }}
          >
            Kolom <span style={{ marginLeft: '6px', transform: isColumnToggleMenuVisible ? 'rotate(180deg)' : 'rotate(0deg)', display: 'inline-block', transition: 'transform 0.2s' }}>▼</span>
          </button>
          {isColumnToggleMenuVisible && (
            <div id="columns-visibility-dropdown" style={{ position: 'absolute', right: 0, top: 'calc(100% + 4px)', backgroundColor: darkThemeColors.backgroundSecondary, border: `1px solid ${darkThemeColors.borderDefault}`, borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', zIndex: 1000, minWidth: '180px', padding: '8px 0' }}>
              {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => {
                  let columnLabel = column.id;
                  if (column.id === "namaRapat") columnLabel = "Nama Rapat";
                  if (column.id === "tanggalRapat") columnLabel = "Tanggal Rapat";
                  return ( <label key={column.id} style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', textTransform: 'capitalize', cursor: 'pointer', color: darkThemeColors.textPrimary, transition: 'background-color 0.15s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkThemeColors.backgroundTertiary}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <input type="checkbox" style={{ marginRight: '10px', accentColor: darkThemeColors.brandPrimary, backgroundColor: darkThemeColors.backgroundSecondary, borderColor: darkThemeColors.borderStrong, width: '14px', height: '14px' }}
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
                  <th key={header.id} style={{ padding: '12px 15px', borderBottom: `2px solid ${darkThemeColors.borderStrong}`, textAlign: 'left', backgroundColor: darkThemeColors.backgroundSecondary, color: darkThemeColors.textPrimary, fontWeight: '600', whiteSpace: 'nowrap' }}>
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
            ) : (
              <tr>
                <td colSpan={columns.length} style={{ padding: '40px 0', textAlign: 'center', color: darkThemeColors.textTertiary, fontStyle: 'italic' }}>
                  Tidak ada hasil.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '20px', fontSize: '14px', color: darkThemeColors.textSecondary }}>
        <div style={{ flexShrink: 0 }}> {table.getFilteredSelectedRowModel().rows.length} dari {table.getFilteredRowModel().rows.length} baris dipilih. </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span>
                Halaman{' '}
                <strong>
                    {table.getState().pagination.pageIndex + 1} dari {table.getPageCount()}
                </strong>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px'}}>
                | Ke halaman:
                <input
                    type="number"
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        table.setPageIndex(page)
                    }}
                    style={{ ...inputBaseStyle, width: '60px', padding: '6px 8px', textAlign: 'center' }}
                />
            </span>
            <select
                value={table.getState().pagination.pageSize}
                onChange={e => {
                    table.setPageSize(Number(e.target.value))
                }}
                style={{...selectStyle, paddingRight: '30px', paddingLeft: '8px', height: '36px'}}
            >
                {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize} style={{backgroundColor: darkThemeColors.backgroundSecondary, color: darkThemeColors.textPrimary}}>
                        Tampil {pageSize}
                    </option>
                ))}
            </select>
          <button type="button" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}
            style={!table.getCanPreviousPage() ? buttonDisabledStyle : buttonStyle}
            onMouseEnter={(e) => { if(table.getCanPreviousPage()) {
                e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor;
                e.currentTarget.style.borderColor = buttonHoverStyle.borderColor;
            }}}
            onMouseLeave={(e) => { if(table.getCanPreviousPage()) {
                e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor;
                e.currentTarget.style.borderColor = buttonStyle.borderColor;
            }}}> {'<<'} </button>
          <button type="button" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}
            style={!table.getCanPreviousPage() ? buttonDisabledStyle : buttonStyle}
            onMouseEnter={(e) => { if(table.getCanPreviousPage()) {
                e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor;
                e.currentTarget.style.borderColor = buttonHoverStyle.borderColor;
            }}}
            onMouseLeave={(e) => { if(table.getCanPreviousPage()) {
                e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor;
                e.currentTarget.style.borderColor = buttonStyle.borderColor;
            }}}> {'<'} </button>
          <button type="button" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}
            style={!table.getCanNextPage() ? buttonDisabledStyle : buttonStyle}
            onMouseEnter={(e) => { if(table.getCanNextPage()) {
                e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor;
                e.currentTarget.style.borderColor = buttonHoverStyle.borderColor;
            }}}
            onMouseLeave={(e) => { if(table.getCanNextPage()) {
                e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor;
                e.currentTarget.style.borderColor = buttonStyle.borderColor;
            }}}> {'>'} </button>
            <button type="button" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}
            style={!table.getCanNextPage() ? buttonDisabledStyle : buttonStyle}
            onMouseEnter={(e) => { if(table.getCanNextPage()) {
                e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor;
                e.currentTarget.style.borderColor = buttonHoverStyle.borderColor;
            }}}
            onMouseLeave={(e) => { if(table.getCanNextPage()) {
                e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor;
                e.currentTarget.style.borderColor = buttonStyle.borderColor;
            }}}> {'>>'} </button>
        </div>
      </div>

      {rapatUntukModal && (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                closeModal();
                setRapatUntukModal(null);
                setNamaDokumen("");
                setFileDokumen(null);
            }}
            className="max-w-[700px] p-6 lg:p-10"
        >
            <div className="flex flex-col px-2 overflow-y-auto custom-scroll">
                <div>
                    <h5 className="mb-2 text-white text-lg modal-title">
                        Lengkapi Dokumen Rapat
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Silahkan masukkan informasi dokumen untuk: <strong style={{color: darkThemeColors.brandPrimary}}>{rapatUntukModal.namaRapat}</strong>
                    </p>
                </div>
                <div className="mt-8">
                    <div className="mb-6">
                        <label htmlFor="doc-name" className="modal-label mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Nama Dokumen <span style={{color: 'red'}}>*</span>
                        </label>
                        <input
                            id="doc-name"
                            type="text"
                            value={namaDokumen}
                            onChange={(e) => setNamaDokumen(e.target.value)}
                            placeholder="Contoh: Notulensi Rapat Anggaran Q1"
                            className="modal-input dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="doc-file" className="modal-label mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Upload File Dokumen <span style={{color: 'red'}}>*</span>
                        </label>
                        <input
                            id="doc-file"
                            type="file"
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                            className="modal-input dark:bg-dark-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 block w-full text-sm text-gray-500 dark:text-gray-400"
                        />
                         <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">PDF, DOC, DOCX, PNG, JPG (MAX. 5MB)</p>
                         {fileDokumen && <p className="mt-1 text-xs text-green-500">File dipilih: {fileDokumen.name}</p>}
                    </div>
                </div>
                <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 modal-footer sm:justify-end">
                    <button
                        onClick={() => {
                            closeModal();
                            setRapatUntukModal(null);
                            setNamaDokumen("");
                            setFileDokumen(null);
                        }}
                        type="button"
                        className="modal-footer-button modal-footer-close flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50  dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSimpanDokumen}
                        type="button"
                        className="modal-footer-button modal-footer-action btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                    >
                        Simpan Dokumen
                    </button>
                </div>
            </div>
        </Modal>
      )}

      {isClient && activeActionMenuRowId && menuPosition && activeRapatForMenu && ReactDOM.createPortal(
        <div
          id="action-menu-content-portaled"
          style={{
            position: 'absolute',
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
            backgroundColor: darkThemeColors.backgroundSecondary,
            border: `1px solid ${darkThemeColors.borderDefault}`, // Shorthand OK di sini karena tidak dimodifikasi sebagian
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            zIndex: 2000,
            minWidth: '180px',
            padding: '8px 0',
          }}
        >
          <div style={{ padding: '8px 16px', fontSize: '12px', fontWeight: '600', color: darkThemeColors.textTertiary, borderBottom: `1px solid ${darkThemeColors.borderDefault}`, marginBottom: '4px' }}>
            Aksi untuk: <br/> <strong style={{color: darkThemeColors.brandPrimary, fontSize: '13px'}}>{activeRapatForMenu.namaRapat.substring(0,25)}{activeRapatForMenu.namaRapat.length > 25 ? "..." : ""}</strong>
          </div>
          {
            (() => {
              const menuItems = [];
              const currentStatus = activeRapatForMenu.status;

              const hapusRapatAction = {
                label: "Hapus Rapat",
                action: () => {
                  if(window.confirm(`Apakah Anda yakin ingin menghapus rapat "${activeRapatForMenu.namaRapat}"?`)){
                    setTableData(prevData => prevData.filter(rapat => rapat.id !== activeRapatForMenu.id));
                    alert(`Rapat "${activeRapatForMenu.namaRapat}" telah dihapus.`);
                  }
                },
                style: { color: '#F87171' }
              };

              if (currentStatus === "Aktif") {
                menuItems.push(hapusRapatAction);
              } else if (currentStatus === "Selesai") {
                menuItems.push({
                    label: "Lengkapi Dokumen",
                    action: () => handleLengkapiDokumenClick(activeRapatForMenu)
                });
                menuItems.push(hapusRapatAction);
              } else if (currentStatus === "Arsip") {
                menuItems.push({
                    label: "Download (Arsip)",
                    action: () => { alert(`Download arsip data rapat: ${activeRapatForMenu.namaRapat}`); }
                });
                menuItems.push(hapusRapatAction);
              }

              return menuItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '8px 16px', fontSize: '14px', color: item.style?.color || darkThemeColors.textPrimary, cursor: 'pointer', transition: 'background-color 0.15s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkThemeColors.backgroundTertiary}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  onClick={() => { item.action(); closeActionMenu(); }}
                >
                  {item.label}
                </button>
              ));
            })()
          }
        </div>,
        document.body
      )}
    </div>
  )
}