'use client';

import { useSideBar } from "@/context/SidebarContext";
import AppHeader from "@/layout/Header";
import AppSidebar from "@/layout/Sidebar";

export default function AdminLayout( {children} ) {
    const {isExpanded, isHovered, isMobileOpen} = useSideBar();
    const mainContentMargin = isMobileOpen
        ? "ml-0"
        : isExpanded || isHovered
        ? "lg:ml-[290px]"
        : "lg:ml-[90px]";


    return(
        <div className="min-h-screen xl:flex">
            <AppSidebar />
            <div
                className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
            >
                <AppHeader/>
                <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
            </div>
        </div>
        
    )

}