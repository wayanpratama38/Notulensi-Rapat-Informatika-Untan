"use client"; 

import React, { useState, useEffect, useCallback, useMemo } from "react"; 
import ReactDOM from "react-dom";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel, 
  getPaginationRowModel,
  getSortedRowModel, 
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from 'next/navigation'; 

import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";

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

const inputBaseStyle = {
  padding: '8px 12px',
  backgroundColor: darkThemeColors.backgroundSecondary,
  color: darkThemeColors.textPrimary,
  borderWidth: '1px', 
  borderStyle: 'solid', 
  borderColor: darkThemeColors.borderDefault, 
  borderRadius: '6px',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
};

const selectArrowSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='${encodeURIComponent(darkThemeColors.textSecondary)}'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E")`;

const selectStyle = {
  ...inputBaseStyle, 
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

const buttonBaseSharedStyle = { 
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
  borderWidth: '1px',
  borderStyle: 'solid',
};

const buttonStyle = {
  ...buttonBaseSharedStyle,
  backgroundColor: darkThemeColors.backgroundSecondary,
  color: darkThemeColors.textPrimary,
  borderColor: darkThemeColors.borderDefault,
};

const buttonHoverStyle = { 
  backgroundColor: darkThemeColors.backgroundTertiary,
  borderColor: darkThemeColors.borderFocus,
};

const buttonDisabledStyle = {
  ...buttonBaseSharedStyle,
  color: darkThemeColors.textDisabled,
  backgroundColor: darkThemeColors.backgroundTertiary,
  cursor: 'not-allowed',
  opacity: 0.7,
  borderColor: darkThemeColors.borderDefault,
};



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
            console.log(`Action button clicked. Data being sent:`, row.original);
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


export function DataTableRapat() { 
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();


  const [tableData, setTableData] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const [sorting, setSorting] = useState([]); 
  const [columnFilters, setColumnFilters] = useState([]); 
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0, 
    pageSize: 10, 
  });
  const [pageCount, setPageCount] = useState(0);

  
  const [activeActionMenuId, setActiveActionMenuId] = useState(null); 
  const [isColumnToggleMenuVisible, setIsColumnToggleMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState(null);
  const [activeRapatForMenu, setActiveRapatForMenu] = useState(null); 
  const [rapatUntukModal, setRapatUntukModal] = useState(null); 

  
  const [notulensiInput, setNotulensiInput] = useState(""); 
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); 


  
  const fetchDataRapat = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    
    const params = new URLSearchParams({
      page: (pagination.pageIndex + 1).toString(), 
      limit: pagination.pageSize.toString(),
    });

    
    columnFilters.forEach(filter => {
      if (filter.value) {
         if (filter.id === 'namaRapat') {
            params.append('searchNamaRapat', filter.value);
         } else {
             params.append(filter.id, filter.value); 
         }
      }
    });

    
    if (sorting.length > 0) {
      params.append('sortBy', sorting[0].id);
      params.append('order', sorting[0].desc ? 'desc' : 'asc');
    }

    try {
      const response = await fetch(`/api/meetings?${params.toString()}`);

      if (response.status === 401) {
        setError("Sesi tidak valid. Silakan login kembali.");
        router.push('/sign-in'); 
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Gagal mengambil data: ${response.status}`);
      }

      const result = await response.json();
      setTableData(result.data || []);
      setPageCount(result.totalPages || 0); 

    } catch (err) {
      console.error("Fetch data error:", err);
      setError(err.message);
      setTableData([]);
      setPageCount(0);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize, columnFilters, sorting, router]); 

  
  useEffect(() => {
    fetchDataRapat();
  }, [fetchDataRapat]); 


  

  const closeActionMenu = useCallback(() => {
    setActiveActionMenuId(null);
    setActiveRapatForMenu(null);
    setMenuPosition(null);
  }, []);

  
  const openActionMenu = useCallback((rapatData, targetElement) => {
    

  

    const actualRapatData = rapatData.original;
  
    console.log("openActionMenu called with actual data:", actualRapatData);
    if (!actualRapatData || !targetElement) {
        console.error("Missing actualRapatData or targetElement in openActionMenu");
        return;
    }

    const rect = targetElement.getBoundingClientRect();
    const topPos = rect.bottom + window.scrollY + 4;
    const leftPos = rect.left + window.scrollX;

    console.log("Calculating position:", {  });

    
    setActiveActionMenuId(actualRapatData?.id || null);
    setActiveRapatForMenu(actualRapatData); 
    setMenuPosition({ top: topPos, left: leftPos });

    console.log("Menu state updated:", { id: actualRapatData?.id, pos: { top: topPos, left: leftPos } });
  }, []);

  const handleLengkapiDokumenClick = useCallback((rapatData) => {
    
    console.log("Data untuk modal Lengkapi Dokumen:", rapatData);
    setRapatUntukModal(rapatData);
    setNotulensiInput(""); 
    setFilesToUpload([]); 
    setIsSubmitting(false); 
    openModal(); 
  }, [openModal]);

  
  const handleFileChange = (event) => {
    if (event.target.files) {
      
      const selectedFiles = Array.from(event.target.files).slice(0, 5);
      setFilesToUpload(selectedFiles);
    }
  };

  
  const handleSimpanDokumen = useCallback(async () => {
    if (!rapatUntukModal) {
        alert("Tidak ada data rapat yang dipilih.");
        return;
    }
    
    if (!notulensiInput.trim() && filesToUpload.length === 0) {
        alert("Harap isi notulensi atau unggah setidaknya satu file dokumen.");
        return;
    }

    setIsSubmitting(true); 
    setError(null); 

    const formData = new FormData();
    formData.append('notulensiRapat', notulensiInput);
    filesToUpload.forEach(file => {
      
      formData.append('dokumenRapat', file);
    });

    try {
      const response = await fetch(`/api/meetings/${rapatUntukModal.id}/complete`, {
        method: 'POST',
        body: formData, 
      });

      if(response.status === 401) {
         setError("Sesi tidak valid. Silakan login kembali.");
         router.push('/sign-in');
         closeModal();
         setIsSubmitting(false);
         return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menyimpan dokumen');
      }

      
      alert(`Dokumen untuk rapat "${rapatUntukModal.namaRapat}" berhasil disimpan dan status diubah menjadi Arsip.`);
      closeModal();
      setRapatUntukModal(null);
      setNotulensiInput("");
      setFilesToUpload([]);
      fetchDataRapat(); 

    } catch (err) {
      console.error("Simpan dokumen error:", err);
      setError(`Gagal menyimpan: ${err.message}`); 
      
    } finally {
      setIsSubmitting(false); 
    }
  }, [closeModal, rapatUntukModal, notulensiInput, filesToUpload, fetchDataRapat, router]); 

  
  const handleDeleteRapat = useCallback(async (meetingId, namaRapat) => {
      if (!meetingId) return;
      if (window.confirm(`Apakah Anda yakin ingin menghapus rapat "${namaRapat}"?`)) {
          setIsLoading(true); 
          setError(null);
          try {
              const response = await fetch(`/api/meetings/${meetingId}`, { method: 'DELETE' });
              if(response.status === 401) {
                  setError("Sesi tidak valid. Silakan login kembali.");
                  router.push('/sign-in');
                  setIsLoading(false);
                  return;
              }
              if (!response.ok) {
                  const errorData = await response.json();
                  throw new Error(errorData.message || 'Gagal menghapus rapat');
              }
              alert(`Rapat "${namaRapat}" berhasil dihapus.`);
              fetchDataRapat(); 
          } catch (err) {
              console.error("Delete rapat error:", err);
              setError(`Gagal menghapus: ${err.message}`);
              setIsLoading(false);
          }
      }
  }, [fetchDataRapat, router]); 

  
  const handleDownloadLaporan = useCallback(async (meetingId, namaRapat) => {
     if (!meetingId) return;
     
     setError(null);
      try {
          const response = await fetch(`/api/meetings/${meetingId}/download-report`);
          if (response.status === 401) {
              setError("Sesi tidak valid. Silakan login kembali.");
              router.push('/sign-in');
              return;
          }
          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Gagal mengunduh laporan');
          }
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          
          const safeName = namaRapat.replace(/[^a-zA-Z0-9]/g, '_');
          a.download = `Laporan_Rapat_${safeName}.pdf`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
      } catch (err) {
          console.error("Download laporan error:", err);
          setError(`Gagal mengunduh: ${err.message}`);
          alert(`Gagal mengunduh laporan: ${err.message}`);
      }
  }, [router]); 


  
  const columns = useMemo(() => [
     {
      id: "select",
      header: ({ table }) => ( <input type="checkbox" style={{ accentColor: darkThemeColors.brandPrimary, backgroundColor: darkThemeColors.backgroundSecondary, borderColor: darkThemeColors.borderStrong, borderRadius: '3px', width: '16px', height: '16px' }}
          ref={el => { if (el) { el.indeterminate = table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(); } }}
          checked={table.getIsAllPageRowsSelected()} onChange={table.getToggleAllPageRowsSelectedHandler()} aria-label="Select all" />
      ),
      cell: ({ row }) => ( <input type="checkbox" style={{ accentColor: darkThemeColors.brandPrimary, backgroundColor: darkThemeColors.backgroundSecondary, borderColor: darkThemeColors.borderStrong, borderRadius: '3px', width: '16px', height: '16px' }}
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
          aria-label="Select row" />
      ),
      enableSorting: false, enableHiding: false,
    },
    {
      accessorKey: "namaRapat",
      header: ({ column }) => ( <button type="button" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontWeight: '600', color: darkThemeColors.textPrimary, display: 'inline-flex', alignItems: 'center' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}> Nama Rapat <span style={{ marginLeft: '6px' }}>{column.getIsSorted() ? (column.getIsSorted() === "asc" ? '🔼' : '🔽') : '↕️'}</span> </button>
      ),
      cell: ({ row }) => <div style={{ color: darkThemeColors.textSecondary }}>{row.getValue("namaRapat")}</div>,
      enableColumnFilter: true, 
    },
    {
      
      accessorKey: "startDateTime",
      header: ({ column }) => ( <button type="button" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontWeight: '600', color: darkThemeColors.textPrimary, display: 'inline-flex', alignItems: 'center' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}> Tanggal Rapat <span style={{ marginLeft: '6px' }}>{column.getIsSorted() ? (column.getIsSorted() === "asc" ? '🔼' : '🔽') : '↕️'}</span> </button>
      ),
      
      cell: ({ row }) => {
          const isoDate = row.getValue("startDateTime");
          try {
              
              return <div style={{ color: darkThemeColors.textSecondary }}>{new Date(isoDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</div>;
          } catch (e) {
              return <div style={{ color: darkThemeColors.textSecondary }}>Invalid Date</div>;
          }
      },
       enableSorting: true, 
    },
    {
      accessorKey: "status",
      header: ({ column }) => ( <button type="button" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontWeight: '600', color: darkThemeColors.textPrimary, display: 'inline-flex', alignItems: 'center' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}> Status <span style={{ marginLeft: '6px' }}>{column.getIsSorted() ? (column.getIsSorted() === "asc" ? '🔼' : '🔽') : '↕️'}</span> </button>
      ),
      cell: ({ row }) => {
        const status = row.getValue("status"); 
        let statusColor = darkThemeColors.textSecondary;
        let displayStatus = status; 

        if (status === "AKTIF") statusColor = darkThemeColors.brandPrimary;
        if (status === "SELESAI") statusColor = '#3FB950';
        if (status === "ARSIP") statusColor = darkThemeColors.textTertiary;

        return <div style={{ textTransform: 'capitalize', color: statusColor, fontWeight: status === "AKTIF" || status === "SELESAI" ? '500' : 'normal' }}>{displayStatus}</div>
      },
       enableSorting: true, 
       enableColumnFilter: true, 
    },
    {
      id: "actions", enableHiding: false,
      cell: ({ row }) => ( 
        <ActionCell
            row={row} 
            activeActionMenuRowId={activeActionMenuId} 
            openActionMenu={openActionMenu} 
            closeActionMenu={closeActionMenu} 
        />
      ),
    },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [activeActionMenuId, openActionMenu, closeActionMenu, handleLengkapiDokumenClick, handleDeleteRapat, handleDownloadLaporan]); 


  
  const table = useReactTable({
    data: tableData, 
    columns,
    pageCount: pageCount, 
    state: { 
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    
    manualPagination: true,
    manualSorting: true, 
    manualFiltering: true, 
    
    onPaginationChange: setPagination, 
    onSortingChange: setSorting,       
    onColumnFiltersChange: setColumnFilters, 
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), 
    getSortedRowModel: getSortedRowModel(), 
    getFilteredRowModel: getFilteredRowModel(), 
    getRowId: row => row.id, 
    debugTable: process.env.NODE_ENV === 'development', 
  });

  
  useEffect(() => {
    const handleClickOutside = (event) => {
       const actionMenuPortaled = document.getElementById('action-menu-content-portaled');
       const actionButton = activeActionMenuId ? document.getElementById(`action-menu-button-${activeActionMenuId}`) : null;

       if (activeActionMenuId &&
           (!actionButton || !actionButton.contains(event.target)) &&
           (!actionMenuPortaled || !actionMenuPortaled.contains(event.target))) {
         closeActionMenu();
       }
       
       const columnToggleButton = document.getElementById('column-toggle-button');
       const columnDropdown = document.getElementById('columns-visibility-dropdown');
       if (isColumnToggleMenuVisible &&
           (!columnToggleButton || !columnToggleButton.contains(event.target)) &&
           (!columnDropdown || !columnDropdown.contains(event.target))) {
         setIsColumnToggleMenuVisible(false);
       }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeActionMenuId, isColumnToggleMenuVisible, closeActionMenu]); 

  
  const [isClient, setIsClient] = React.useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  console.log('RENDERING PORTAL CHECK - activeRapatForMenu:', activeRapatForMenu);
  console.log('RENDERING PORTAL CHECK - Nama Rapat specific:', activeRapatForMenu?.namaRapat);
  
  return (
    <div style={{ width: "100%", fontFamily: 'Outfit, sans-serif', backgroundColor: darkThemeColors.backgroundBody, padding: '20px', color: darkThemeColors.textPrimary }}>
      {}
      {error && <div style={{ color: 'red', marginBottom: '15px', border: '1px solid red', padding: '10px', borderRadius: '5px' }}>Error: {error}</div>}

       {}
       <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '12px' }}>
        {}
        <input type="text" placeholder="Filter nama rapat..."
          
          value={table.getColumn('namaRapat')?.getFilterValue() ?? ''}
          
          onChange={(e) => table.getColumn('namaRapat')?.setFilterValue(e.target.value)}
          style={{...inputBaseStyle, flexGrow: 1 }}
          onFocus={(e) => {  }}
          onBlur={(e) => {  }}
        />
        {}
        <select
          value={table.getColumn('status')?.getFilterValue() ?? ''}
          onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value || undefined)}
          style={{...selectStyle, flexBasis: '200px' }}
           onFocus={(e) => {  }}
           onBlur={(e) => {  }}
        >
          <option value="" style={{backgroundColor: darkThemeColors.backgroundSecondary, color: darkThemeColors.textPrimary}}>Semua Status</option>
          {}
          <option value="AKTIF" style={{backgroundColor: darkThemeColors.backgroundSecondary, color: darkThemeColors.textPrimary}}>Aktif</option>
          <option value="SELESAI" style={{backgroundColor: darkThemeColors.backgroundSecondary, color: darkThemeColors.textPrimary}}>Selesai</option>
          <option value="ARSIP" style={{backgroundColor: darkThemeColors.backgroundSecondary, color: darkThemeColors.textPrimary}}>Arsip</option>
        </select>

        {}
        <div style={{ position: 'relative' }}>
          <button id="column-toggle-button" type="button" onClick={() => setIsColumnToggleMenuVisible(!isColumnToggleMenuVisible)}
            style={buttonStyle}
             onMouseEnter={(e) => { }}
             onMouseLeave={(e) => {  }}
          >
            Kolom <span style={{ }}>▼</span>
          </button>
          {isColumnToggleMenuVisible && (
             <div id="columns-visibility-dropdown" 
              style={{ 
                position: 'absolute',
                 right: 0,
                 top: 'calc(100% + 4px)',
                 backgroundColor: darkThemeColors.backgroundSecondary, 
                 border: `1px solid ${darkThemeColors.borderDefault}`,
                 borderRadius: '6px',
                 boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                 zIndex: 1000,
                 minWidth: '180px',
                 padding: '4px 0', 
                 maxHeight: '300px', 
                 overflowY: 'auto' 
               }}
            
            >
              {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => {
                  let columnLabel = column.id;
                  
                  if (column.id === "namaRapat") columnLabel = "Nama Rapat";
                  if (column.id === "startDateTime") columnLabel = "Tanggal Rapat"; 
                  if (column.id === "status") columnLabel = "Status";
                   return ( 
                    <div 
                    key={column.id}
                    onClick={() => column.toggleVisibility(!column.getIsVisible())} 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px 12px', 
                      cursor: 'pointer',
                      color: darkThemeColors.textPrimary, 
                      backgroundColor: 'transparent', 
                      transition: 'background-color 0.15s ease',
                      fontSize: '14px', 
                      border: 'none', 
                      width: '100%', 
                      textAlign: 'left', 
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkThemeColors.backgroundTertiary} 
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                   
                    <input
                      type="checkbox"
                      checked={column.getIsVisible()}
                      readOnly 
                      style={{
                         marginRight: '10px',
                         accentColor: darkThemeColors.brandPrimary, 
                       }}
                    />
                    
                    {columnLabel}
                  </div>
                    )
                })}
            </div>
          )}
        </div>
         {}
         <button
            type="button"
            onClick={fetchDataRapat} 
            disabled={isLoading}
            style={isLoading ? buttonDisabledStyle : buttonStyle}
            onMouseEnter={(e) => !isLoading && Object.assign(e.currentTarget.style, buttonHoverStyle)}
            onMouseLeave={(e) => !isLoading && Object.assign(e.currentTarget.style, buttonStyle)}
            title="Refresh data"
         >
            {}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: isLoading ? '8px' : '0' }}>
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                <path d="M21 3v5h-5"/>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                <path d="M3 21v-5h5"/>
            </svg>
            {isLoading ? ' Memuat...' : ''}
         </button>
      </div>

      {/* Tampilkan Loading Selama Fetch */}
      {isLoading && <div style={{ textAlign: 'center', padding: '20px', color: darkThemeColors.textSecondary }}>Memuat data rapat...</div>}

      {/* Tabel */}
      {!isLoading && !error && ( 
        <div style={{ overflowX: 'auto', border: `1px solid ${darkThemeColors.borderDefault}`, borderRadius: '8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} >
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan} style={{ padding: '12px 15px', borderBottom: `2px solid ${darkThemeColors.borderStrong}`, textAlign: 'left', backgroundColor: darkThemeColors.backgroundSecondary, color: darkThemeColors.textPrimary, fontWeight: '600', whiteSpace: 'nowrap' }}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => ( 
                  <tr key={row.id} style={{ backgroundColor: row.getIsSelected() ? darkThemeColors.rowSelectedBg : (Number(row.id.replace(/\D/g,'')) % 2 === 0 ? darkThemeColors.backgroundPrimary : darkThemeColors.backgroundSecondary),  }}
                   onMouseEnter={(e) => {  }}
                   onMouseLeave={(e) => {  }}>
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
      )}

      {/* Pagination Controls */}
      {!isLoading && !error && pageCount > 0 && ( 
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '20px', fontSize: '14px', color: darkThemeColors.textSecondary }}>
              <div style={{ flexShrink: 0 }}>
                  {table.getFilteredSelectedRowModel().rows.length} dari{' '}
                  {table.getFilteredRowModel().rows.length} baris dipilih.
                  
              </div>
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
                          
                          value={table.getState().pagination.pageIndex + 1}
                          onChange={e => {
                              const page = e.target.value ? Number(e.target.value) - 1 : 0
                              // Pastikan tidak melebihi batas
                              if (page >= 0 && page < table.getPageCount()) {
                                  table.setPageIndex(page)
                              }
                          }}
                          min={1}
                          max={table.getPageCount()}
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
                  {/* Tombol Pagination */}
                  <button type="button" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} style={!table.getCanPreviousPage() ? buttonDisabledStyle : buttonStyle} /* ... hover events ... */ > {'<<'} </button>
                  <button type="button" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} style={!table.getCanPreviousPage() ? buttonDisabledStyle : buttonStyle} /* ... hover events ... */ > {'<'} </button>
                  <button type="button" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} style={!table.getCanNextPage() ? buttonDisabledStyle : buttonStyle} /* ... hover events ... */ > {'>'} </button>
                  <button type="button" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} style={!table.getCanNextPage() ? buttonDisabledStyle : buttonStyle} /* ... hover events ... */ > {'>>'} </button>
              </div>
          </div>
      )}

      {/* Modal Lengkapi Dokumen (Sebagian besar sama, ikat ke state baru) */}
      {rapatUntukModal && (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                if (isSubmitting) return; 
                closeModal();
                setRapatUntukModal(null);
                setNotulensiInput(""); 
                setFilesToUpload([]); 
                setError(null); 
            }}
            className="max-w-[700px] p-6 lg:p-10 bg-gray-800 rounded-lg" 
        >
            <div className="flex flex-col px-2 overflow-y-auto custom-scroll max-h-[80vh]">
                <div>
                    <h5 className="mb-2 text-white text-lg font-semibold">
                        Lengkapi Dokumen Rapat
                    </h5>
                    <p className="text-sm text-gray-400">
                        Silahkan masukkan informasi dokumen untuk: <strong style={{color: darkThemeColors.brandPrimary}}>{rapatUntukModal.namaRapat}</strong>
                    </p>
                    {/* Tampilkan error spesifik modal */}
                    {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
                </div>
                <div className="mt-8">
                    <div className="mb-6">
                        <label htmlFor="doc-notulensi" className="modal-label mb-1.5 block text-sm font-medium text-gray-400">
                            Notulensi Rapat {/* Ubah label jika perlu */}
                        </label>
                        <textarea
                            id="doc-notulensi"
                            rows={5} 
                            value={notulensiInput} 
                            onChange={(e) => setNotulensiInput(e.target.value)}
                            placeholder="Masukkan hasil notulensi rapat di sini..."
                            className="modal-input w-full rounded-lg border bg-gray-900 border-gray-700 px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:border-brand-800 focus:ring-1 focus:ring-brand-800 outline-none"
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="doc-file" className="modal-label mb-1.5 block text-sm font-medium text-gray-400">
                            Upload File Dokumen (Maks 5)
                        </label>
                        <input
                            id="doc-file"
                            type="file"
                            multiple 
                            onChange={handleFileChange} 
                            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                            className="modal-input file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-800 file:text-brand-100 hover:file:bg-brand-700 block w-full text-sm text-gray-400 cursor-pointer"
                            disabled={isSubmitting}
                        />
                         <p className="mt-1 text-xs text-gray-400">PDF, DOC, DOCX, PNG, JPG (MAX. 5MB per file)</p>
                         {/* Tampilkan daftar file terpilih */}
                         {filesToUpload.length > 0 && (
                           <ul className="mt-2 list-disc list-inside text-xs text-green-400">
                             {filesToUpload.map((file, index) => (
                               <li key={index}>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</li>
                             ))}
                           </ul>
                         )}
                    </div>
                </div>
                 <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-700 modal-footer sm:justify-end">
                    <button
                        onClick={() => { closeModal(); setRapatUntukModal(null); setNotulensiInput(""); setFilesToUpload([]); setError(null); }}
                        type="button"
                        disabled={isSubmitting}
                        className="modal-footer-button modal-footer-close flex w-full justify-center rounded-lg border border-gray-600 bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-gray-700 sm:w-auto disabled:opacity-50"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSimpanDokumen}
                        type="button"
                        disabled={isSubmitting}
                        className="modal-footer-button modal-footer-action flex w-full justify-center rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700 sm:w-auto disabled:opacity-50"
                    >
                        {isSubmitting ? 'Menyimpan...' : 'Simpan Dokumen'}
                    </button>
                </div>
            </div>
        </Modal>
      )}

      {/* Portal untuk Menu Aksi (action menu) */}
      {isClient && activeActionMenuId && menuPosition && activeRapatForMenu && ReactDOM.createPortal(
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
          <div style={{ padding: '8px 16px', fontSize: '12px', fontWeight: '600', color: darkThemeColors.textTertiary, borderBottom: `1px solid ${darkThemeColors.borderDefault}`, marginBottom: '4px' }}>
            Aksi untuk: <br/> 
            <strong style={{color: darkThemeColors.brandPrimary, fontSize: '13px'}}>
              {/* Gunakan optional chaining dan fallback value */}
              {activeRapatForMenu?.namaRapat
                  
                  ? `${activeRapatForMenu.namaRapat.substring(0, 25)}${activeRapatForMenu.namaRapat.length > 25 ? "..." : ""}`
                  : '(Nama Rapat Tidak Tersedia)'
                  
              }
            </strong>
          </div>
          { 
            (() => {
              const menuItems = [];
              const currentStatus = activeRapatForMenu.status; 

              
              const hapusAction = {
                label: "Hapus Rapat",
                action: () => handleDeleteRapat(activeRapatForMenu.id, activeRapatForMenu.namaRapat), 
                style: { color: '#F87171' }
              };

              if (currentStatus === "AKTIF") {
                  
                  
                  menuItems.push(hapusAction);
              } else if (currentStatus === "SELESAI") {
                menuItems.push({
                    label: "Lengkapi Dokumen",
                    action: () => handleLengkapiDokumenClick(activeRapatForMenu) 
                });
                menuItems.push(hapusAction);
              } else if (currentStatus === "ARSIP") {
                menuItems.push({
                    label: "Download Laporan",
                    action: () => handleDownloadLaporan(activeRapatForMenu.id, activeRapatForMenu.namaRapat) 
                });
                menuItems.push(hapusAction); 
              }

              // Render tombol menu
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
        document.body // Target portal
      )}
    </div>
  );
}