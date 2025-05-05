import { useSideBar } from "@/context/SidebarContext";
import { usePathname } from "next/navigation";
import {
    CalendarIcon,
    DashboardIcon,
    UserIcon,
} from "../icons/index";
import { useCallback, useEffect } from "react";
import Link from "next/link";

const navItems = [
    {
        icon : <DashboardIcon />,
        name : "Dashboard",
        path : "/"
    },
    {
        icon : <CalendarIcon />,
        name : "Calendar",
        path : "/calendar"
    },
    {
        icon : <UserIcon />,
        name : "User Profile",
        path : "/profile"
    }
]


const AppSidebar = () => {
    const { isExpanded , isMobileOpen, isHovered ,setIsHovered } = useSideBar();
    const pathname = usePathname();

    const renderMenuItems = (
        navItems
    ) => (
        <ul className="flex flex-col gap-4">
            {navItems.map((nav)=>(
                <li key={nav.name}>
                    {nav.path && (
                        <Link
                            href = {nav.path}
                            className ={`menu-item group flex gap-2 no-scrollbar ${
                                isActive(nav.path)? 'menu-item-active' : "menu-item-inactive"
                            }`}
                        >
                            <span
                                className={`${
                                    isActive(nav.path)
                                    ? "menu-item-icon-active"
                                    : "menu-item-icon-inactive"
                                }`}
                            >
                                {nav.icon}
                            </span>
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <span className={`menu-item-text text-white`}>{nav.name}</span>
                            )}
                        </Link>
                    )}
                </li>
            ))}
        </ul>
    )

    const isActive = useCallback((path)=> path === pathname, [pathname]);


    return(
        <aside
            className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200
                ${
                    isExpanded || isMobileOpen 
                    ? "w-[290px]"
                    : isHovered
                    ? "w-[290px]"
                    : "w-[90px]" 
                }
                ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0`}
                onMouseEnter={()=> !isExpanded && setIsHovered(true)}
                onMouseLeave={()=> setIsHovered(false)}
        >
            <div className = "flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
                <nav className="mb-6">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h2 
                                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                                    !isExpanded && !isHovered
                                        ? "lg:justify-center"
                                        : "justify-start"
                                }`}
                            >
                                {isExpanded || isHovered || isMobileOpen }
                            </h2>
                            {renderMenuItems(navItems)}
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    )
}

export default AppSidebar;