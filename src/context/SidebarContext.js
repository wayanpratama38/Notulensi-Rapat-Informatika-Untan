"use client";
import { createContext, useContext, useState, useEffect, } from "react";

const SidebarContext = createContext(undefined);

export const useSideBar = () => {
    const context = useContext(SidebarContext);
    if(!context){
        throw new Error("useSidebar perlu digunakan di dalam SideBarProvider!")
    }
    return context;
};


export const SidebarProvider = ( {children} ) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const [openSubMenu, setOpenSubMenu] = useState(null);

    useEffect(()=> {
        const handleResize = () => {
            const mobile = window.innerWidth <768;
            setIsMobile(mobile);
            if(!mobile){
                setIsMobileOpen(false);
            }
        }

        handleResize();
        window.addEventListener("resize",handleResize);

        return () => {
            window.removeEventListener("resize",handleResize);
        }
    }, []);


    const toggleSidebar = () => {
        setIsExpanded((prev)=>!prev);
    }

    const toggleMobileSidebar = () => {
        setIsMobileOpen((prev)=>!prev);
    }

    const toggleSubmenu = (item) => {
        setOpenSubMenu((prev)=>(prev === item ? null : item));
    }

    return(
        <SidebarContext.Provider 
            value={{
                isExpanded : isMobile ? false : isExpanded,
                isMobileOpen,
                isHovered,
                activeItem,
                openSubMenu,
                toggleSidebar,
                toggleMobileSidebar,
                setIsHovered,
                setActiveItem,
                toggleSubmenu,
        }}>
            {children}
        </SidebarContext.Provider>
    );
};