"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const UserContext = createContext(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  // Force a refresh of user data when navigating to sign-in or dashboard
  useEffect(() => {
    if (pathname === "/sign-in" || pathname === "/dashboard") {
      // Clear user data on sign-in page to ensure fresh authentication
      if (pathname === "/sign-in") {
        console.log("Navigated to sign-in page, clearing user data");
        setUser(null);
      } else {
        console.log("Navigated to dashboard, refreshing user data");
        fetchUserData();
      }
    }
  }, [pathname]);

  const fetchUserData = async (force = false) => {
    // Skip if we're on the sign-in page and not forcing a refresh
    if (pathname === "/sign-in" && !force) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Add a cache-busting parameter to ensure we're not getting cached responses
      const timestamp = new Date().getTime();
      console.log(`Fetching user data at ${timestamp}...`);
      
      const res = await fetch(`/api/users/me?_=${timestamp}`);
      
      console.log(`Response status: ${res.status}`);
      
      if (res.status === 401) {
        console.log("Not authenticated, redirecting to sign-in");
        setUser(null);
        setLastFetchTime(new Date());
        setIsLoading(false);
        if (pathname !== "/sign-in") {
          router.push("/sign-in");
        }
        return;
      }
      
      if (!res.ok) {
        throw new Error(`Failed to fetch user data: ${res.status}`);
      }
      
      const userData = await res.json();
      console.log("User data retrieved:", userData);
      
      if (!userData) {
        console.error("User data is null or undefined");
        setUser(null);
      } else {
        console.log(`Setting user role to: ${userData.role}`);
        setUser(userData);
      }
      
      setLastFetchTime(new Date());
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err.message);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    
    // Set up an interval to refresh user data every 5 minutes
    const intervalId = setInterval(() => {
      fetchUserData(true);
    }, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Ensure proper role checking
  // Only return true if the role is exactly 'ADMIN' (case-sensitive)
  const isAdmin = user && user.role === 'ADMIN';
  
  // Only return true if the role is exactly 'DOSEN' (case-sensitive)
  const isDosen = user && user.role === 'DOSEN';

  // Debug output
  useEffect(() => {
    console.log("Current user state:", { 
      user: user ? { ...user } : null,
      isAdmin,
      isDosen
    });
  }, [user, isAdmin, isDosen]);

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        isAdmin, 
        isDosen, 
        isLoading, 
        error, 
        refreshUser: () => fetchUserData(true),
        lastFetchTime
      }}
    >
      {children}
    </UserContext.Provider>
  );
}; 