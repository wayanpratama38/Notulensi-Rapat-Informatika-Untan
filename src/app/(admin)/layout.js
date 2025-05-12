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
        <div className="h-full xl:flex oveflow-hidden">
            <AppSidebar />
            <div
                className={`flex flex-1 flex-col transition-all duration-300 ease-in-out ${mainContentMargin} overflow-hidden`}
            >
                <AppHeader className="flex-shrink-0"/>
                <div className="p-4 md:p-6 flex-1 overflow-y-auto min-h-0">{children}</div>
            </div>
        </div>
        
    )

}