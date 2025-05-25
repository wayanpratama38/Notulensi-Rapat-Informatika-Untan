"use client";

import { UserProvider } from "@/context/UserContext";
import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient({
  defaultOptions : {
    queries : {
      staleTime : 5 * 60 * 1000,
      refetchOnWindowFocus : false,
    }
  }
})

export function Providers({ children }) {
    console.log("Root rendering (Server)"); 
  return (
    <QueryClientProvider client={queryClient}> 
      <HeroUIProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  );
}