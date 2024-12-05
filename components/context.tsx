"use client";
import { UserType } from "@/Types";
import {
  useState,
  createContext,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";

// Define the context properties interface
interface ContextProps {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Create the context with default values
export const Context = createContext<ContextProps>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  isLoading: false,
});

// Context provider component
export const ContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch user data from the API
  const fetchUserData = useCallback(async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        cache: "no-store", // Always fetch the latest data
        credentials: "include", // Ensure cookies or credentials are sent
      });

      if (!response.ok) {
        console.log("Failed to fetch user data. Response not ok:", response.statusText);
      }

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
      } else {
        console.warn("Failed to fetch user data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  }, []);

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Memoize context value to prevent unnecessary renders
  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      isAuthenticated: !!user,
      isLoading,
    }),
    [user, isLoading]
  );

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};
