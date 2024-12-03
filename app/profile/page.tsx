"use client";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { Context } from '@/components/context';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { redirect } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { UserType } from '@/Types';

const Profile: React.FC = () => {
    const { user, setUser }: { user: UserType | null; setUser: Dispatch<SetStateAction<UserType | null>> } = useContext(Context);
    const [loading, setLoading] = useState<boolean>(false);

    // Redirect to login if the user is not logged in
    useEffect(() => {
        if (!user?._id) redirect("/login");
    }, [user]);

    const handleLogout = async () => {
        setLoading(true); // Set loading state
        try {
            const res = await fetch("/api/auth/logout");
            const data = await res.json();

            if (!data.success) {
                toast.error(data.message);
                return;
            }

            setUser(null); // Clear user context
            toast.success(data.message);
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full mx-auto bg-white p-8 rounded-md shadow-md">
                <div className="mb-6 font-semibold text-center">
                    <h2 className="text-lg">{user?.name}</h2>
                    <p className="text-gray-500">{user?.email}</p>
                </div>
                {user?.role === 'admin' && (
                    <div className="flex justify-center">
                        <Link href="/createBlog" className="flex items-center text-indigo-600 hover:text-indigo-800">
                            <FaHome className="mr-2" />
                            Dashboard
                        </Link>
                    </div>
                )}
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleLogout}
                        disabled={loading} // Disable button while loading
                        className={`flex items-center px-4 py-2 text-white rounded hover:bg-red-700 focus:outline-none ${
                            loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600"
                        }`}
                    >
                        <FaSignOutAlt className="mr-2" />
                        {loading ? "Logging out..." : "Logout"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
