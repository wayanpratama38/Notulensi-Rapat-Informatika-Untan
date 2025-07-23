import { useState, useEffect } from 'react';

/**
 * Returns a debounced version of the input value, updated after the specified delay.
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay time in milliseconds
 * @returns {any} - Debounced value
 */
export default function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
} 