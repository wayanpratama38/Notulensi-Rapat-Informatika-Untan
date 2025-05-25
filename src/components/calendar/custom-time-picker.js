// src/components/calendar/CustomTimePicker.js
"use client";
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

const CustomTimePicker = ({ value, onChange, idPrefix = "time", error = false }) => {
  // Hanya state untuk nilai input
  const [inputValue, setInputValue] = useState('00:00');
  const inputRef = useRef(null);

  // Fungsi untuk memvalidasi dan memformat waktu HH:MM
  const formatAndValidateTime = (val) => {
    // 1. Ambil hanya digit, batasi hingga 4
    let digits = val.replace(/\D/g, '');
    if (digits.length > 4) {
      digits = digits.slice(0, 4);
    }

    // 2. Format menjadi HH:MM jika memungkinkan
    let formattedValue = '';
    if (digits.length > 2) {
      formattedValue = `${digits.slice(0, 2)}:${digits.slice(2)}`;
    } else {
      formattedValue = digits;
    }

    // 3. Validasi saat format penuh (HH:MM)
    let finalTime = formattedValue;
    if (formattedValue.length === 5) {
        let [h, m] = formattedValue.split(':');
        let hourNum = parseInt(h, 10);
        let minuteNum = parseInt(m, 10);

        // Validasi jam (0-23)
        if (hourNum > 23) hourNum = 23;
        // Validasi menit (0-59)
        if (minuteNum > 59) minuteNum = 59;

        finalTime = `${hourNum.toString().padStart(2, '0')}:${minuteNum.toString().padStart(2, '0')}`;
    }
    
    return finalTime;
  };

  // Fungsi untuk memvalidasi penuh saat blur atau enter
  const finalizeTime = (val) => {
      let [h, m] = val.split(':');

      // Jika format tidak lengkap, coba lengkapi atau default
      if (!m) {
          const digits = val.replace(/\D/g, '');
          h = digits.slice(0, 2) || '00';
          m = digits.slice(2, 4) || '00';
      }

      let hourNum = parseInt(h, 10);
      let minuteNum = parseInt(m, 10);

      if (isNaN(hourNum) || hourNum < 0 || hourNum > 23) hourNum = 0;
      if (isNaN(minuteNum) || minuteNum < 0 || minuteNum > 59) minuteNum = 0;

      const finalTime = `${hourNum.toString().padStart(2, '0')}:${minuteNum.toString().padStart(2, '0')}`;
      
      setInputValue(finalTime);
      onChange(finalTime); // Kirim waktu yang sudah valid ke parent
  }

  // Sync state internal dengan prop 'value'
  useEffect(() => {
    if (value && /^\d{2}:\d{2}$/.test(value)) {
      setInputValue(value);
    } else {
      // Jika value tidak valid, set ke 00:00 atau nilai default lain
      setInputValue('00:00');
    }
  }, [value]);

  // Handle Input Change untuk auto-formatting
  const handleInputChange = (e) => {
    const formatted = formatAndValidateTime(e.target.value);
    setInputValue(formatted);

    // Jika sudah format HH:MM, langsung panggil onChange
    if (formatted.length === 5) {
        onChange(formatted);
    }
  };

  // Handle Input Blur untuk validasi akhir
  const handleInputBlur = (e) => {
    finalizeTime(e.target.value);
  };

  // Handle Key Down (Enter untuk validasi)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      finalizeTime(inputValue);
      inputRef.current?.blur(); // Pindahkan fokus
      e.preventDefault(); // Cegah submit form jika ada
    }
  };

  return (
    // Hanya wrapper dan input
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text" // Gunakan text untuk kontrol penuh
          id={`${idPrefix}-input`}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          placeholder="HH:MM"
          maxLength={5} // Batasi panjang input menjadi HH:MM
          className={clsx(
            "modal-input h-11 w-full rounded-lg border bg-gray-50 dark:bg-gray-700 pl-4 pr-10 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-1 outline-none",
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
          )}
        />
        {/* Ikon jam bisa tetap ada untuk visual */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">WIB</span>
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
      </div>
    </div>
  );
};

export default CustomTimePicker;