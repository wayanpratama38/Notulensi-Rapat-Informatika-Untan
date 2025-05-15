"use client";
import React, { useRef, useEffect } from 'react';

const CustomDatePicker = ({ value, onChange, idPrefix = "date" }) => {
  const inputRef = useRef(null);

  // Force the date picker popup to open upwards
  useEffect(() => {
    if (inputRef.current) {
      // Override the showPicker method to position the popup above the input
      const originalShowPicker = inputRef.current.showPicker;
      
      if (originalShowPicker) {
        inputRef.current.showPicker = function() {
          // Apply a CSS class to make it open upwards when clicked
          document.documentElement.style.setProperty(
            '--opener-top', 
            `${inputRef.current.getBoundingClientRect().top}px`
          );
          document.documentElement.style.setProperty(
            '--opener-left', 
            `${inputRef.current.getBoundingClientRect().left + (inputRef.current.offsetWidth / 2)}px`
          );
          document.documentElement.classList.add('date-picker-open-up');
          
          // Call the original method
          originalShowPicker.call(this);
          
          // Set up a one-time click handler to remove the class
          const cleanup = () => {
            document.documentElement.classList.remove('date-picker-open-up');
            document.removeEventListener('click', cleanup);
          };
          
          setTimeout(() => {
            document.addEventListener('click', cleanup, { once: true });
          }, 100);
        };
      }
    }
  }, []);

  return (
    <input
      ref={inputRef}
      id={`${idPrefix}-picker`}
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="modal-input h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
    />
  );
};

export default CustomDatePicker; 