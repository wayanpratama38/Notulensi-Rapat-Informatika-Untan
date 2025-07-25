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
import Swal from 'sweetalert2';

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
  const [notulensiError, setNotulensiError] = useState(null);
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [hasAttemptedOverUpload, setHasAttemptedOverUpload] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchInput = useDebounce(searchInput, 300);
  const [isDownloading, setIsDownloading] = useState(false);


  const [isBulkActionMenuVisible, setIsBulkActionMenuVisible] = useState(false);


  
  const columnToggleButtonRef = useRef(null);
  const columnsVisibilityDropdownRef = useRef(null);
  const actionMenuPortalRef = useRef(null);
  const currentActionButtonRef = useRef(null);
  const bulkActionButtonRef = useRef(null);
  const bulkActionMenuDropdownRef = useRef(null);


  const countWords = (text) => {
    if(!text ||text.trim()) {
      return 0;
    }
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  const validateNotulensi = (text) => {
    const trimmedText = text.trim();
    const charCount = trimmedText.length;

    if (!trimmedText) {
        return "Notulensi wajib diisi.";
    }
    if (charCount < 30) {
        return `Notulensi minimal 30 karakter (saat ini ${charCount} karakter).`;
    }
    return null;
  }
 


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
    setHasAttemptedOverUpload(false); // Reset new state
  }, [closeModalHook]);


  // ... (handleLengkapiDokumenClick, handleFileChange, handleSimpanDokumen, handleDeleteRapat, handleDownloadLaporan remain the same)
  // Ensure they use the new `closeModal` if they were closing the modal.
  const handleLengkapiDokumenClick = useCallback((rapatData) => {
    setRapatUntukModal(rapatData);
    setNotulensiInput(rapatData.notulensiRapat || "");
    setFilesToUpload([]);
    setIsSubmitting(false);
    setHasAttemptedOverUpload(false); // Reset new state
    setError(null); // Clear previous errors from modal
    openModal(); // from useModal hook
  }, [openModal]);

  const handleNotulensiChange = (event) => {
    const newNotulensi = event.target.value;
    setNotulensiInput(newNotulensi);
    setNotulensiError(validateNotulensi(newNotulensi));
  }

  const handleFileChange = (event) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);

      if (filesToUpload.length + newFiles.length > 6) {
        Swal.fire({
          title: 'Gagal Menambah File!',
          text: `Anda mencoba menambah ${newFiles.length} file. Total akan menjadi ${filesToUpload.length + newFiles.length} file. Maksimal 6 file diperbolehkan.`,
          icon: 'error',
          confirmButtonText: 'Mengerti'
        });
        setHasAttemptedOverUpload(true); // Mark attempt
        
        const availableSlots = 6 - filesToUpload.length;
        if (availableSlots > 0) {
            const filesThatFit = newFiles.slice(0, availableSlots);
            setFilesToUpload(prevFiles => [...prevFiles, ...filesThatFit]);
            Swal.fire({
                title: 'Sebagian File Ditambahkan',
                text: `Hanya ${filesThatFit.length} file pertama dari pilihan Anda yang ditambahkan untuk menjaga total tidak lebih dari 6. Anda masih memiliki file yang melebihi batas.`,
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        } else {
          
        }
        event.target.value = null; 
        return;
      }
      
      // If adding them doesn't exceed 6
      setFilesToUpload(prevFiles => [...prevFiles, ...newFiles]);
      // If this action makes it exactly 6 or less, and previously it was an over-upload attempt, reset the flag IF total is now valid.
      // This might be tricky if they are still over 6 due to partial add. The button check is more reliable.
      // For now, let hasAttemptedOverUpload stick until files are removed or modal reset.
      event.target.value = null; // Clear file input
    }
  };

  const handleRemoveFile = (indexToRemove) => {
    setFilesToUpload(prevFiles => {
      const updatedFiles = prevFiles.filter((_, index) => index !== indexToRemove);
      // After removing, check if the over-upload condition is still an issue or can be cleared
      if (updatedFiles.length <= 6) {
        setHasAttemptedOverUpload(false); // Cleared the over-upload condition by removing files
      }
      // If updatedFiles.length is still > 6 (shouldn't happen with current handleFileChange but defensive)
      // then hasAttemptedOverUpload remains true or is re-set true by button logic.
      return updatedFiles;
    });
  };

  // Fungsi untuk mereset jumlah file ke batas maksimum jika terlalu banyak (redundant with new handleFileChange, but keep for safety on modal open)
  const resetFilesToMaximum = useCallback(() => {
    if (filesToUpload.length > 6) {
      Swal.fire({
        title: 'File Dikurangi Otomatis',
        text: `Jumlah file terpilih lebih dari 6. File telah dikurangi menjadi 6 (batas maksimum).`,
        icon: 'info',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
      setFilesToUpload(prev => prev.slice(0, 6));
      setHasAttemptedOverUpload(false); // Corrected state after auto-trim
    }
  }, [filesToUpload.length]); // Removed setFilesToUpload from dependency array as it's being called within

  // Pastikan file tidak melebihi batas saat modal dibuka
  useEffect(() => {
    if (isOpen) { // Only run when modal is open
      if (filesToUpload.length > 6) {
         resetFilesToMaximum();
      } else if (filesToUpload.length <=6 ) {
        // If files are already valid, ensure flag is false if it was true from a previous interaction within same modal session (unlikely but safe)
        setHasAttemptedOverUpload(false);
      }
    }
  }, [isOpen, filesToUpload.length, resetFilesToMaximum]);

  const handleSimpanDokumen = useCallback(async () => {
    if (!rapatUntukModal) return;

    const currentNotulensiError = validateNotulensi(notulensiInput);
    if(currentNotulensiError) {
      Swal.fire({
        title: 'Gagal Menyimpan!',
        text: currentNotulensiError,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Mengerti'
      });
      return;
      }

    if (filesToUpload.length > 6 || hasAttemptedOverUpload) {
      Swal.fire({
        title: 'Gagal Menyimpan!',
        text: `Tidak dapat menyimpan karena ${hasAttemptedOverUpload ? 'Anda mencoba mengunggah lebih dari 6 file' : filesToUpload.length + ' file terpilih (maksimal 6)'}. Silakan periksa kembali jumlah file Anda.`,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Mengerti'
      });
      // Ensure the UI reflects the over-upload state if not already
      if (filesToUpload.length > 6 && !hasAttemptedOverUpload) setHasAttemptedOverUpload(true);
      return;
    }
    
    if (!notulensiInput.trim() && filesToUpload.length === 0) {
      Swal.fire({ title: 'Perhatian', text: "Harap isi notulensi atau unggah setidaknya satu file dokumen.", icon: 'warning', confirmButtonColor: '#3085d6', confirmButtonText: 'Mengerti' });
      setError("Harap isi notulensi atau unggah setidaknya satu file dokumen."); // Keep local error state for now
      return;
    }

    const nonImageFiles = filesToUpload.filter(file => !file.type.startsWith('image/'));
    if (nonImageFiles.length > 0) {
      Swal.fire({ title: 'Format File Tidak Valid', text: `${nonImageFiles.length} file bukan berupa gambar. Hanya file gambar (JPG, PNG) yang diperbolehkan.`, icon: 'error', confirmButtonColor: '#3085d6', confirmButtonText: 'Mengerti' });
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    const formData = new FormData();
    formData.append('notulensiRapat', notulensiInput);
    filesToUpload.forEach(file => formData.append('dokumenRapat', file));
    try {
      await completeDataRapat(rapatUntukModal.id,formData);
      // Replace alert with SweetAlert2
      Swal.fire({
        title: 'Berhasil!',
        text: `Dokumen untuk rapat "${rapatUntukModal.namaRapat}" berhasil disimpan.`,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
      closeModal();
      fetchData();
    } catch (err) { 
      if(err.message === "Unauthorized") {
        router.push('/sign-in');
        return;
      }
      
      // Tampilkan error dalam SweetAlert
      Swal.fire({
        title: 'Gagal!',
        text: err.message,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
      
      setError(err.message); 
    } 
    finally { setIsSubmitting(false); }
  }, [closeModal, rapatUntukModal, notulensiInput, filesToUpload, fetchData, router]);

  const handleDeleteRapat = useCallback(async (meetingId, namaRapat) => {
      if (!meetingId) return;
      
      const result = await Swal.fire({
          title: 'Apakah Anda yakin?',
          text: `Anda akan menghapus rapat "${namaRapat}". Tindakan ini tidak dapat dibatalkan!`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ya, hapus!',
          cancelButtonText: 'Batal'
      });

    
      if (result.isConfirmed) {
          setIsLoading(true);
          setError(null);
          try {
              await deleteDataRapat(meetingId);
              closeActionMenu();
              fetchData();
              await Swal.fire(
                  'Berhasil!',
                  `Rapat "${namaRapat}" berhasil dihapus.`,
                  'success'
              );

          } catch (err) {
              console.error("Error deleting meeting:", err);

              if (err.message === "Unauthorized") {
                 
                  Swal.fire({
                      title: 'Sesi Habis',
                      text: 'Sesi Anda telah berakhir. Anda akan diarahkan ke halaman login.',
                      icon: 'warning',
                      timer: 2500, 
                      showConfirmButton: false,
                      timerProgressBar: true,
                  }).then(() => {
                      router.push('/sign-in');
                  });
                  return; 
              }

              
              setError(err.message); 
              Swal.fire(
                  'Gagal!',
                  `Terjadi kesalahan saat menghapus rapat: ${err.message}`,
                  'error'
              );

          } finally {
              setIsLoading(false); 
          }
      }
  }, [fetchData, router, setIsLoading, setError]);

  // Memoize downloadDataRapat untuk menghindari panggilan ganda
  const memoizedDownloadRapat = useCallback(async (meetingId) => {
    console.log(`Fetching data for meeting ${meetingId}`);
    return await downloadDataRapat(meetingId);
  }, []);

  // Perbaiki download utility
  const handleDownloadLaporan = useCallback(async (meetingId, namaRapat) => {
     if (!meetingId) return;
     
     if (isDownloading) {
       console.log("Download already in progress, skipping...");
       return;
     }
     
      try {
          console.log(`Starting download for meeting ${namaRapat}`);
          setIsDownloading(true);
          const blob = await memoizedDownloadRapat(meetingId);
          downloadPdf(blob,`Notulensi_${namaRapat}.pdf`);
      } catch (err) { 
        if(err.message === "Unauthorized") {
          // Show a message before redirecting
          Swal.fire({
            title: 'Sesi Berakhir',
            text: 'Sesi Anda telah berakhir. Silakan masuk kembali.',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then(() => {
            router.push('/sign-in');
          });
          return;
        }
        // Display other errors using SweetAlert
        Swal.fire({
          title: 'Gagal Mengunduh',
          text: err.message || 'Terjadi kesalahan saat mencoba mengunduh laporan.',
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
      } finally {
        setIsDownloading(false);
      }
  }, [router, isDownloading, memoizedDownloadRapat, Swal]); // Added Swal to dependency array

 
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

    const result = await Swal.fire({
      title : "Apakah Anda yakin ingin menghapus rapat yang dipilih?",
      text : `Anda akan menghapus ${meetingsToDelete.length} rapat yang dipilih.`,
      icon : "warning",
      showCancelButton : true,
      confirmButtonText : "Ya, Hapus",
      cancelButtonText : "Batal",
    })  

    if (result.isConfirmed) {
      setIsLoading(true);
      setError(null);
      let successCount = 0;
      let failCount = 0;
      const failedMeetings = [];

      Swal.fire({
        title: 'Menghapus...',
        text: `Sedang memproses penghapusan ${meetingsToDelete.length} rapat.`,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
      });
      for (const meeting of meetingsToDelete) {
        try {
            const response = await fetch(`/api/meetings/${meeting.id}`, { method: 'DELETE' });
            if (response.status === 401) {
                router.push('/sign-in');
                throw new Error("Sesi tidak valid.");
            }
            if (!response.ok) {
                const errorData = await response.json();
                console.error(`Gagal menghapus rapat "${meeting.namaRapat}": ${errorData.message || response.status}`);
                failCount++;
                failedMeetings.push(meeting.namaRapat);
                continue;
            }
            successCount++;
        } catch (err) {
            console.error(`Error saat menghapus rapat "${meeting.namaRapat}":`, err);
            failCount++;
            failedMeetings.push(meeting.namaRapat);
        }
      }
      let title = "";
      let text = "";
      let icon = "info";

      if (successCount > 0 && failCount === 0) {
          title = "Berhasil!";
          text = `${successCount} rapat berhasil dihapus.`;
          icon = "success";
      } else if (successCount === 0 && failCount > 0) {
          title = "Gagal Total!";
          text = `Semua ${failCount} rapat gagal dihapus. Lihat konsol untuk detail.`;
          icon = "error";
      } else if (successCount > 0 && failCount > 0) {
          title = "Selesai dengan Catatan";
          text = `${successCount} rapat berhasil dihapus. ${failCount} rapat gagal dihapus (Lihat konsol).`;
          icon = "warning";
      } else {
          title = "Tidak Ada Perubahan";
          text = "Tidak ada rapat yang diproses.";
          icon = "info";
      }

      Swal.fire({
          title: title,
          text: text,
          icon: icon,
          confirmButtonText: 'OK'
      });

      fetchData();
      table.resetRowSelection(); 
      closeBulkActionMenu();
      setIsLoading(false);
    }
  }, [selectedRowsData, fetchData, router, table, closeBulkActionMenu]);

  const handleBulkDownloadSelected = useCallback(async () => {
    const meetingsToDownload = selectedRowsData.filter(row => row.status === "ARSIP");
    if (meetingsToDownload.length === 0) {
        Swal.fire({
          title: 'Tidak Ada Rapat Terpilih',
          text: "Tidak ada rapat berstatus ARSIP yang dipilih untuk diunduh.",
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        return;
    }

    // Jika hanya 1 file yang dipilih, gunakan handleDownloadLaporan untuk single file
    if (meetingsToDownload.length === 1) {
      const meeting = meetingsToDownload[0];
      handleDownloadLaporan(meeting.id, meeting.namaRapat);
      closeBulkActionMenu();
      table.resetRowSelection();
      return;
    }
    const result = await Swal.fire({
      title: 'Konfirmasi Unduh Massal',
      text: `Laporan untuk ${meetingsToDownload.length} rapat terpilih (status ARSIP) akan diunduh satu per satu. Lanjutkan?`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Lanjutkan',
      cancelButtonText: 'Batal'
  });

  if (result.isConfirmed) {
      setIsDownloading(true);

      // Gunakan toast untuk notifikasi awal
      const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
      });

      Toast.fire({
          icon: 'info',
          title: 'Memulai proses unduh...'
      });

      let downloadInitiated = 0;
      let downloadFailed = 0;

      for (const meeting of meetingsToDownload) {
          try {
              const blob = await memoizedDownloadRapat(meeting.id);
              downloadPdf(blob, `Notulensi_${meeting.namaRapat}.pdf`);
              downloadInitiated++;
              // Jeda singkat antar unduhan agar tidak membanjiri browser (opsional)
              await new Promise(resolve => setTimeout(resolve, 300));
          } catch (err) {
              console.error(`Error downloading report for meeting ${meeting.namaRapat}:`, err);
              downloadFailed++;
          }
      }

      setIsDownloading(false);
      table.resetRowSelection();
      closeBulkActionMenu();

      // Notifikasi akhir (opsional)
      if(downloadFailed > 0) {
           Swal.fire({
              title: 'Unduh Selesai dengan Catatan',
              text: `${downloadInitiated} laporan dimulai. ${downloadFailed} laporan gagal diunduh (lihat konsol).`,
              icon: 'warning',
              confirmButtonText: 'OK'
          });
      } else if (downloadInitiated > 0) {
          // Bisa juga menggunakan toast lagi
           Toast.fire({
              icon: 'success',
              title: `${downloadInitiated} proses unduh telah selesai.`
          });
      }
  }



    // if (window.confirm(`Laporan untuk ${meetingsToDownload.length} rapat terpilih (status ARSIP) akan diunduh satu per satu. Lanjutkan?`)) {
    //   // Aktifkan loading untuk batch download
    //   setIsDownloading(true);
      
    //   try {
    //     // No global loading for multiple downloads to keep UI responsive
    //     let downloadInitiated = 0;
    //     for (const meeting of meetingsToDownload) {
    //       // Gunakan try/catch untuk setiap download, tapi jangan tampilkan loading per item
    //       try {
    //         const blob = await memoizedDownloadRapat(meeting.id);
    //         downloadPdf(blob, `Notulensi_${meeting.namaRapat}.pdf`);
    //         downloadInitiated++;
    //       } catch (err) {
    //         console.error(`Error downloading report for meeting ${meeting.namaRapat}:`, err);
    //       }
    //     }
        
    //     if(downloadInitiated > 0) {
    //       // alert(`${downloadInitiated} proses unduh laporan telah dimulai.`);
    //     }
    //   } catch (err) {
    //     console.error("Error in bulk download:", err);
    //   } finally {
    //     setIsDownloading(false);
    //     table.resetRowSelection();
    //     closeBulkActionMenu();
    //   }
    // }
  }, [selectedRowsData, memoizedDownloadRapat, table, closeBulkActionMenu, handleDownloadLaporan]);
  // --- END BULK ACTION LOGIC ---


  return (
    <div className="w-full font-outfit bg-background-body p-5 text-text-primary">
      {error && <div className="text-red-500 dark:text-error-400 mb-4 border border-red-500 dark:border-error-500 p-2.5 rounded-md text-sm">Error: {error}</div>}

      {/* Loading spinner untuk download */}
      {isDownloading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
            <div role="status" className="mb-4">
              <svg aria-hidden="true" className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 font-medium">Sedang mengunduh dokumen...</p>
          </div>
        </div>
      )}

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
        >
          <option value="" className="bg-white  dark:bg-gray-600  text-black dark:text-white">Semua Status</option>
          <option value="AKTIF" className="bg-white  dark:bg-gray-600 text-black dark:text-white">Aktif</option>
          <option value="SELESAI" className="bg-white  dark:bg-gray-600 text-black dark:text-white">Selesai</option>
          <option value="ARSIP" className="bg-white  dark:bg-gray-600 text-black dark:text-white">Arsip</option>
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
                        className="absolute left-0 md:left-auto md:right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-border-default rounded-md shadow-lg z-[1000] min-w-[200px] py-1 max-h-[300px] overflow-y-auto"
                    >
                        {availableBulkActions.map((action) => (
                            <button
                                key={action.label}
                                type="button"
                                onClick={(e) => { 
                                    // Hentikan event propagation untuk mencegah events bubbling
                                    e.stopPropagation();
                                    // Eksekusi action item
                                    action.handler(e);
                                }}
                                className={clsx(
                                    "block w-full text-left px-3 py-2 cursor-pointer text-text-primary bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white  text-sm",
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

      {isLoading && 
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]"> {/* z-index tinggi agar di atas segalanya */}
          <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
              <div role="status" className="mb-4">
                  <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span className="sr-only">Loading...</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">Memuat...</p>
          </div>
        </div>
      }

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
              onClose={closeModal}
              className="max-w-[700px] p-6 lg:p-10 bg-white dark:bg-gray-800 rounded-lg shadow-xl"
          >
              <div className="flex flex-col px-2 overflow-y-auto max-h-[80vh] custom-scroll">
                  <div>
                      <h5 className="mb-2 text-gray-900 dark:text-white text-lg font-semibold modal-title">
                          Lengkapi Dokumen Rapat
                      </h5>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                          Untuk: <strong className="text-black dark:text-white">{rapatUntukModal.namaRapat}</strong>
                      </p>
                      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                  </div>

                  <div className="px-6 py-5 flex-grow overflow-y-auto space-y-6">
                      <div>
                          <label htmlFor="doc-notulensi" className="block text-sm font-medium text-text-secondary mb-1.5">
                              Notulensi Rapat <span className="text-red-500">*</span>
                          </label>
                          <textarea
                              id="doc-notulensi"
                              rows={5}
                              value={notulensiInput}
                              onChange={handleNotulensiChange} // <-- Gunakan handler baru
                              placeholder="Masukkan hasil notulensi rapat di sini (minimal 30 karakter)..."
                              className={clsx( // <-- Gunakan clsx untuk kelas kondisional
                                  baseInputClass,
                                  'w-full resize-y',
                                  notulensiError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500'
                              )}
                              disabled={isSubmitting}
                              required={true} // <-- Tetap ada untuk aksesibilitas & fallback
                          />
                          {/* Tampilkan pesan error dan jumlah kata */}
                          <div className="flex justify-between mt-1 text-xs">
                              {notulensiError ? (
                                  <p className="text-red-500">{notulensiError}</p>
                              ) : (
                                  <p className="text-text-tertiary">Minimal 30 karakter.</p>
                              )}
                              <p className="text-text-tertiary">{notulensiInput.length} karakter</p>
                          </div>
                      </div>
                      <div>
                          <label htmlFor="doc-file" className="block text-sm font-medium text-text-secondary mb-1.5">
                              Upload File Dokumen (Maks 6)
                          </label>
                          <input
                              id="doc-file"
                              type="file"
                              multiple
                              onChange={handleFileChange}
                              accept=".png,.jpg,.jpeg" // <-- Anda bisa tambahkan .pdf, .doc, .docx jika perlu
                              className="block w-full text-sm text-text-secondary cursor-pointer
                                  file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-brand-600 file:text-text-on-brand
                                  hover:file:bg-brand-700
                                  focus:outline-none focus:ring-1 focus:ring-border-focus"
                              disabled={isSubmitting || filesToUpload.length >= 6}
                          />
                          <p className="mt-1 text-xs text-text-tertiary">PNG & JPG (MAX. 5MB per file)</p>
                          {filesToUpload.length > 0 && (
                              <div>
                                  <div className={`mt-2 text-sm flex items-center ${filesToUpload.length > 6 ? 'text-red-500 font-semibold' : filesToUpload.length === 6 ? 'text-orange-500 font-semibold' : 'text-gray-500'}`}>
                                      File terpilih: {filesToUpload.length}/6
                                      {filesToUpload.length > 6 && (
                                          <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Melebihi batas</span>
                                      )}
                                      {filesToUpload.length === 6 && (
                                          <span className="ml-2 bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">Maksimum</span>
                                      )}
                                  </div>
                                  <ul className="mt-2 space-y-2">
                                      {filesToUpload.map((file, index) => (
                                          <li key={index} className="flex items-center gap-2 text-sm">
                                              <button
                                                  type="button"
                                                  onClick={() => handleRemoveFile(index)}
                                                  className="text-red-500 hover:text-red-700 focus:outline-none"
                                                  title="Hapus file"
                                              >
                                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                  </svg>
                                              </button>
                                              <span className="text-gray-800 dark:text-gray-200 truncate max-w-xs">
                                                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                              </span>
                                          </li>
                                      ))}
                                  </ul>
                              </div>
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
                              'px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 disabled:opacity-50'
                          )}
                      >
                          Batal
                      </button>
                      <button
                          onClick={(e) => { // <-- Modifikasi onClick
                              // Cek file dulu
                              if (filesToUpload.length > 6 || hasAttemptedOverUpload) {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  Swal.fire({
                                      title: 'Gagal!',
                                      text: `Jumlah file (${filesToUpload.length}) melebihi batas (6). Silakan kurangi jumlah file.`,
                                      icon: 'error',
                                      confirmButtonText: 'Mengerti'
                                  });
                                  if (filesToUpload.length > 6 && !hasAttemptedOverUpload) setHasAttemptedOverUpload(true);
                                  return false;
                              }

                              // Cek notulensi
                              const currentNotulensiError = validateNotulensi(notulensiInput);
                              setNotulensiError(currentNotulensiError); // Pastikan UI update

                              if (currentNotulensiError) {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  Swal.fire({
                                      title: 'Gagal!',
                                      text: currentNotulensiError,
                                      icon: 'error',
                                      confirmButtonText: 'Mengerti'
                                  });
                                  return false;
                              }
                              
                              // Jika lolos semua, simpan
                              handleSimpanDokumen();
                          }}
                          type="button"
                          // <-- Modifikasi disabled
                          disabled={
                              isSubmitting ||
                              !!notulensiError || // <-- Cek jika ada error notulensi
                              filesToUpload.length > 6 ||
                              hasAttemptedOverUpload
                          }
                          style={{ pointerEvents: (filesToUpload.length > 6 || hasAttemptedOverUpload) ? 'none' : 'auto' }}
                          className={clsx(
                              baseButtonClass,
                              'px-4 py-2 text-white rounded-md',
                              (filesToUpload.length > 6 || hasAttemptedOverUpload)
                                  ? 'bg-red-500 opacity-70 cursor-not-allowed'
                                  : (isSubmitting || !!notulensiError)
                                      ? 'bg-blue-400 opacity-50 cursor-not-allowed'
                                      : 'bg-blue-600 hover:bg-blue-700'
                          )}
                      >
                          {isSubmitting ? 'Menyimpan...' : (filesToUpload.length > 6 || hasAttemptedOverUpload) ? 'Batas File Terlampaui' : !!notulensiError ? 'Perbaiki Notulensi' : 'Simpan Dokumen'}
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
                    action: () => {
                      closeActionMenu();
                      handleLengkapiDokumenClick(activeRapatForMenu);
                    },
                    className: "menu-dropdown-item"
                });
                menuItems.push(hapusAction);
              } else if (currentStatus === "ARSIP") {
                menuItems.push({
                    label: "Download Laporan",
                    action: (e) => {
                      // Hentikan event propagation
                      e.stopPropagation();
                      // Tutup menu dan mulai download
                      closeActionMenu();
                      // Pastikan timeout kecil untuk menunggu menu benar-benar tertutup
                      setTimeout(() => {
                        handleDownloadLaporan(activeRapatForMenu?.id, activeRapatForMenu?.namaRapat);
                      }, 100);
                    },
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
                  onClick={(e) => { 
                    // Hentikan event propagation untuk mencegah events bubbling
                    e.stopPropagation();
                    // Eksekusi action item
                    item.action(e);
                  }}
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