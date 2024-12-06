"use client";
import { Context } from "@/components/context";
import { BlogType, UserType } from "@/Types";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";

const BlogAction = ({blog}:{blog:BlogType}) => {
  const { user }: { user: UserType | null } = useContext(Context);

  const router = useRouter();

  const deleteBlog = async (id: string) => {
    try {
      const response = await axios.delete(`/api/blog/upde/${id}`);
      if (response.status === 200) {
        toast.success("Blog deleted");
        router.push("/blogs");
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the blog");
    }
  };

  return (
    <>
      {user && user.role === "admin" && (
        <div className="flex justify-around">
          <div
            className="text-red-400 text-2xl my-1 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the parent Link
              deleteBlog(blog._id);
            }}
          >
            <AiFillDelete />
          </div>
          <Link
            href={`/update/${blog._id}`}
            className="text-green-400 text-2xl my-1 cursor-pointer"
            onClick={(e) => e.stopPropagation()} // Prevent triggering the parent Link
          >
            <GrUpdate />
          </Link>
        </div>
      )}
    </>
  );
};

export default BlogAction;
