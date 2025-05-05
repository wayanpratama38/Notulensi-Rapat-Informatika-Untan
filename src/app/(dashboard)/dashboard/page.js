"use client"

import { useSideBar } from "@/context/SidebarContext";
import AppHeader from "@/layout/Header";
import AppSidebar from "@/layout/Sidebar";
import Main from "@/components/main";

export default function Dashboard() {
    const {isExpanded, isHovered, isMobileOpen } = useSideBar();

    const mainContentMargin = isMobileOpen 
        ? "ml-0"
        : isExpanded || isHovered
        ? "lg:ml-[290px]"
        : "lg:ml-[90px]"
    

    return(
        <div className="min-h-screen xl:flex">
            <AppSidebar />
            <div
                className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
            >
                <AppHeader/>
                {/* <Main/> */}
            </div>
        </div>
        
    )
}