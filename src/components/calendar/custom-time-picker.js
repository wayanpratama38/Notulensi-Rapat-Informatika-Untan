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
  const [popoverPosition, setPopoverPosition] = useState({ top: '100%' }); 

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

  
  useEffect(() => {
    if (isOpen) {
      const scrollToOption = (scrollRef, optionValue, optionsArray) => {
        if (scrollRef.current) {
          const optionIndex = optionsArray.indexOf(optionValue);
          const optionElement = scrollRef.current.children[optionIndex];
          if (optionElement) {
            optionElement.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' });
          }
        }
      };
      
      const timer = setTimeout(() => {
        scrollToOption(hourScrollRef, currentHour, hourOptions);
        scrollToOption(minuteScrollRef, currentMinute, minuteOptions);
      }, 50); 
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentHour, currentMinute, hourOptions, minuteOptions]);

  
  useEffect(() => {
    if (isOpen && triggerRef.current && popoverRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverHeight = popoverRef.current.offsetHeight;
      const spaceBelow = window.innerHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;

      
      if (spaceBelow >= popoverHeight + 10 || spaceBelow >= spaceAbove) { 
        setPopoverPosition({ top: `${triggerRect.height + 4}px` }); 
      } else {
        setPopoverPosition({ bottom: `${triggerRect.height + 4}px` });
      }
    }
  }, [isOpen]);


  
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
          className="absolute z-20 w-60 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 p-2" // Increased z-index
          style={{ ...popoverPosition, left: 0 }}
        >
          <div className="flex justify-around">
            {/* Hour Column */}
            <div ref={hourScrollRef} className="h-48 overflow-y-auto custom-scroll pr-1 border-r border-gray-200 dark:border-gray-700">
              {hourOptions.map((hour) => (
                <div
                  key={`${idPrefix}-hour-${hour}`}
                  onClick={() => handleHourChange(hour)}
                  className={clsx(
                    "p-2 text-center cursor-pointer rounded-md text-sm",
                    "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                    hour === currentHour && "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 font-semibold"
                  )}
                  role="option"
                  aria-selected={hour === currentHour}
                >
                  {hour}
                </div>
              ))}
            </div>

            {/* Minute Column */}
            <div ref={minuteScrollRef} className="h-48 overflow-y-auto custom-scroll pl-1 pr-1 border-r border-gray-200 dark:border-gray-700">
              {minuteOptions.map((minute) => (
                <div
                  key={`${idPrefix}-minute-${minute}`}
                  onClick={() => handleMinuteChange(minute)}
                  className={clsx(
                    "p-2 text-center cursor-pointer rounded-md text-sm",
                    "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                    minute === currentMinute && "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 font-semibold"
                  )}
                  role="option"
                  aria-selected={minute === currentMinute}
                >
                  {minute}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomTimePicker;