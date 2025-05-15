'use client';

import dynamic from 'next/dynamic';
import { useSideBar } from "@/context/SidebarContext";

// Dynamically import client components
const AppHeader = dynamic(() => import("@/layout/Header"), { ssr: false });
const AppSidebar = dynamic(() => import("@/layout/Sidebar"), { ssr: false });

export default function AdminLayout({ children }) {
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