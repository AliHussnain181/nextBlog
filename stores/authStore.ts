"use client"
import { UserType } from "@/Types";
import { create } from "zustand";


// Auth store state and actions
interface AuthState {
  user: UserType | null;
  isLoading: boolean; // For fetching user
  isLoggingOut: boolean; // Specific loading state for logout
  error: string | null;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

// Utility function to handle API requests
const apiRequest = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, {
      credentials: "include", // Include cookies for auth
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})); // Attempt to parse error body
      throw new Error(errorData.message || "Unexpected API error");
    }

    return response.json();
  } catch (error) {
    console.log(`API Request Error (${url}):`, error);
    // throw error;
  }
};

// Define the Zustand store
const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isLoggingOut: false,
  error: null,

  fetchUser: async () => {
    set({ isLoading: true, error: null });

    try {
      const data = await apiRequest("/api/auth/me");
      set({ user: data.user, isLoading: false });
    } catch (error) {
      console.log("Fetch User Error:", error);
      set({
        user: null,
        error: (error as Error).message || "Failed to fetch user",
        isLoading: false,
      });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true, error: null }); // Set loading state for logout

    try {
      await apiRequest("/api/auth/logout", { method: "GET" });
      set({ user: null, isLoggingOut: false }); // Clear user and reset state
      console.log("Successfully logged out");
    } catch (error) {
      console.error("Logout Error:", error);
      set({
        error: (error as Error).message || "Failed to log out",
        isLoggingOut: false,
      });
    }
  },
}));

export default useAuthStore;
