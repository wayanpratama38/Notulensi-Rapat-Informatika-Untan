// src/components/calendar/CustomTimePicker.js
"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import clsx from 'clsx';

// Helper to generate options
const generateOptions = (max, pad = 2, step = 1) => {
  const options = [];
  for (let i = 0; i < max; i += step) {
    options.push(i.toString().padStart(pad, '0'));
  }
  return options;
};

const CustomTimePicker = ({ value, onChange, idPrefix = "time" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentHour, setCurrentHour] = useState('09');
  const [currentMinute, setCurrentMinute] = useState('00');
  const [popoverPosition, setPopoverPosition] = useState({ bottom: '100%' }); // Default to open upwards

  const pickerRef = useRef(null);
  const triggerRef = useRef(null); 
  const popoverRef = useRef(null); 
  const hourScrollRef = useRef(null);
  const minuteScrollRef = useRef(null);

  const hourOptions = useMemo(() => generateOptions(24), []);
  const minuteOptions = useMemo(() => generateOptions(60), []);

  useEffect(() => {
    if (value && value.includes(':')) {
      const [h, m] = value.split(':');
      setCurrentHour(h.padStart(2, '0'));
      setCurrentMinute(m.padStart(2, '0'));
    } else {
      setCurrentHour('00');
      setCurrentMinute('00');
    }
  }, [value]);

  // Scroll to selected values
  useEffect(() => {
    if (isOpen) {
      const scrollToSelected = (scrollRef, selectedValue, options) => {
        if (scrollRef.current) {
          const selectedIndex = options.indexOf(selectedValue);
          if (selectedIndex !== -1) {
            const selectedElement = scrollRef.current.children[selectedIndex];
            if (selectedElement) {
              selectedElement.scrollIntoView({
                block: 'center',
                inline: 'nearest',
                behavior: 'smooth'
              });
            }
          }
        }
      };
      
      const timer = setTimeout(() => {
        scrollToSelected(hourScrollRef, currentHour, hourOptions);
        scrollToSelected(minuteScrollRef, currentMinute, minuteOptions);
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentHour, currentMinute, hourOptions, minuteOptions]);

  // Position the popover
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      // Always position above the trigger button
      const buttonHeight = triggerRef.current.offsetHeight;
      setPopoverPosition({ 
        bottom: `${buttonHeight + 4}px`,
        left: '50%',
        transform: 'translateX(-50%)'
      });
    }
  }, [isOpen]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleHourChange = (hour) => {
    setCurrentHour(hour);
    onChange(`${hour}:${currentMinute}`);
  };

  const handleMinuteChange = (minute) => {
    setCurrentMinute(minute);
    onChange(`${currentHour}:${minute}`);
    setIsOpen(false);
  };

  const displayTime = `${currentHour}:${currentMinute}`;

  return (
    <div className="relative" ref={pickerRef}> 
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="modal-input h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2.5 text-sm text-left text-gray-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none flex items-center justify-between"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={`${idPrefix}-picker-popover`}
      >
        <span>{displayTime} <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">WIB</span></span>
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          id={`${idPrefix}-picker-popover`}
          role="dialog"
          aria-modal="true"
          className="absolute z-50 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 p-2"
          style={popoverPosition}
        >
          <div className="flex items-center justify-center w-44">
            {/* Hour Column */}
            <div className="w-1/2 pr-1">
              <div className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                Jam
              </div>
              <div 
                ref={hourScrollRef} 
                className="h-32 overflow-y-auto time-picker-scroll border border-gray-200 dark:border-gray-700 rounded"
              >
                {hourOptions.map((hour) => (
                  <div
                    key={`hour-${hour}`}
                    onClick={() => handleHourChange(hour)}
                    className={clsx(
                      "p-2 text-center cursor-pointer",
                      hour === currentHour 
                        ? "bg-blue-500 text-white" 
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                  >
                    {hour}
                  </div>
                ))}
              </div>
            </div>

            {/* Minute Column */}
            <div className="w-1/2 pl-1">
              <div className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                Menit
              </div>
              <div 
                ref={minuteScrollRef} 
                className="h-32 overflow-y-auto time-picker-scroll border border-gray-200 dark:border-gray-700 rounded"
              >
                {minuteOptions.map((minute) => (
                  <div
                    key={`minute-${minute}`}
                    onClick={() => handleMinuteChange(minute)}
                    className={clsx(
                      "p-2 text-center cursor-pointer",
                      minute === currentMinute 
                        ? "bg-blue-500 text-white" 
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                  >
                    {minute}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomTimePicker;