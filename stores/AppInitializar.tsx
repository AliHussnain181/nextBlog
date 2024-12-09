"use client";
import { useEffect } from "react";
import useAuthStore from "@/stores/authStore";

const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser(); // Fetch user details on app load
  }, [fetchUser]);

  return <>
  {children}
  </>;
};

export default AppInitializer;
