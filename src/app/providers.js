"use client";

import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { UserProvider } from "@/context/UserContext";
import { HeroUIProvider } from "@heroui/react";

export function Providers({ children }) {
    console.log("Root rendering (Server)"); 
  return (
    <HeroUIProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </HeroUIProvider>
  );
}