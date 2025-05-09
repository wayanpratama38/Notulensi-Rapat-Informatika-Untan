// src/components/ui/UserDropdown.js (atau path yang sesuai)
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';

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

  useEffect(() => {
    const fetchCurrentUser = async () => {
      setIsLoadingUser(true);
      try {
        const response = await fetch('/api/users/me'); 

        if (response.status === 401) { 
          setUserData(null);
          console.log("UserDropdown: Not authenticated, no user data fetched.");
          return;
        }
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Gagal mengambil data pengguna');
        }
        const data = await response.json();
        setUserData(data);
        console.log("UserDropdown: User data fetched", data);
      } catch (error) {
        console.error("UserDropdown: Error fetching current user:", error);
        setUserData(null);
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
      // Panggil API logout internal Anda yang menghapus cookie 'authToken'
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (!response.ok) {
          console.error("Logout failed on server");
      }
    } catch (error) {
        console.error("Error calling logout API:", error);
    }
    // Setelah API logout dipanggil (atau bahkan jika gagal, frontend tetap coba redirect)
    router.push('/sign-in'); // Arahkan ke sign-in
    router.refresh(); // Penting untuk membersihkan state sisi server/cache
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
  const userImage = "/images/user-icon.png"; // Gunakan gambar statis atau default

  return (
    // <div className="relative">
    //   <button
    //     onClick={toggleDropdown}
    //     className="flex items-center text-gray-700 dark:text-gray-400 dropdown-toggle"
    //     aria-expanded={isOpen}
    //     aria-haspopup="true"
    //   >
    //     <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
    //       <Image
    //         width={44}
    //         height={44}
    //         src={userImage} // Gambar dari state userData jika ada, atau default
    //         alt="User Avatar"
    //         className="object-cover"
    //       />
    //     </span>
    //     <span className="hidden sm:block mr-1 font-medium text-theme-sm text-gray-900 dark:text-gray-200">
    //       {userName.split(' ')[0]}
    //     </span>
    //     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 8 8"><path fill="currentColor" d="m0 2l4 4l4-4z"/></svg>
    //   </button>


    //     <Dropdown
    //     isOpen={isOpen}
    //     onClose={closeDropdown}
    //     // Pastikan kelas ini sudah benar dan mengatur z-index
    //     className="absolute right-0 mt-2 w-64 origin-top-right rounded-xl border border-gray-200 bg-white p-2.5 shadow-xl dark:border-gray-700 dark:bg-gray-800 z-50" // mt-2, w-64, origin-top-right, p-2.5 ditambahkan/disesuaikan
    //   >
    //     {/* Informasi Pengguna */}
    //     <div className="px-2 py-1.5 mb-2 border-b border-gray-200 dark:border-gray-700">
    //       <span className="block font-semibold text-sm text-gray-800 dark:text-gray-100">
    //         {userData?.nama || "Nama Pengguna"}
    //       </span>
    //       <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">
    //         {userData?.email || "email@contoh.com"}
    //       </span>
    //     </div>

    //     {/* Menu Items */}
    //     <ul className="flex flex-col gap-0.5"> {/* Kurangi gap */}
    //       <li>
    //         <DropdownItem
    //           onItemClick={closeDropdown}
    //           tag="a"
    //           href="/profile"
    //           className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md group hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100"
    //         >
    //           {/* SVG Edit Profile (pastikan fill/stroke currentColor atau sesuai tema) */}
    //           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" /* ... */>...</svg>
    //           Edit Profile
    //         </DropdownItem>
    //       </li>
    //       <li>
    //         <DropdownItem
    //           onItemClick={closeDropdown}
    //           tag="a"
    //           href="/settings"
    //           className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md group hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100"
    //         >
    //            {/* SVG Account Settings */}
    //           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" /* ... */>...</svg>
    //           Account Settings
    //         </DropdownItem>
    //       </li>
    //     </ul>

    //     {/* Tombol Sign Out */}
    //     <button
    //       onClick={handleSignOut}
    //       className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-red-600 rounded-lg group text-theme-sm hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-500/20 dark:hover:text-red-300 w-full text-left"
    //     >
    //       {/* ... SVG Sign Out ... */} Sign out
    //     </button>
    //   </Dropdown>
    // </div>
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
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/profile"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md group hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100"
            >
              {/* SVG Edit Profile (pastikan fill/stroke currentColor atau sesuai tema) */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" /* ... */>...</svg>
              Edit Profile
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/settings"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md group hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100"
            >
               {/* SVG Account Settings */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" /* ... */>...</svg>
              Account Settings
            </DropdownItem>
          </li>
        </ul>

        {/* Tombol Sign Out */}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2 mt-2 text-sm font-medium text-red-600 rounded-md group hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-500/20 dark:hover:text-red-300 w-full text-left"
        >
           {/* SVG Sign Out */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" /* ... */>...</svg>
          Sign out
        </button>
      </Dropdown>
    </div>
  );
}