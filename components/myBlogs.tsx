"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { LiaLongArrowAltRightSolid } from "react-icons/lia"
import { AiFillDelete } from "react-icons/ai";
import toast from 'react-hot-toast'
import axios from "axios"
import { Context } from './context'

type Props = {}

interface Blog {
    _id: string;
    name: string;
    content: string;
    image: string;
    category: string;
}

const MyBlogs = (props: Props) => {
    const [blog, setBlog] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/blog')
            .then((res) => res.json())
            .then((res) => {
                setBlog(res);
                setLoading(false); // Set loading to false once blogs are fetched
            });
    }, [setBlog]);

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

    let selectBlog = blog?.slice(0, 4);

    const { user, setUser }: any = useContext(Context);

    return (
        <>
            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                </div>
            ) : (
                // Render blogs once loaded
                <div id='features' className='my-16'>
                    <div className='font-Outfit w-[88%] xl:w-[50%] mx-auto text-center space-y-7'>
                        <p className='text-3xl xl:text-[40px] font-semibold '>We’re in the business of bringing out the best in our clients.</p>
                        <p className='text-[22px] font-[550]'>In a time of marketing start-ups, there is something reassuring about 20 years of experience delivering powerful creative solutions for clients of all sizes in so many different sectors.</p>
                    </div>
                    <div className=' w-sreen lg:w-[90%]  mx-auto gap-y-11 my-10  sm:grid sm:grid-cols-2'>
                        {selectBlog?.map((dt, i) =>
                            <div key={i} className='w-[90%] xl:w-[33rem]  my-8 sm:my-0 mx-auto md:even:mt-14'>
                                <Image className='rounded-xl h-[40vh] md:h-[45vh] xl:h-[25rem] ' src={dt.image} alt={dt.name} width={700} height={700} />
                                {user && user.role === "admin" && (<div className='text-red-400 text-2xl my-2 cursor-pointer' onClick={() => deleteBlog(dt._id)}>
                                    <AiFillDelete />
                                </div>
                                )}
                                <div className='px-4 space-y-5 font-Sf'>
                                    <p className='text-[19px] font-semibold text-[#379475]'>{dt.category}</p>
                                    <p className='text-[19px] font-semibold'>{dt.name}</p>
                                    <Link href={`/blog/${dt._id}`} className='flex items-center text-[19px] font-semibold w-fit'>
                                        <p>Learn more</p>
                                        <LiaLongArrowAltRightSolid size={30} />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default MyBlogs