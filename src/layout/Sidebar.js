import { useSideBar } from "@/context/SidebarContext";
import { useUser } from "@/context/UserContext";
import { usePathname } from "next/navigation";
import {
    CalendarIcon,
    DashboardIcon,
    UserIcon,
} from "../icons/index";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

const AppSidebar = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSideBar();
    const { user, isAdmin, isLoading } = useUser();
    const pathname = usePathname();
    const [debugInfo, setDebugInfo] = useState('');

    // Add debug effect to log user role info
    useEffect(() => {
        if (!isLoading) {
            // console.log("Sidebar rendering with user data:", user);
            // console.log("Is admin in sidebar:", isAdmin);
            // setDebugInfo(`Role: ${user?.role || 'none'}, isAdmin: ${isAdmin ? 'true' : 'false'}`);
        }
    }, [user, isAdmin, isLoading]);

    // Define base menu items that all users can see
    const baseNavItems = [
        {
            icon: <DashboardIcon />,
            name: "Dashboard",
            path: "/dashboard"
        },
        {
            icon: <CalendarIcon />,
            name: "Calendar",
            path: "/calendar"
        }
    ];

    // We'll use isAdmin from the context which is guaranteed to be correctly evaluated
    const navItems = isAdmin
        ? [
            ...baseNavItems,
            {
                icon: <UserIcon />,
                name: "Dosen",
                path: "/dosen"
            }
        ]
        : baseNavItems;

    const renderMenuItems = (
        items
    ) => (
        <ul className="flex flex-col gap-4">
            {items.map((nav) => (
                <li key={nav.name}>
                    {nav.path && (
                        <Link
                            href={nav.path}
                            className={`menu-item group flex gap-2 no-scrollbar ${
                                isActive(nav.path) ? 'menu-item-active' : "menu-item-inactive"
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
                                <span className={`menu-item-text ${
                                    isActive(nav.path)
                                    ? 'text-brand-500 dark:text-brand-400'
                                    : 'text-gray-700 dark:text-gray-300'
                                }`}>{nav.name}</span>
                            )}
                        </Link>
                    )}
                </li>
            ))}
        </ul>
    );

    const isActive = useCallback((path) => path === pathname, [pathname]);

    // Show loading state when user data is not ready
    if (isLoading) {
        return (
            <aside className="fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 w-[290px] lg:translate-x-0">
                <div className="flex items-center justify-center h-full w-full">
                    <div role="status">
                        <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </aside>
        );
    }

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
                onMouseEnter={() => !isExpanded && setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
                {/* Debug info - will be visible only when sidebar is expanded */}
                {(isExpanded || isHovered || isMobileOpen) && (
                    <div className="mt-2 mb-2 text-xs text-red-500 overflow-hidden">
                        {debugInfo}
                    </div>
                )}
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
                                {isExpanded || isHovered || isMobileOpen ? 'Menu' : ''}
                            </h2>
                            {renderMenuItems(navItems)}
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default AppSidebar;