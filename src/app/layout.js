import { Outfit } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { HeroUIProvider } from "@heroui/react";
import { Providers } from "./providers";

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  console.log("Providers component rendering (Client)"); // Add a log
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}>
        
          <SidebarProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
              {children}
            </div>
          </SidebarProvider>
        
      </body>
    </html>
  );
}
