"use client"
import React, { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from 'next/image';
import Link from 'next/link';

type Props = {};

interface Blog {
  _id: string;
  name: string;
  content: string;
  image: string;
  category: string;
}

const Blogs = (props: Props) => {
  const [data, setData] = useState<Blog[]>([]);
  const [currentScroll, setCurrentScroll] = useState(0);

  useEffect(() => {
    const getBlogs = async () => {
      let res = await fetch('/api/blog');
      const result = await res.json();
      setData(result);
    };
    getBlogs();
  }, []);

  let blog = data?.slice(0, 3)

  let left;

  let right;


  left = function () {
    setCurrentScroll(currentScroll === 0 ? blog.length - 1 : currentScroll - 1);
  };

  right = function () {
    setCurrentScroll(currentScroll === blog.length - 1 ? 0 : currentScroll + 1);
  };



  return (
    <div className='bg-[#0C312A] py-12 text-white h-full font-Sf overflow-hidden '>
      <div className='lg:flex items-center justify-around'>
        <p className='w-[80%] mx-auto text-3xl md:text-4xl lg:mx-28 xl:mx-40 lg:w-[70%]'>We are designers, engineers and strategists. Here’s what we do.</p>
        <div className='py-16 text-2xl flex justify-center gap-x-3 lg:w-[30%]'>
          <div
            className='border-[#144B40] cursor-pointer border-[1px] flex justify-center items-center rounded-full h-14 w-14'
            onClick={left} // Attach scrollLeft function
          >
            <IoIosArrowBack />
          </div>
          <div
            className='border-[#144B40] cursor-pointer border-[1px] flex justify-center items-center rounded-full h-14 w-14'
            onClick={right} // Attach scrollRight function
          >
            <IoIosArrowForward />
          </div>
        </div>
      </div>
      <div className={`flex flex-row h-[90vh] w-[90vw] xl:w-[60vw] mx-auto font-Outfit transition-all duration-500 mb-16`} style={{ transform: `translateX(-${currentScroll * 100}%)` }}>
        {blog?.map((blog, i) => (
          <div key={i} className=" w-[100%]  px-1 flex-shrink-0  xl:h-[90vh] bg-[#0C312A] relative ">
            <Image src={blog.image} width={1000} height={1000} alt='blogs' className='h-full rounded-md opacity-50' />
            <div className='absolute bottom-0 left12 mx-7'>
              <p className='text-3xl'>{blog.category}</p>
              <p className='text-2xl'>{blog.name}</p>
              <button className='border-green-500 border-[3px] my-6 text-2xl py-3 px-9 rounded-full font-Sf hover:bg-green-500 hover:text-white transition-all duration-300'>
                <Link href={`/blog/${blog._id}`}>
                  Learn More
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
