"use client"

import { Geist, Geist_Mono } from "next/font/google";
import { SidebarProvider, useSideBar } from "@/context/SidebarContext";
import AppHeader from "@/layout/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function MainLayout({ children }) {
  const { isExpanded, isHovered, isMobileOpen } = useSideBar();

  const mainContentMargin = isMobileOpen 
    ? "ml-0" 
    : isExpanded || isHovered 
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";
  
  return (
    <div className="min-h-screen antialiased bg-white dark:bg-gray-900">
      <div className="xl:flex">
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
        >
          <AppHeader />
          <main className="p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default function RootLayout({ children }) {
  
  // return (
  //   <html lang="en">
  //     <div className="min-h-screen xl:flex">
  //       <div
  //         className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
  //       >
  //         <AppHeader />
  //       </div>
  //       <body 
  //         className={`${geistSans.variable} ${geistMono.variable} p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6 antialiased`}>
  //         {children}
  //       </body>
  //     </div>
  //   </html>
  // );

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <SidebarProvider>
          <MainLayout>{children}</MainLayout>
        </SidebarProvider>
      </body>
    </html>
  );
}
