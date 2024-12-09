"use client";

import { FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

interface LogoutButtonProps {
  logout: () => Promise<void>;
  isLoggingOut: boolean;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ logout, isLoggingOut }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/"); // Redirect to home after logout
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  const baseClasses =
    "flex items-center px-4 py-2 text-white rounded focus:outline-none";
  const activeClasses = "bg-red-600 hover:bg-red-700";
  const disabledClasses = "bg-red-400 cursor-not-allowed";

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`${baseClasses} ${isLoggingOut ? disabledClasses : activeClasses}`}
    >
      <FaSignOutAlt className="mr-2" />
      {isLoggingOut ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
