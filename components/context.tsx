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
} from "react";
import { Toaster } from "react-hot-toast";

// Define the context properties interface
interface ContextProps {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
}

// Create the context with default values
export const Context = createContext<ContextProps>({
  user: null,
  setUser: () => {},
});

// Context provider component
export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);

  // Fetch user data from the API
  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me");

      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
      } else {
        console.error("Failed to fetch user data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Optionally, you could add toast notifications here to inform the user
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]); // Use fetchUserData to ensure that it won't change

  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
      <Toaster />
    </Context.Provider>
  );
};
