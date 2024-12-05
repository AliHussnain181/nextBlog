"use client";
import Image from "next/image";
import Link from "next/link";
import { BlogType, UserType } from "@/Types";
import { useContext, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "./context";

const AllBlogs = ({ blogs: initialBlogs }: { blogs: BlogType[] }) => {
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState(initialBlogs);

  const deleteBlog = async (id: any) => {
    try {
      const response = await axios.delete(`/api/blog/upde/${id}`);
      if (response.status === 200) {
        // Blog deleted successfully
        toast.success("Blog deleted");
        // Update the state to trigger a re-render
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the blog");
    }
  };

  const { user }: { user: UserType | null } = useContext(Context);

  const filteredBlogs = Array.isArray(blogs)
    ? blogs.filter((dt) => dt.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <>
      <div className="py-28 lg:py-32 bg-white">
        <div className="font-Outfit w-full mx-auto text-center space-y-4 ">
          <p className="text-2xl md:text-4xl lg:text-5xl font-semibold ">
            Discover Our Blogs
          </p>
        </div>
        <div className="mt-4 mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by blog title"
            className="px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex justify-center flex-wrap my-7 gap-y-6 font-Sf ">
          {filteredBlogs?.map((dt, i) => (
            <Link
              href={`/blog/${dt._id}`}
              key={i}
              className={`w-72  ${
                user && user?.role === "admin" ? "h-[19.9rem]" : "h-72"
              } sm:w-60 rounded-sm  mx-2 overflow-hidden`}
            >
              <Image
                className="w-full object-center h-52 hover:scale-105 transition-all duration-500 p-3"
                src={dt.image}
                alt={dt.name || "image"}
                width={700}
                height={700}
              />
              {user && user.role === "admin" && (
                <div className=" flex justify-around ">
                  <div
                    className="text-red-400 text-2xl my-1 cursor-pointer"
                    onClick={() => deleteBlog(dt._id)}
                  >
                    <AiFillDelete />
                  </div>
                  <Link
                    href={`/update/${dt._id}`}
                    className="text-green-400 text-2xl my-1 cursor-pointer"
                  >
                    <GrUpdate />
                  </Link>
                </div>
              )}

              <div className="px-4 font-Roboto">
                <p className="text-xs font-semibold text-[#379475] my-2">
                  {dt.category}
                </p>
                <p className="text-base  font-semibold  line-clamp-2">
                  {dt.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllBlogs;
