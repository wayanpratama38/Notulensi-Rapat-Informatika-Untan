"use client";

import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { HeroUIProvider } from "@heroui/react";

export function Providers({ children }) {
    console.log("Root rendering (Server)"); // Add a log
  return (
    <HeroUIProvider>
      
    </HeroUIProvider>
  );
}