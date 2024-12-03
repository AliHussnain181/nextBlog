"use client";
import React, { memo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

interface Blog {
  _id: string;
  imagesrc: string;
  category: string;
  name: string;
}

interface BlogSliderProps {
  blogs: Blog[];
}

const BlogSlider: React.FC<BlogSliderProps> = ({ blogs }) => {
  // Restrict to 7 blogs, fallback to empty array if blogs is not valid
  const blogsData = Array.isArray(blogs) ? blogs.slice(0, 7) : [];

  // Early return for no data
  if (!blogsData.length) {
    return <div className="text-center text-gray-600">No blogs available</div>;
  }

  return (
    <div className="mt-32 w-[75%] h-full mx-auto border-black border-2  bg-cyan-500 ">
      <Carousel
        className="bg-slate-100"
        opts={{
          align: "start",
          loop: true,
          duration: 40,
        }}
      >
        <CarouselContent>
          {blogsData.map((blog) => (
            <CarouselItem
              key={blog._id}
              // className="w- mx-auto flex flex-col items-center"
            >
              <Card>
                <CardContent 
                className="flex flex-col items-center justify-center hfull"
                >
                  {/* Lazy-loaded Image */}
                  <Image
                    className="object-cover object-center rounded-md h[18rem]"
                    src={blog.imagesrc}
                    width={1000}
                    height={1000}
                    alt={blog.name || "Blog image"}
                    placeholder="blur"
                    blurDataURL="/placeholder.png" // Use a placeholder for faster loading
                  />
                  <p className="text-2xl font-semibold mt-4 text-cyan-700 line-clamp-2">
                    {blog.name}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default memo(
  BlogSlider,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.blogs) === JSON.stringify(nextProps.blogs)
);
