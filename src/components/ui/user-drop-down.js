// src/components/ui/UserDropdown.js (atau path yang sesuai)
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import { signOut } from "@/lib/auth";

// --- Placeholder untuk Komponen Dropdown dan DropdownItem (Sama seperti sebelumnya) ---
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
        // Pastikan className ini atau style internal Dropdown mengatur z-index
        // Contoh: tambahkan 'z-50' jika belum ada
        <div ref={dropdownRef} className={`${className} z-50`}> {/* Tambahkan z-50 di sini jika perlu */}
        {children}
        </div>
    );
};

const DropdownItem = ({ onItemClick, tag = "button", href, children, className }) => { /* ... implementasi ... */ };
// --- AKHIR Placeholder Komponen Dropdown ---

export default function UserDropdown() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null); // State untuk data user dari API /api/users/me
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // Hardcoded user data untuk debugging
  const debugUser = {
    id: "temp-user-id",
    nama: "User",
    email: "d1041221053@student.untan.ac.id",
    role: "DOSEN",
    image: null
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      setIsLoadingUser(true);
      try {
        // Gunakan email dari Google auth yang sudah berhasil login
        const response = await fetch('/api/users/me?email=d1041221054@student.untan.ac.id');

        if (response.status === 401) { 
          setUserData(null);
          console.log("UserDropdown: Not authenticated, no user data fetched.");
          return;
        }
        
        if (!response.ok) {
          // Jika gagal, gunakan data debug sementara
          console.log("Using debug user data");
          setUserData(debugUser);
          return;
        }
        
        // Parse response sebagai JSON
        try {
          const data = await response.json();
          setUserData(data);
          console.log("UserDropdown: User data fetched", data);
        } catch (e) {
          console.error("Failed to parse JSON response:", e);
          setUserData(debugUser);
        }
      } catch (error) {
        console.error("UserDropdown: Error fetching current user:", error);
        // Gunakan data debug saat terjadi error
        setUserData(debugUser);
      } finally {
        setIsLoadingUser(false);
      }
    };
    fetchCurrentUser();
  }, []); // Fetch sekali saat komponen mount

  function toggleDropdown(e) {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleSignOut = async () => {
    closeDropdown();
    try {
      // Gunakan signOut dari NextAuth
      await signOut({ redirect: false });
      router.push('/sign-in');
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
      router.push('/sign-in');
    }
  };

  if (isLoadingUser) {
    return (
      // UI Loading sederhana
      <div className="relative">
        <div className="flex items-center text-gray-700 dark:text-gray-400 animate-pulse">
          <span className="mr-3 overflow-hidden rounded-full h-11 w-11 bg-gray-300 dark:bg-gray-700"></span>
          <span className="block mr-1 h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></span>
        </div>
      </div>
    );
  }

  // Jika tidak ada data user (misal setelah error atau status 401)
  if (!userData) {
    // Tampilkan tombol Sign In jika user tidak ada (atau null jika ingin disembunyikan)
    return (
      <Link href="/sign-in" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2">
        Sign In
      </Link>
    );
  }

  // Jika ada data user, tampilkan dropdown
  const userName = userData.nama || "Pengguna";
  const userEmail = userData.email || "email@example.com";
  // Asumsi Anda tidak menyimpan 'image' di tabel User atau tidak mengirimnya dari /api/users/me
  const userImage = userData.image || "/images/user-icon.png"; // Gunakan gambar statis atau default

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dark:text-gray-400 dropdown-toggle"
        // ... (aria attributes) ...
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <Image
            width={44}
            height={44}
            src={userImage}
            alt="User Avatar"
            className="object-cover"
          />
        </span>
        <span className="hidden sm:block mr-1 font-medium text-sm text-gray-900 dark:text-gray-200">
          {/* Tampilkan nama user dari userData */}
          {(userData?.nama || "User").split(' ')[0]}
        </span>
        <svg
          className={`ml-1 h-5 w-5 stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${ // Sesuaikan styling SVG
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20" /* Ganti viewBox jika menggunakan SVG berbeda */
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5" // Contoh ikon panah sederhana
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
        // Pastikan kelas ini sudah benar dan mengatur z-index
        className="absolute right-0 mt-2 w-64 origin-top-right rounded-xl border border-gray-200 bg-white p-2.5 shadow-xl dark:border-gray-700 dark:bg-gray-800 z-50" // mt-2, w-64, origin-top-right, p-2.5 ditambahkan/disesuaikan
      >
        {/* Informasi Pengguna */}
        <div className="px-2 py-1.5 mb-2 border-b border-gray-200 dark:border-gray-700">
          <span className="block font-semibold text-sm text-gray-800 dark:text-gray-100">
            {userData?.nama || "Nama Pengguna"}
          </span>
          <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">
            {userData?.email || "email@contoh.com"}
          </span>
        </div>

        {/* Menu Items */}
        <ul className="flex flex-col gap-0.5"> {/* Kurangi gap */}
          <li>
            <Link
              href="/profile"
              onClick={closeDropdown}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md group hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100"
            >
              {/* SVG Edit Profile */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              Edit Profile
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              onClick={closeDropdown}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md group hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100"
            >
              {/* SVG Account Settings */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              Account Settings
            </Link>
          </li>
        </ul>

        {/* Tombol Sign Out */}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2 mt-2 text-sm font-medium text-red-600 rounded-md group hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-500/20 dark:hover:text-red-300 w-full text-left"
        >
          {/* SVG Sign Out */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Sign out
        </button>
      </Dropdown>
    </div>
  );
}