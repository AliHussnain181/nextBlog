"use client"
import React, { useContext, useEffect } from 'react';
import { Context } from '@/components/context';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { redirect } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from 'next/link';


const Profile = () => {

    const { user, setUser }:any = useContext(Context);

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/auth/logout");

            const data = await res.json();

            if (!data.success) toast.error(data.message);

            setUser({});

            toast.success(data.message);
        } catch (error) {
            return toast.error((error as Error).message);
        }
    };

    useEffect(() => {
            if (!user?._id) return redirect("/login");          
    },[user])


    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
                <div className="mb-6 font-semibold font-Raleway text-center">
                    <p className="text-lg">{user.name}</p>
                    <p className="text-gray-500">{user.email}</p>
                </div>
                {user.role === 'admin' && (
                    <div className="flex justify-center items-center">
                        <Link href="/createBlog" className="flex items-center text-indigo-600 hover:text-indigo-800">
                            <FaHome className="mr-2" />
                            Dashboard
                        </Link>
                    </div>
                )}
                <div className="flex justify-center items-center mt-4">
                    <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
                    >
                        <FaSignOutAlt className="mr-2" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;

