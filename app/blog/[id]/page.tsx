"use client";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import Image from "next/image";

interface Blog {
  _id: string;
  name: string;
  content: string;
  image: string;
  category: string;
}

const Blog = ({ params }: any) => {
  const [data, setData] = useState<Blog | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await fetch(`/api/blog/${params.id}`);
        const result = await res.json();
        setData(result);
        setShow(true);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    getBlogs();
  }, [params.id]);

  return (
    <div className="p-4 my-28 h-auto ">
      {data ? (
        <div className="shadow-md p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-md max-w-4xl mx-auto">
          <div className="relative mb-4 ">
            <Image
              width={2000}
              height={2000}
              src={data.image}
              alt={data.name}
              className="rounded-md object-center  h-64 sm:h-80 md:h-96"
            />
          </div>
          <div className="overflow-x-hidden">
            <p className="text-xl sm:text-3xl font-semibold mx-auto my-2">{data.name}</p>
            <div className="text-gray-800">{parse(data.content)}</div>
            <p className="mt-4 text-gray-600">Category: {data.category}</p>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading blog post...</p>
      )}
    </div>
  );
};

export default Blog;
