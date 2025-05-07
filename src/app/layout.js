import { Outfit } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}>
        <ThemeProvider>
          <SidebarProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
              {children}
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
