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
  image: string;
  category: string;
  name: string;
}

interface BlogSliderProps {
  blogs: Blog[];
}

const BlogSlider: React.FC<BlogSliderProps> = ({ blogs }) => {
  const blogsData = Array.isArray(blogs) ? blogs.slice(0, 7) : [];

  if (!blogsData.length) {
    return (
      <div className="text-center text-gray-500 py-10">
        No blogs available
      </div>
    );
  }

  return (
    <div className="w-full mx-auto py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Featured Blogs
        </h2>
        <Carousel
          className="relative"
          opts={{
            align: "start",
            loop: true,
            duration: 40,
          }}
        >
          <CarouselContent className="flex gap-6">
            {blogsData.map((blog) => (
              <CarouselItem
                key={blog._id}
                className="flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[30%] rounded-lg bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <Card className="overflow-hidden rounded-lg">
                  <Image
                    className="object-cover object-center h-80 w-full"
                    src={blog.image}
                    width={800}
                    height={600}
                    alt={blog.name || "Blog image"}
                    placeholder="blur"
                    blurDataURL="/placeholder.png"
                  />
                  <CardContent className="p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                      {blog.category}
                    </p>
                    <p className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {blog.name}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 rounded-full p-2 shadow-md hover:bg-gray-100 transition" />
          <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 rounded-full p-2 shadow-md hover:bg-gray-100 transition" />
        </Carousel>
      </div>
    </div>
  );
};

export default memo(
  BlogSlider,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.blogs) === JSON.stringify(nextProps.blogs)
);
