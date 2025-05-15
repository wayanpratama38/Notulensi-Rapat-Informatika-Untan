import { Outfit } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/context/SidebarContext";
import { Providers } from "./providers";

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} bg-gray-50 dark:bg-gray-900 h-full overflow-hidden transition-colors duration-200`}>
        <SidebarProvider>
          <Providers>
            {children}
          </Providers>
        </SidebarProvider>
      </body>
    </html>
  );
}
