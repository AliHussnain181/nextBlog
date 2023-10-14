"use client"
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LiaLongArrowAltRightSolid } from 'react-icons/lia';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AiFillDelete } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { Context } from '@/components/context';


// Define types and interfaces
type Props = {};

interface Blog {
    _id: string;
    name: string;
    content: string;
    image: string;
    category: string;
}

const MyBlogs = (props: Props) => {
    const [blog, setBlog] = useState<Blog[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        fetch('/api/blog')
            .then((res) => res.json())
            .then((res) => setBlog(res));
    }, [setBlog]);

    const filteredBlogs = blog.filter((dt) =>
        dt.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteBlog = async (id: any) => {
        try {
            const response = await axios.delete(`/api/blog/upde/${id}`);
            if (response.status === 200) {
                // Blog deleted successfully
                toast.success("Blog deleted");
                // You may also want to update the local state to reflect the deleted blog
                setBlog((prevBlogs) => prevBlogs.filter(blog => blog._id !== id));
            } else {
                toast.error('Failed to delete blog');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while deleting the blog');
        }
    };

    const { user, setUser }: any = useContext(Context);

    return (
        <>
            <div className='my-8 md:my-16 lg:my-32'>
                <div className='font-Outfit w-full mx-auto text-center space-y-4'>
                    <p className='text-2xl md:text-4xl lg:text-5xl font-semibold '>Discover Our Blogs</p>
                </div>
                <div className='mt-4 mx-auto max-w-md md:max-w-lg lg:max-w-2xl'>
                    <input
                        type='text'
                        placeholder='Search by blog title'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500'
                    />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 my-7 font-Sf'>
                    {filteredBlogs.map((dt, i) => (
                        <div key={i} className='rounded-sm overflow-hidden shadow-lg mx-2'>
                            <Image
                                className='w-full h-60 hover:scale-110 transition-all duration-500'
                                src={dt.image}
                                alt={dt.name}
                                width={700}
                                height={700}
                            />
                            {user && user.role === "admin" && (
                                <div className=' flex justify-around'>
                                    <div className='text-red-400 text-2xl my-2 cursor-pointer' onClick={() => deleteBlog(dt._id)}>
                                        <AiFillDelete />
                                    </div>
                                    <Link href={`/update/${dt._id}`} className='text-green-400 text-2xl my-2 cursor-pointer' >
                                        <GrUpdate />
                                    </Link>
                                </div>
                            )}
                            <div className='px-4'>
                                <p className='text-xs font-semibold text-[#379475] my-2'>{dt.category}</p>
                                <p className='text-base  font-semibold  line-clamp-2'>{dt.name}</p>
                                <Link href={`/blog/${dt._id}`} className='flex items-center text-[17px] font-semibold'>
                                    <p>Learn more</p>
                                    <LiaLongArrowAltRightSolid size={30} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
};

export default MyBlogs;