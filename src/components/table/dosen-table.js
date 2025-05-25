"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
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
import useDebounce from '@/hooks/useDebounce';
import { fetchDosen, createDosen, updateDosen, deleteDosen } from '@/services/dosenService';
import Image from "next/image";


const isValidName = (name) => {
  if (!name || !name.trim()) return false;
  const nameRegex = /^(?=.*[a-zA-Z])[a-zA-Z\s.'-,]+$/;
  return nameRegex.test(name.trim());
};


const isValidEmail = (email) => {
  if (!email || !email.trim()) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};


const isValidPassword = (password) => {
    return password && password.length >= 8;
};


export function DataTableDosen() {
  const router = useRouter();
  const { isOpen, openModal, closeModal: closeModalHook } = useModal();
  const { isOpen: isEditModalOpen, openModal: openEditModal, closeModal: closeEditModalHook } = useModal();


  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [activeActionMenuId, setActiveActionMenuId] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const [activeDosenForMenu, setActiveDosenForMenu] = useState(null);
  const [dosenUntukModal, setDosenUntukModal] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchInput = useDebounce(searchInput, 300);

  // Form State
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    tandaTangan: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


  const currentActionButtonRef = useRef(null);
  const actionMenuRef = useRef(null);
  const fileInputRef = useRef(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchDosen();
      setTableData(data);
    } catch (err) {
      console.error("Fetch data error:", err);
      setError(err.message);
      setTableData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);


  useEffect(() => {
    if (debouncedSearchInput.trim() !== "") {
      setColumnFilters([{ id: 'nama', value: debouncedSearchInput }]);
    } else {
      setColumnFilters([]);
    }
  }, [debouncedSearchInput]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const closeActionMenu = useCallback(() => {
    setActiveActionMenuId(null);
    setActiveDosenForMenu(null);
    setMenuPosition(null);
    currentActionButtonRef.current = null;
  }, []);


  const calculateMenuPosition = useCallback((targetElement) => {
    if (!targetElement) return null;
    const rect = targetElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const distanceFromRight = viewportWidth - rect.right;

    if (distanceFromRight < 160) {
      return {
        top: rect.bottom + window.scrollY + 4,
        right: distanceFromRight
      };
    }

    return {
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX
    };
  }, []);


  const openActionMenu = useCallback((row, targetElement) => {
    const actualDosenData = row.original;
    if (!actualDosenData || !targetElement) {
      console.error("Missing actualDosenData or targetElement in openActionMenu");
      return;
    }
    setActiveActionMenuId(actualDosenData?.id || null);
    setActiveDosenForMenu(actualDosenData);
    setMenuPosition(calculateMenuPosition(targetElement));
    currentActionButtonRef.current = targetElement;
  }, [calculateMenuPosition]);


  const closeModal = useCallback(() => {
    closeModalHook();
    setFormData({ nama: "", email: "", password: "", tandaTangan: null });
    setError(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  }, [closeModalHook]);

  const closeEditModal = useCallback(() => {
    closeEditModalHook();
    setDosenUntukModal(null);
    setFormData({ nama: "", email: "", password: "", tandaTangan: null });
    setError(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  }, [closeEditModalHook]);


  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, tandaTangan: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
       setFormData(prev => ({ ...prev, tandaTangan: dosenUntukModal ? dosenUntukModal.tandaTangan : null }));
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); 

   
    if (!formData.nama.trim() || !formData.email.trim() || !formData.password.trim() || !formData.tandaTangan) {
        Swal.fire({ icon: 'warning', title: 'Data Belum Lengkap', text: 'Nama, email, password, dan tanda tangan wajib diisi.' });
        return;
    }
    if (!isValidName(formData.nama)) {
        Swal.fire({ icon: 'warning', title: 'Nama Tidak Valid', text: 'Nama dosen hanya boleh berisi huruf, spasi, titik, apostrof, atau strip.' });
        return;
    }
    if (!isValidEmail(formData.email)) {
        Swal.fire({ icon: 'warning', title: 'Email Tidak Valid', text: 'Silakan masukkan alamat email yang valid.' });
        return;
    }
    if (!isValidPassword(formData.password)) {
        Swal.fire({ icon: 'warning', title: 'Password Terlalu Pendek', text: 'Password minimal harus 8 karakter.' });
        return;
    }
    
    const trimmedName = formData.nama.trim();
    const trimmedEmail = formData.email.trim();
    const lowerCaseName = trimmedName.toLowerCase();
    const lowerCaseEmail = trimmedEmail.toLowerCase();

    if (tableData.some(dosen => dosen.nama.trim().toLowerCase() === lowerCaseName)) {
      Swal.fire({ icon: 'warning', title: 'Nama Sudah Ada', text: 'Nama dosen yang Anda masukkan sudah terdaftar. Silakan gunakan nama lain.' });
      return; 
    }

    if (tableData.some(dosen => dosen.email.trim().toLowerCase() === lowerCaseEmail)) {
      Swal.fire({ icon: 'warning', title: 'Email Sudah Ada', text: 'Email yang Anda masukkan sudah terdaftar. Silakan gunakan email lain.' });
      return; 
    }


    setIsSubmitting(true);
    setError(null);

    try {
      await createDosen(formData);
      closeModal();
      fetchData();
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: `Dosen "${formData.nama}" berhasil ditambahkan!`,
      });
    } catch (err) {
      
      const errorMessage = err.message ? err.message.toLowerCase() : "";

      if (errorMessage.includes("email sudah digunakan")) {
          Swal.fire({
              icon: 'warning',
              title: 'Email Sudah Terdaftar',
              text: 'Email yang Anda masukkan sudah digunakan. Silakan gunakan email lain.',
          });
          setError('Email sudah digunakan.');
      } else if (errorMessage.includes("nama sudah digunakan")) {
          Swal.fire({
              icon: 'warning',
              title: 'Nama Sudah Terdaftar',
              text: 'Nama dosen yang Anda masukkan sudah digunakan. Silakan gunakan nama yang berbeda.',
          });
          setError('Nama sudah digunakan.');
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Terjadi Kesalahan',
              text: err.message || "Gagal menambahkan dosen.",
          });
          setError(err.message || "Gagal menambahkan dosen.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleEditClick = useCallback((dosenData) => {
    setDosenUntukModal(dosenData);
    setFormData({
      nama: dosenData.nama || "",
      email: dosenData.email || "",
      password: "",
      tandaTangan: dosenData.tandaTangan || null
    });
    openEditModal();
    closeActionMenu();
  }, [openEditModal, closeActionMenu]);


  const handleUpdate = async (e) => {
    e.preventDefault(); 
 

   
    if (!dosenUntukModal?.id) {
        Swal.fire({ icon: 'error', title: 'Kesalahan', text: 'ID Dosen tidak ditemukan.' });
        return;
    }
     if (!formData.nama.trim() || !formData.email.trim()) {
        Swal.fire({ icon: 'warning', title: 'Data Belum Lengkap', text: 'Nama dan email wajib diisi.' });
        return;
    }
    if (!isValidName(formData.nama)) {
        Swal.fire({ icon: 'warning', title: 'Nama Tidak Valid', text: 'Nama dosen hanya boleh berisi huruf, spasi, titik, apostrof, atau strip.' });
        return;
    }
    if (!isValidEmail(formData.email)) {
        Swal.fire({ icon: 'warning', title: 'Email Tidak Valid', text: 'Silakan masukkan alamat email yang valid.' });
        return;
    }
    if (formData.password && !isValidPassword(formData.password)) {
        Swal.fire({ icon: 'warning', title: 'Password Terlalu Pendek', text: 'Jika ingin mengubah password, minimal harus 8 karakter.' });
        return;
    }
 

    const trimmedName = formData.nama.trim();
    const trimmedEmail = formData.email.trim();
    const lowerCaseName = trimmedName.toLowerCase();
    const lowerCaseEmail = trimmedEmail.toLowerCase();
    const currentId = dosenUntukModal.id;

    if (tableData.some(dosen => dosen.id !== currentId && dosen.nama.trim().toLowerCase() === lowerCaseName)) {
      Swal.fire({ icon: 'warning', title: 'Nama Sudah Ada', text: 'Nama dosen yang Anda masukkan sudah digunakan oleh dosen lain.' });
      return;
    }

    if (tableData.some(dosen => dosen.id !== currentId && dosen.email.trim().toLowerCase() === lowerCaseEmail)) {
      Swal.fire({ icon: 'warning', title: 'Email Sudah Ada', text: 'Email yang Anda masukkan sudah digunakan oleh dosen lain.' });
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const dataToUpdate = {
      nama: formData.nama,
      email: formData.email,
      tandaTangan: formData.tandaTangan
    };

    if (formData.password) {
      dataToUpdate.password = formData.password;
    }

    try {
      await updateDosen(dosenUntukModal.id, dataToUpdate);
      closeEditModal();
      fetchData();
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: `Data dosen "${formData.nama}" berhasil diperbarui!`,
      });
    } catch (err) {
      
      const errorMessage = err.message ? err.message.toLowerCase() : "";

      if (errorMessage.includes("email sudah digunakan")) {
          Swal.fire({
              icon: 'warning',
              title: 'Email Sudah Terdaftar',
              text: 'Email yang Anda masukkan sudah digunakan. Silakan gunakan email lain.',
          });
          setError('Email sudah digunakan.');
      } else if (errorMessage.includes("nama sudah digunakan")) {
          Swal.fire({
              icon: 'warning',
              title: 'Nama Sudah Terdaftar',
              text: 'Nama dosen yang Anda masukkan sudah digunakan. Silakan gunakan nama yang berbeda.',
          });
          setError('Nama sudah digunakan.');
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Terjadi Kesalahan',
              text: err.message || "Gagal memperbarui data dosen.",
          });
          setError(err.message || "Gagal memperbarui data dosen.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleDelete = useCallback(async (id, nama) => {
    if (!id) return;

    Swal.fire({
      title: 'Konfirmasi Hapus',
      text: `Apakah Anda yakin ingin menghapus dosen "${nama}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        setError(null);
        try {
          await deleteDosen(id);
          Swal.fire({
            icon: 'success',
            title: 'Berhasil Dihapus',
            text: `Dosen "${nama}" berhasil dihapus.`,
          });
          fetchData();
          closeActionMenu();
        } catch (err) {
          if (err.message === "Unauthorized") {
            router.push('/sign-in');
            return;
          }
          Swal.fire({
            icon: 'error',
            title: 'Terjadi Kesalahan',
            text: `Error: ${err.message}`,
          });
        } finally {
          setIsLoading(false);
        }
      }
    });
  }, [fetchData, router, closeActionMenu]);



  useEffect(() => {
    function handleClickOutside(event) {
      if (
        activeActionMenuId &&
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target) &&
        currentActionButtonRef.current &&
        !currentActionButtonRef.current.contains(event.target)
      ) {
        closeActionMenu();
      }
    }
    if (activeActionMenuId) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeActionMenuId, closeActionMenu]);


   const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <div className="px-1">
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="px-1">
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="line-clamp-1">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "nama",
      header: "Nama",
      cell: ({ row }) => <div className="font-medium">{row.getValue("nama")}</div>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="relative">
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center rounded-md text-text-secondary hover:text-text-primary transition-colors"
            onClick={(e) => {
              if (activeActionMenuId === row.original.id) {
                closeActionMenu();
              } else {
                openActionMenu(row, e.currentTarget);
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
          </button>
        </div>
      ),
    },
  ];

 
  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: false,
  });

  return (
    <div className="w-full">
      {/* ... (Header: Search & Button tetap sama) ... */}
       <div className="flex items-center mb-5 gap-3 flex-wrap">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Filter nama dosen..."
            className="flex-grow min-w-[200px] px-3 py-2 border border-border-default rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
          <button
            type="button"
            onClick={openModal}
            className="h-10 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
          >
            Tambah Dosen
          </button>
      </div>

     

      {/* ... (Table & Loading tetap sama) ... */}
        {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]">
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
      ) : (
        <div className="overflow-x-auto border border-border-default rounded-lg">
        <table className="w-full border-collapse">
            <thead>
            <tr>
                <th className="px-4 py-3 text-left w-10 border-b border-border-default">
                <input
                    type="checkbox"
                    checked={table.getIsAllRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                      className="h-4 w-4 rounded"
                />
                </th>
                <th
                    className="px-4 py-3 text-left cursor-pointer border-b border-border-default"
                    onClick={() => {
                      table.getHeaderGroups()[0].headers[2].column.toggleSorting();
                    }}
                >
                <div className="flex items-center gap-1">
                    Nama Dosen
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                </div>
                </th>
                <th
                    className="px-4 py-3 text-left cursor-pointer border-b border-border-default"
                    onClick={() => {
                      table.getHeaderGroups()[0].headers[1].column.toggleSorting();
                    }}
                >
                <div className="flex items-center gap-1">
                    Email
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                </div>
                </th>
                  <th className="px-4 py-3 text-center border-b border-border-default"></th>
            </tr>
            </thead>
            <tbody>
              {tableData.length === 0 ? (
              <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-400">
                  Tidak ada data dosen
                  </td>
              </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="border-b border-border-default hover:bg-gray-100/10">
                    <td className="px-4 py-3 w-10">
                      <input
                          type="checkbox"
                          checked={row.getIsSelected()}
                          onChange={row.getToggleSelectedHandler()}
                            className="h-4 w-4 rounded"
                      />
                    </td>
                      <td className="px-4 py-3 font-medium">{row.getValue("nama")}</td>
                      <td className="px-4 py-3 line-clamp-1">{row.getValue("email")}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="relative inline-block">
                          <button
                            type="button"
                              className="w-8 h-8 flex items-center justify-center rounded-md text-gray-400 hover:text-blue-500 transition-colors"
                            onClick={(e) => {
                              if (activeActionMenuId === row.original.id) {
                                closeActionMenu();
                              } else {
                                openActionMenu(row, e.currentTarget);
                              }
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                            </svg>
                          </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
        </table>
      </div>
      )}


     
       {tableData.length > 0 && (
        <div className="flex items-center justify-between pt-5 text-sm flex-wrap gap-y-3">
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
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  if (page >= 0 && page < table.getPageCount()) {
                    table.setPageIndex(page);
                  }
                }}
                className="w-16 border border-border-default rounded-md p-1"
              />
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="w-8 h-8 flex items-center justify-center border border-border-default rounded-md"
                title="First Page"
              >
                {'<<'}
              </button>
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="w-8 h-8 flex items-center justify-center border border-border-default rounded-md"
                title="Previous Page"
              >
                {'<'}
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="w-8 h-8 flex items-center justify-center border border-border-default rounded-md"
                title="Next Page"
              >
                {'>'}
              </button>
              <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="w-8 h-8 flex items-center justify-center border border-border-default rounded-md"
                title="Last Page"
              >
                {'>>'}
              </button>
            </div>
            <select
              value={table.getState().pagination.pageSize}
              onChange={e => { table.setPageSize(Number(e.target.value)) }}
              className="border border-border-default rounded-md p-1"
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Tampil {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}


      {/* Add Dosen Modal */}
      {isOpen && (
        <Modal isOpen={isOpen} closeModal={closeModal} className="max-w-[700px] p-6 lg:p-10 bg-white dark:bg-gray-800 rounded-lg shadow-xl" title="Tambah Dosen">
        
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nama" className="modal-label mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Nama Dosen
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                className="modal-input h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                required 
              />
            </div>
            <div>
              <label htmlFor="email" className="modal-label mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="modal-input h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="modal-label mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Password (Min. 8 Karakter)
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="modal-input h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                required 
              />
            </div>
            <div>
              <label className="modal-label mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Tanda Tangan Dosen (Wajib)
              </label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="modal-input h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                required 
              />
              {formData.tandaTangan && (
                <div className="mt-2">
                  <Image
                    src={formData.tandaTangan}
                    width={"100"}
                    height={"100"}
                    alt="Tanda Tangan Preview"
                    className="h-24 object-contain border border-gray-600 rounded-md"
                  />
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600"
              >
                Batal
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Dosen Modal */}
      {isEditModalOpen && dosenUntukModal && (
        <Modal isOpen={isEditModalOpen} closeModal={closeEditModal} className={"max-w-[700px] p-6 lg:p-10 bg-white dark:bg-gray-800 rounded-lg shadow-xl"} title="Edit Dosen">
         
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label htmlFor="edit-nama" className="modal-label mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Nama Dosen
              </label>
              <input
                type="text"
                id="edit-nama"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                className="modal-input h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                required 
              />
            </div>
            <div>
              <label htmlFor="edit-email" className="modal-label mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Email
              </label>
              <input
                type="email"
                id="edit-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="modal-input h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                required 
              />
            </div>
            <div>
              <label htmlFor="edit-password" className="modal-label mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Password (kosongkan jika tidak ingin mengubah, min. 8 karakter jika diisi)
              </label>
              <input
                type="password"
                id="edit-password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="modal-input h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="modal-label mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Tanda Tangan Dosen
              </label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="modal-input h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
              {formData.tandaTangan && (
                <div className="mt-2">
                  <Image
                    src={formData.tandaTangan}
                    width={"100"}
                    height={"100"}
                    alt="Tanda Tangan Preview"
                    className="h-24 object-contain border border-gray-600 rounded-md"
                  />
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={closeEditModal}
                className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </Modal>
      )}

     
       {activeActionMenuId && menuPosition && (
        <div
          ref={actionMenuRef}
          className="absolute z-10 min-w-[160px] bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 rounded-md shadow-lg py-1"
          style={menuPosition.right ?
            { top: menuPosition.top, right: menuPosition.right } :
            { top: menuPosition.top, left: menuPosition.left }
          }
        >
          <button
            type="button"
            className="w-full text-left dark:text-gray-100 dark:hover:bg-gray-700 px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
            onClick={() => handleEditClick(activeDosenForMenu)}
          >
            Edit
          </button>
          <button
            type="button"
            className="w-full text-left dark:hover:bg-red-50 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            onClick={() => handleDelete(activeDosenForMenu.id, activeDosenForMenu.nama)}
          >
            Hapus
          </button>
        </div>
      )}
    </div>
  );
}

