'use client';

import { createContext, useState, useContext, useEffect, useCallback } from "react";



const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const initialTheme = (savedTheme === "light" || savedTheme === "dark")
        ? savedTheme
        : "light";
    
        setTheme(initialTheme);
        setIsInitialized(true);
      }, []);


    useEffect(()=>{
        if (isInitialized) {
            // Save theme to localStorage
            localStorage.setItem("theme", theme);
            
            // Apply theme to document
            if (theme === "dark") {
              document.documentElement.classList.add("dark");
            } else {
              document.documentElement.classList.remove("dark");
            }
          }
    }, [theme,isInitialized])

    const toggleTheme = () => {
        setTheme((prevTheme)=> (prevTheme === "light" ? "dark" : "light"));
    }

    return(
        <ThemeContext.Provider value= {{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("Ada error pada useTheme")
    }
    return context;
}