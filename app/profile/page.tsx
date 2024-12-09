"use client";
import { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import useAuthStore from "@/stores/authStore";

const Profile = () => {
  const { user, isLoading, logout, isLoggingOut, fetchUser } = useAuthStore();

  // Fetch user data on component mount
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        <span className="ml-4 text-gray-500">Loading...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500">
          Error: Unable to fetch user information. Please log in again.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full mx-auto bg-white p-8 rounded-md shadow-md">
        <div className="mb-6 font-semibold text-center">
          <h2 className="text-lg">{user?.name}</h2>
          <h2 className="text-gray-500">{user?.email}</h2>
        </div>
        {user?.role === "admin" && (
          <div className="flex justify-center">
            <Link
              href="/createBlog"
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <FaHome className="mr-2" />
              Dashboard
            </Link>
          </div>
        )}
        <div className="flex justify-center mt-4">
          <LogoutButton logout={logout} isLoggingOut={isLoggingOut} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
