"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Swal from 'sweetalert2';

const Dropdown = ({ isOpen, onClose, children, className }) => { 
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;
        function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            onClose();
        }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    if (!isOpen) return null;
    return (
        <div ref={dropdownRef} className={`${className} z-50`}>
          {children}
        </div>
    );
};

export default function UserDropdown() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const { isOpen: isPasswordModalOpen, openModal: openPasswordModal, closeModal: closePasswordModal } = useModal();

  function toggleDropdown(e) {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    closeDropdown();
    
    // Reset form state
    setFormData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setError(null);
    setSuccess(null);
    
    // Open modal
    openPasswordModal();
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Data Belum Lengkap',
        text: 'Semua field harus diisi',
        confirmButtonColor: '#3085d6',
      });
      return;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Password Tidak Cocok',
        text: 'Password baru dan konfirmasi password tidak cocok',
        confirmButtonColor: '#3085d6',
      });
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Get current user ID first
      const userResponse = await fetch('/api/users/me');
      
      if (!userResponse.ok) {
        throw new Error("Gagal mendapatkan data pengguna");
      }
      
      const userData = await userResponse.json();
      
      // Update password
      const response = await fetch(`/api/users/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          password: formData.newPassword
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal mengubah password");
      }
      
      closePasswordModal();
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Password berhasil diubah',
        confirmButtonColor: '#3085d6',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Terjadi Kesalahan',
        text: error.message,
        confirmButtonColor: '#3085d6',
      });
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    closeDropdown();
    
    Swal.fire({
      title: 'Konfirmasi Keluar',
      text: 'Apakah Anda yakin ingin keluar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, keluar!',
      cancelButtonText: 'Batal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Berhasil Keluar',
              text: 'Anda telah keluar dari sistem',
              confirmButtonColor: '#3085d6',
              timer: 1500,
              showConfirmButton: false
            });
            setTimeout(() => {
              router.push('/sign-in');
              router.refresh();
            }, 1500);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Terjadi Kesalahan',
              text: 'Gagal melakukan logout',
              confirmButtonColor: '#3085d6',
            });
          }
        } catch (error) {
          console.error("Error signing out:", error);
          Swal.fire({
            icon: 'error',
            title: 'Terjadi Kesalahan',
            text: 'Gagal melakukan logout',
            confirmButtonColor: '#3085d6',
          });
          router.push('/sign-in');
        }
      }
    });
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dark:text-gray-400 dropdown-toggle"
      >
        <svg
          className={`ml-1 h-5 w-5 stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${ // Sesuaikan styling SVG
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20" 
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5" 
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
      
        className="absolute right-0 mt-2 w-64 origin-top-right rounded-xl border border-gray-200 bg-white p-2.5 shadow-xl dark:border-gray-700 dark:bg-gray-800 z-50" // mt-2, w-64, origin-top-right, p-2.5 ditambahkan/disesuaikan
      >
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2 mt-2 text-sm font-medium text-red-600 rounded-md group hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-500/20 dark:hover:text-red-300 w-full text-left"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Sign out
        </button>
        <button
          onClick={handleChangePassword}
          className="flex items-center gap-3 px-3 py-2 mt-2 text-sm font-medium text-black rounded-md group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-100 dark:hover:text-black w-full text-left"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          Ganti Password
        </button>
      </Dropdown>
      
      {/* Password Change Modal */}
      <Modal 
        isOpen={isPasswordModalOpen} 
        closeModal={closePasswordModal}
        title="Ganti Password"
        className="relative w-full max-w-md mx-auto rounded-lg bg-white p-6 shadow-lg border dark:border-gray-700 dark:bg-gray-800"
      >
        <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-4">
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="p-3 bg-green-100 text-green-700 rounded-md text-sm">
              {success}
            </div>
          )}
          
          <div>
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password Lama
            </label>
            <div className="mt-1">
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleInputChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password Baru
            </label>
            <div className="mt-1">
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Konfirmasi Password Baru
            </label>
            <div className="mt-1">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
          </div>
          
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={closePasswordModal}
              className="mr-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}