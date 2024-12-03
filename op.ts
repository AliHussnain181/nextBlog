"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const BlogSlider = ({ blogs }: any) => {
  const [currentScroll, setCurrentScroll] = useState(0);

  let blogsData = blogs?.slice(0, 3);

  const left = () => {
    setCurrentScroll(
      currentScroll === 0 ? blogsData.length - 1 : currentScroll - 1
    );
  };

  const right = () => {
    setCurrentScroll(
      currentScroll === blogsData.length - 1 ? 0 : currentScroll + 1
    );
  };

  

  return (
    <>
      <div className="bg-[#0C312A] py-12 text-white h-full font-Sf overflow-hidden">
        <div className="lg:flex items-center justify-around">
          <p className="w-[80%] mx-auto text-3xl md:text-4xl lg:mx-28 xl:mx-40 lg:w-[70%]">
            We are designers, engineers and strategists. Here’s what we do.
          </p>
          <div className="py-16 text-2xl flex justify-center gap-x-3 lg:w-[30%]">
            <div
              className="border-[#144B40] cursor-pointer border-[1px] flex justify-center items-center rounded-full h-14 w-14"
              onClick={left} // Attach scrollLeft function
            >
              <IoIosArrowBack />
            </div>
            <div
              className="border-[#144B40] cursor-pointer border-[1px] flex justify-center items-center rounded-full h-14 w-14"
              onClick={right} // Attach scrollRight function
            >
              <IoIosArrowForward />
            </div>
          </div>
        </div>
        <div
          className={`flex flex-row h-[90vh] w-[90vw] xl:w-[60vw] mx-auto font-Outfit transition-all duration-500 mb-16`}
          style={{ transform: `translateX(-${currentScroll * 100}%)` }}
        >
          {blogsData?.map((blog: any, i: any) => (
            <div
              key={i}
              className="w-[100%] px-1 flex-shrink-0 xl:h-[90vh] bg-[#0C312A] relative"
            >
              <Image
                src={blog.image}
                width={1000}
                height={1000}
                alt="blogs"
                className="h-full rounded-md opacity-50"
              />
              <div className="absolute bottom-0 left12 mx-7">
                <p className="text-3xl">{blog.category}</p>
                <p className="text-2xl">{blog.name}</p>
                <button className="border-green-500 border-[3px] my-6 text-2xl py-3 px-9 rounded-full font-Sf hover:bg-green-500 hover:text-white transition-all duration-300">
                  <Link href={`/blog/${blog._id}`}>Learn More</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogSlider;










<div className='my-8 md:my-16 lg:my-32'>
<div className='font-Outfit w-full mx-auto text-center space-y-4'>
    <p className='text-2xl md:text-4xl lg:text-5xl font-semibold '>Discover Our Blogs</p>
</div>

<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 my-7 font-Sf'>
    {blogs.map((dt, i) => (
        <div key={i} className='rounded-sm  shadow-lg mx-2 overflow-hidden'>
            <Image
                className='w-full h-60 hover:scale-105 transition-all duration-500'
                src={dt.image}
                alt={dt.name}
                width={700}
                height={700}
            />
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