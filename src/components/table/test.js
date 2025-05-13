"use client";

import clsx from 'clsx';
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
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

import { 
  fetchDataRapat,
  deleteDataRapat,
  completeDataRapat,
  downloadDataRapat,
 } from '@/services/table/dashboard-services';
import { downloadPdf } from '@/utils/download-pdf';
import useDebounce from '@/hooks/useDebounce';
import ActionCell from './actions-cell';
import TableHeader from './table-header';
import formatDate from '@/utils/format-date';


export function DataTableRapat() {
  const router = useRouter();
  const { isOpen, openModal, closeModal: closeModalHook } = useModal(); // Renamed to avoid conflict

  // State
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [pageCount, setPageCount] = useState(0);
  const [activeActionMenuId, setActiveActionMenuId] = useState(null);
  const [isColumnToggleMenuVisible, setIsColumnToggleMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState(null);
  const [activeRapatForMenu, setActiveRapatForMenu] = useState(null);
  const [rapatUntukModal, setRapatUntukModal] = useState(null);
  const [notulensiInput, setNotulensiInput] = useState("");
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchInput = useDebounce(searchInput, 300);


  const [isBulkActionMenuVisible, setIsBulkActionMenuVisible] = useState(false);


  
  const columnToggleButtonRef = useRef(null);
  const columnsVisibilityDropdownRef = useRef(null);
  const actionMenuPortalRef = useRef(null);
  const currentActionButtonRef = useRef(null);
  const bulkActionButtonRef = useRef(null);
  const bulkActionMenuDropdownRef = useRef(null);


 


  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const {data, totalPages } = await fetchDataRapat({
        page : pagination.pageIndex + 1,
        limit : pagination.pageSize,
        filters : [{
          id: 'namaRapat', 
          value: debouncedSearchInput,
        }
        ,...columnFilters],
        sorting
      })
      setTableData(data);
      setPageCount(totalPages);
    } catch (err) {
      console.error("Fetch data error:", err);
      setError(err.message);
      setTableData([]);
      setPageCount(0);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize, columnFilters, sorting, debouncedSearchInput]);

  

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  


  // Menus close/open
  const closeActionMenu = useCallback(() => {
    setActiveActionMenuId(null);
    setActiveRapatForMenu(null);
    setMenuPosition(null);
    currentActionButtonRef.current = null;
  }, []);

  const openActionMenu = useCallback((row, targetElement) => {
    const actualRapatData = row.original;
    if (!actualRapatData || !targetElement) {
        console.error("Missing actualRapatData or targetElement in openActionMenu");
        return;
    }
    const rect = targetElement.getBoundingClientRect();
    const topPos = rect.bottom + window.scrollY + 4;
    const leftPos = rect.left + window.scrollX;
    setActiveActionMenuId(actualRapatData?.id || null);
    setActiveRapatForMenu(actualRapatData);
    setMenuPosition({ top: topPos, left: leftPos });
    currentActionButtonRef.current = targetElement;
  }, []);

  const closeBulkActionMenu = useCallback(() => {
    setIsBulkActionMenuVisible(false);
  }, []);

  // Modal close
  const closeModal = useCallback(() => {
    closeModalHook();
    setRapatUntukModal(null); // Clear modal-specific data
    setNotulensiInput("");
    setFilesToUpload([]);
    setError(null); // Clear modal-specific errors
  }, [closeModalHook]);


  // ... (handleLengkapiDokumenClick, handleFileChange, handleSimpanDokumen, handleDeleteRapat, handleDownloadLaporan remain the same)
  // Ensure they use the new `closeModal` if they were closing the modal.
  const handleLengkapiDokumenClick = useCallback((rapatData) => {
    setRapatUntukModal(rapatData);
    setNotulensiInput(rapatData.notulensiRapat || "");
    setFilesToUpload([]);
    setIsSubmitting(false);
    openModal(); // from useModal hook
  }, [openModal]);

  const handleFileChange = (event) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files).slice(0, 5);
      setFilesToUpload(selectedFiles);
    }
  };

  const handleSimpanDokumen = useCallback(async () => {
    if (!rapatUntukModal) return;
    if (!notulensiInput.trim() && filesToUpload.length === 0) {
      setError("Harap isi notulensi atau unggah setidaknya satu file dokumen."); // Set error for modal
      return;
    }
    setIsSubmitting(true);
    setError(null);
    const formData = new FormData();
    formData.append('notulensiRapat', notulensiInput);
    filesToUpload.forEach(file => formData.append('dokumenRapat', file));
    try {
      await completeDataRapat(rapatUntukModal.id,formData);
      alert(`Dokumen untuk rapat "${rapatUntukModal.namaRapat}" berhasil disimpan.`);
      closeModal();
      fetchData();
    } catch (err) { 
      if(err.message === "Unauthorized") {
        router.push('/sign-in');
        return;
      }
      setError(err.message); 
    } // Set error for modal
    finally { setIsSubmitting(false); }
  }, [closeModal, rapatUntukModal, notulensiInput, filesToUpload, fetchData, router]);

  const handleDeleteRapat = useCallback(async (meetingId, namaRapat) => {
      if (!meetingId) return;
      if (window.confirm(`Apakah Anda yakin ingin menghapus rapat "${namaRapat}"?`)) {
          setIsLoading(true); 
          setError(null); 
          try {
              await deleteDataRapat(meetingId);
              alert(`Rapat "${namaRapat}" berhasil dihapus.`);
              fetchData();
          } catch (err) { 
            if(err.message === "Unauthorized") {
              router.push('/sign-in');
              return;
            }
            setError(err.message); }
          finally { setIsLoading(false); }
      }
  }, [fetchData, router]);

  const handleDownloadLaporan = useCallback(async (meetingId, namaRapat) => {
     if (!meetingId) return;
      try {
          const blob = await downloadDataRapat(meetingId);
          downloadPdf(blob,`Notulensi_${namaRapat}.pdf`);
      } catch (err) { 
        if(err.message === "Unauthorized") {
          router.push('/sign-in');
          return;
        }
        alert(`Error: ${err.message}`); 
      }
  }, [router]);

 
  const columns = useMemo(() => [
     {
      id: "select",
      header: ({ table }) => (
          <input type="checkbox"
              className="accent-brand-500 bg-background-secondary border-border-strong rounded-[3px] w-4 h-4 focus:ring-offset-0 focus:ring-1 focus:ring-border-focus"
              ref={el => { if (el) { el.indeterminate = table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(); } }}
              checked={table.getIsAllPageRowsSelected()}
              onChange={table.getToggleAllPageRowsSelectedHandler()}
              aria-label="Select all" />
      ),
      cell: ({ row }) => (
          <input type="checkbox"
              className="accent-brand-500 bg-background-secondary border-border-strong rounded-[3px] w-4 h-4 focus:ring-offset-0 focus:ring-1 focus:ring-border-focus"
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              onChange={row.getToggleSelectedHandler()}
              aria-label="Select row" />
      ),
      enableSorting: false, enableHiding: false,
    },
    {
      accessorKey: "namaRapat",
      header: "Nama Rapat",
      enableSorting : true,
      enableColumnFilter: true,
    },
    {
      accessorKey: "startDateTime",
      header: "Tanggal Rapat",
      enableSorting: true,
      cell : ({row}) => {
        return formatDate(row.original.startDateTime)
      }
    },
    {
      accessorKey: "status",
      header:"Status",
      enableSorting: true,
      enableColumnFilter: true,
      cell : ({row}) => (
        <span className={clsx({
          'text-blue-500 font-bold': row.original.status === 'AKTIF',
          'text-green-500 font-bold': row.original.status === 'SELESAI',
          'text-gray-500 font-bold': row.original.status === 'ARSIP',
        })}>
          {row.original.status}
        </span>
      )
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
  ], [activeActionMenuId, openActionMenu, closeActionMenu]);

  const table = useReactTable({
    data: tableData,
    columns,
    pageCount: pageCount,
    state: {
      pagination, sorting, columnFilters, columnVisibility, rowSelection,
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


  // useEffect for click outside (add bulk action menu)
  useEffect(() => {
    const handleClickOutside = (event) => {
       if (activeActionMenuId &&
           currentActionButtonRef.current && !currentActionButtonRef.current.contains(event.target) &&
           actionMenuPortalRef.current && !actionMenuPortalRef.current.contains(event.target)) {
         closeActionMenu();
       }
       if (isColumnToggleMenuVisible &&
           columnToggleButtonRef.current && !columnToggleButtonRef.current.contains(event.target) &&
           columnsVisibilityDropdownRef.current && !columnsVisibilityDropdownRef.current.contains(event.target)) {
         setIsColumnToggleMenuVisible(false);
       }
       // NEW: Close bulk action menu
       if (isBulkActionMenuVisible &&
           bulkActionButtonRef.current && !bulkActionButtonRef.current.contains(event.target) &&
           bulkActionMenuDropdownRef.current && !bulkActionMenuDropdownRef.current.contains(event.target)) {
         closeBulkActionMenu();
       }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeActionMenuId, isColumnToggleMenuVisible, closeActionMenu, isBulkActionMenuVisible, closeBulkActionMenu]);

  const [isClient, setIsClient] = React.useState(false);
  useEffect(() => { setIsClient(true); }, []);

  // Tailwind classes
  const baseInputClass = "px-3 py-2 bg-background-secondary text-text-primary border border-border-default rounded-md text-sm outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus transition duration-200 ease-in-out";
  const baseSelectClass = `${baseInputClass} appearance-none pr-9 bg-no-repeat bg-[right_0.75rem_center] bg-[length:1em_1em]`;
  const baseButtonClass = "px-4 py-2 rounded-md cursor-pointer text-sm font-medium transition-colors duration-150 ease-in-out inline-flex items-center justify-center whitespace-nowrap border";
  const defaultButtonClass = `${baseButtonClass} bg-background-secondary text-text-primary border-border-default hover:bg-background-tertiary hover:border-border-focus`;
  const primaryButtonClass = `${baseButtonClass} bg-brand-600 text-text-on-brand border-brand-600 hover:bg-brand-700`;
  const disabledButtonClass = `${baseButtonClass} text-text-disabled bg-background-tertiary cursor-not-allowed opacity-70 border-border-default`;


  // --- BULK ACTION LOGIC ---
  const selectedRowsData = useMemo(() => {
    return table.getSelectedRowModel().rows.map(row => row.original);
  }, [rowSelection, tableData]); // Re-calculate when selection or data changes

  const availableBulkActions = useMemo(() => {
    if (selectedRowsData.length === 0) return [];

    const statuses = new Set(selectedRowsData.map(row => row.status));
    const actions = [];

    if (statuses.size === 1) {
      const singleStatus = statuses.values().next().value;
      if (singleStatus === "ARSIP") {
        actions.push({ label: "Download Laporan Terpilih", handler: () => handleBulkDownloadSelected() });
        actions.push({ label: "Hapus Rapat Terpilih", handler: () => handleBulkDeleteSelected(), isDanger: true });
      } else if (singleStatus === "SELESAI" || singleStatus === "AKTIF") {
        actions.push({ label: "Hapus Rapat Terpilih", handler: () => handleBulkDeleteSelected(), isDanger: true });
      }
    } else if (statuses.size > 1) {
      actions.push({ label: "Hapus Rapat Terpilih", handler: () => handleBulkDeleteSelected(), isDanger: true });
    }
    return actions;
  }, [selectedRowsData]);

  const handleBulkDeleteSelected = useCallback(async () => {
    const meetingsToDelete = selectedRowsData;
    if (meetingsToDelete.length === 0) return;

    if (window.confirm(`Apakah Anda yakin ingin menghapus ${meetingsToDelete.length} rapat yang dipilih?`)) {
      setIsLoading(true);
      setError(null);
      let successCount = 0;
      let failCount = 0;

      for (const meeting of meetingsToDelete) {
        try {
          const response = await fetch(`/api/meetings/${meeting.id}`, { method: 'DELETE' });
          if (response.status === 401) { router.push('/sign-in'); throw new Error("Sesi tidak valid."); }
          if (!response.ok) {
            const errorData = await response.json();
            console.error(`Gagal menghapus rapat "${meeting.namaRapat}": ${errorData.message || response.status}`);
            failCount++;
            continue;
          }
          successCount++;
        } catch (err) {
          console.error(`Error saat menghapus rapat "${meeting.namaRapat}":`, err);
          failCount++;
        }
      }

      let message = "";
      if (successCount > 0) message += `${successCount} rapat berhasil dihapus. `;
      if (failCount > 0) message += `${failCount} rapat gagal dihapus. Lihat konsol untuk detail.`;
      if (!message) message = "Tidak ada rapat yang diproses.";
      
      alert(message);
      fetchData();
      table.resetRowSelection(); // Clear selection
      closeBulkActionMenu();
      setIsLoading(false);
    }
  }, [selectedRowsData, fetchData, router, table, closeBulkActionMenu]);

  const handleBulkDownloadSelected = useCallback(async () => {
    const meetingsToDownload = selectedRowsData.filter(row => row.status === "ARSIP");
    if (meetingsToDownload.length === 0) {
        alert("Tidak ada rapat berstatus ARSIP yang dipilih untuk diunduh.");
        return;
    }

    if (window.confirm(`Laporan untuk ${meetingsToDownload.length} rapat terpilih (status ARSIP) akan diunduh satu per satu. Lanjutkan?`)) {
      // No global loading for multiple downloads to keep UI responsive
      let downloadInitiated = 0;
      for (const meeting of meetingsToDownload) {
        // Re-using the single download handler
        await handleDownloadLaporan(meeting.id, meeting.namaRapat);
        downloadInitiated++;
         // Optional: Add a small delay if triggering too many downloads too quickly causes issues
        // await new Promise(resolve => setTimeout(resolve, 200));
      }
      if(downloadInitiated > 0) {
        // alert(`${downloadInitiated} proses unduh laporan telah dimulai.`);
      }
      table.resetRowSelection();
      closeBulkActionMenu();
    }
  }, [selectedRowsData, handleDownloadLaporan, table, closeBulkActionMenu]);
  // --- END BULK ACTION LOGIC ---


  return (
    <div className="w-full font-outfit bg-background-body p-5 text-text-primary">
      {error && <div className="text-red-500 dark:text-error-400 mb-4 border border-red-500 dark:border-error-500 p-2.5 rounded-md text-sm">Error: {error}</div>}

       <div className="flex items-center mb-5 gap-3 flex-wrap">
        <input type="text" placeholder="Filter nama rapat..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className={`${baseInputClass} flex-grow min-w-[200px]`}
        />
        <select
          value={table.getColumn('status')?.getFilterValue() ?? ''}
          onChange={(e) => table.getColumn('status')?.setFilterValue(e.target.value || undefined)}
          className={`${baseSelectClass} basis-[200px]`}
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='${encodeURIComponent('var(--color-text-secondary)')}'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E")`}}
        >
          <option value="" className="bg-background-secondary text-text-primary">Semua Status</option>
          <option value="AKTIF" className="bg-background-secondary text-text-primary">Aktif</option>
          <option value="SELESAI" className="bg-background-secondary text-text-primary">Selesai</option>
          <option value="ARSIP" className="bg-background-secondary text-text-primary">Arsip</option>
        </select>

        {/* --- BULK ACTION BUTTON --- */}
        {selectedRowsData.length > 0 && availableBulkActions.length > 0 && (
            <div className="relative">
                <button
                    id="bulk-action-button"
                    ref={bulkActionButtonRef}
                    type="button"
                    onClick={() => setIsBulkActionMenuVisible(!isBulkActionMenuVisible)}
                    className={clsx(primaryButtonClass, "ml-auto md:ml-0")} // primary styling
                    disabled={isLoading || availableBulkActions.length === 0}
                >
                    Aksi untuk {selectedRowsData.length} Pilihan <span className="ml-1">▼</span>
                </button>
                {isBulkActionMenuVisible && (
                    <div
                        id="bulk-action-menu-dropdown"
                        ref={bulkActionMenuDropdownRef}
                        className="absolute left-0 md:left-auto md:right-0 top-full mt-1 bg-background-secondary border border-border-default rounded-md shadow-lg z-[1000] min-w-[200px] py-1 max-h-[300px] overflow-y-auto"
                    >
                        {availableBulkActions.map((action) => (
                            <button
                                key={action.label}
                                type="button"
                                onClick={() => { action.handler(); }} 
                                className={clsx(
                                    "block w-full text-left px-3 py-2 cursor-pointer text-text-primary bg-white hover:bg-background-tertiary text-sm",
                                    action.isDanger && "text-error-500 hover:bg-error-subtle hover:text-error-600"
                                )}
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        )}
        {/* --- END BULK ACTION BUTTON --- */}

        <div className="relative ml-auto md:ml-0"> {/* ml-auto for small screens, then normal flow */}
          <button id="column-toggle-button" ref={columnToggleButtonRef} type="button"
            onClick={() => setIsColumnToggleMenuVisible(!isColumnToggleMenuVisible)}
            className={defaultButtonClass}
          >
            Kolom <span className="ml-1">▼</span>
          </button>
          {isColumnToggleMenuVisible && (
             <div id="columns-visibility-dropdown" ref={columnsVisibilityDropdownRef}
              className="menu-dropdown absolute right-0 top-full mt-1 z-[1000] max-h-[300px] overflow-y-auto"
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
                      className="flex items-center px-3 py-2 cursor-pointer text-text-primary hover:bg-background-tertiary text-sm w-full text-left"
                    >
                      <input type="checkbox" checked={column.getIsVisible()} readOnly
                        className="mr-2.5 accent-brand-500"
                      />
                      {columnLabel}
                    </div>
                   )
                })}
            </div>
          )}
        </div>
         <button
            type="button"
            onClick={() => { fetchData(); table.resetRowSelection(); }}
            disabled={isLoading}
            className={clsx(isLoading ? disabledButtonClass : defaultButtonClass, 'p-2')}
            title="Refresh data"
         >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={clsx(isLoading && 'mr-2')}>
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                <path d="M21 3v5h-5"/>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                <path d="M3 21v-5h5"/>
            </svg>
            {isLoading ? 'Memuat...' : ''}
         </button>
      </div>

      {isLoading && <div className="text-center p-5 text-text-secondary">Memuat data rapat...</div>}

      {!isLoading && !error && (
        <div className="overflow-x-auto border border-border-default rounded-lg">
          <table className="w-full border-collapse text-sm">
            <TableHeader 
              headerGroups={table.getHeaderGroups()}
              onSort = {(header)=> header.column.toggleSorting(header.column.getIsSorted() === "asc")}
            />
            <tbody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <tr key={row.id}
                    className={clsx(
                      "hover:bg-background-tertiary/50 transition-colors",
                      row.getIsSelected()
                        ? "bg-brand-subtle text-text-primary"
                        : index % 2 === 0 ? "bg-background-primary" : "bg-background-secondary"
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 border-b border-border-default">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="py-10 text-center text-text-tertiary italic">
                    Tidak ada hasil.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {!isLoading && !error && pageCount > 0 && (
          <div className="flex items-center justify-between pt-5 text-sm text-text-secondary flex-wrap gap-y-3">
              <div className="flex-shrink-0">
                  {table.getFilteredSelectedRowModel().rows.length} dari{' '}
                  {table.getFilteredRowModel().rows.length} baris dipilih.
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                  <span>
                      Halaman{' '}
                      <strong>
                          {table.getState().pagination.pageIndex + 1} dari {table.getPageCount()}
                      </strong>
                  </span>
                  <span className="flex items-center gap-1">
                      | Ke halaman:
                      <input
                          type="number"
                          defaultValue={table.getState().pagination.pageIndex + 1} // Use defaultValue for uncontrolled with manual update
                          onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            if (page >=0 && page < table.getPageCount()) {
                                table.setPageIndex(page);
                            }
                          }}
                          onBlur={e => { // Ensure value is within bounds on blur
                            let page = e.target.value ? Number(e.target.value) -1 : 0;
                            if (page < 0) page = 0;
                            if (page >= table.getPageCount()) page = table.getPageCount() -1;
                            table.setPageIndex(page);
                            e.target.value = page + 1; // Update input to reflect actual page
                          }}
                          min={1} max={table.getPageCount()}
                          className={`${baseInputClass} w-16 px-2 py-1 text-center`}
                      />
                  </span>
                  <select
                      value={table.getState().pagination.pageSize}
                      onChange={e => { table.setPageSize(Number(e.target.value)) }}
                      className={`${baseSelectClass} h-auto py-1 pr-7 pl-2`}
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='${encodeURIComponent('var(--color-text-secondary)')}'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E")`}}
                  >
                      {[10, 20, 30, 40, 50].map(pageSize => (
                          <option key={pageSize} value={pageSize} className="bg-background-secondary text-text-primary">
                              Tampil {pageSize}
                          </option>
                      ))}
                  </select>
                  <button type="button" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} className={clsx(!table.getCanPreviousPage() ? disabledButtonClass : defaultButtonClass, 'p-2')}> {'<<'} </button>
                  <button type="button" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className={clsx(!table.getCanPreviousPage() ? disabledButtonClass : defaultButtonClass, 'p-2')}> {'<'} </button>
                  <button type="button" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className={clsx(!table.getCanNextPage() ? disabledButtonClass : defaultButtonClass, 'p-2')}> {'>'} </button>
                  <button type="button" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} className={clsx(!table.getCanNextPage() ? disabledButtonClass : defaultButtonClass, 'p-2')}> {'>>'} </button>
              </div>
          </div>
      )}

       {rapatUntukModal && (
        <Modal
            isOpen={isOpen}
            onClose={closeModal} // Use the new closeModal
            className="max-w-2xl w-full m-4"
        >
            <div className="flex flex-col bg-background-primary rounded-lg shadow-xl max-h-[85vh]">
                <div className="px-6 py-4 border-b border-border-default">
                    <h5 className="text-lg font-semibold text-text-primary">
                        Lengkapi Dokumen Rapat
                    </h5>
                    <p className="text-sm text-text-secondary mt-1">
                        Untuk: <strong className="text-brand-400">{rapatUntukModal.namaRapat}</strong>
                    </p>
                    {/* Modal-specific error */}
                    {error && rapatUntukModal && <p className="text-sm text-error-500 dark:text-error-400 mt-2">{error}</p>}
                </div>

                <div className="px-6 py-5 flex-grow overflow-y-auto space-y-6">
                    <div>
                        <label htmlFor="doc-notulensi" className="block text-sm font-medium text-text-secondary mb-1.5">
                            Notulensi Rapat
                        </label>
                        <textarea
                            id="doc-notulensi"
                            rows={5}
                            value={notulensiInput}
                            onChange={(e) => setNotulensiInput(e.target.value)}
                            placeholder="Masukkan hasil notulensi rapat di sini..."
                            className={`${baseInputClass} w-full resize-y`}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                         <label htmlFor="doc-file" className="block text-sm font-medium text-text-secondary mb-1.5">
                            Upload File Dokumen (Maks 5)
                        </label>
                         <input
                            id="doc-file"
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                            className="block w-full text-sm text-text-secondary cursor-pointer
                                file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-brand-600 file:text-text-on-brand
                                hover:file:bg-brand-700
                                focus:outline-none focus:ring-1 focus:ring-border-focus"
                            disabled={isSubmitting}
                        />
                        <p className="mt-1 text-xs text-text-tertiary">PDF, DOC, DOCX, PNG, JPG (MAX. 5MB per file)</p>
                        {filesToUpload.length > 0 && (
                           <ul className="mt-2 list-disc list-inside text-xs text-success-500 dark:text-success-400 space-y-1">
                             {filesToUpload.map((file, index) => (
                               <li key={index}>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</li>
                             ))}
                           </ul>
                         )}
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border-default">
                    <button
                        onClick={closeModal}
                        type="button"
                        disabled={isSubmitting}
                        className={clsx(
                            baseButtonClass,
                            'bg-background-primary border-border-default text-text-primary hover:bg-background-secondary disabled:opacity-50'
                        )}
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSimpanDokumen}
                        type="button"
                        disabled={isSubmitting || (!notulensiInput.trim() && filesToUpload.length === 0)}
                        className={clsx(
                            baseButtonClass,
                            'bg-brand-600 border-brand-600 text-text-on-brand hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed'
                        )}
                    >
                        {isSubmitting ? 'Menyimpan...' : 'Simpan Dokumen'}
                    </button>
                </div>
            </div>
        </Modal>
      )}

      {isClient && activeActionMenuId && menuPosition && activeRapatForMenu && ReactDOM.createPortal(
        <div
          ref={actionMenuPortalRef}
          style={{
            position: 'absolute',
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
            zIndex: 2000,
           }}
          className="menu-dropdown"
        >
          <div className="px-4 py-2 text-xs font-semibold text-text-tertiary border-b border-border-default mb-1">
            Aksi untuk: <br/>
            <strong className="text-brand-400 text-[13px] block truncate" title={activeRapatForMenu?.namaRapat || ''}>
              {activeRapatForMenu?.namaRapat
                  ? `${activeRapatForMenu.namaRapat.substring(0, 25)}${activeRapatForMenu.namaRapat.length > 25 ? "..." : ""}`
                  : '(Nama Rapat Tidak Tersedia)'
              }
            </strong>
          </div>
          {
            (() => {
               const menuItems = [];
              const currentStatus = activeRapatForMenu?.status;

              const hapusAction = {
                label: "Hapus Rapat",
                action: () => handleDeleteRapat(activeRapatForMenu?.id, activeRapatForMenu?.namaRapat),
                className: "menu-dropdown-item menu-dropdown-item-danger"
              };

              if (currentStatus === "AKTIF") {
                  menuItems.push(hapusAction);
              } else if (currentStatus === "SELESAI") {
                menuItems.push({
                    label: "Lengkapi Dokumen",
                    action: () => handleLengkapiDokumenClick(activeRapatForMenu),
                    className: "menu-dropdown-item"
                });
                menuItems.push(hapusAction);
              } else if (currentStatus === "ARSIP") {
                menuItems.push({
                    label: "Download Laporan",
                    action: () => handleDownloadLaporan(activeRapatForMenu?.id, activeRapatForMenu?.namaRapat),
                    className: "menu-dropdown-item"
                });
                menuItems.push(hapusAction);
              }

              return menuItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={clsx(
                    "block w-full text-left px-4 py-2 text-sm cursor-pointer transition-colors duration-150",
                    item.className
                  )}
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
  );
}