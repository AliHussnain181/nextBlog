"use client";

import { useEffect } from "react";
import HeaderClient from "./HeaderClient";
import useAuthStore from "@/stores/authStore";

const Header = () => {
  const { user, fetchUser } = useAuthStore();

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (!user) {
          await fetchUser();
          }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    loadUser();
  }, [user, fetchUser]);

  return (
    <header>
      {/* Pass user data to the client component */}
      <HeaderClient user={user} />
    </header>
  );
};

export default Header;
