import parse from "html-react-parser";
import Image from "next/image";
import { BlogType } from "@/Types";
import { getBlogData } from "@/data/ParamBlog";
import { Metadata } from "next";
import axios from "axios";
import toast from "react-hot-toast";
import BlogAction from "./BlogAction";

// Metadata generation for dynamic pages
export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  try {
    const blog: BlogType = await getBlogData(params.id);
    return {
      title: blog.name,
      description: blog.content?.substring(0, 150), // Trimming content for meta description
    };
  } catch (error) {
    return {
      title: "Blog not found",
      description: "Error fetching the blog details.",
    };
  }
}

// Main page component for displaying the blog
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  // Fetch the blog data
  let blogData: BlogType | null = null;
  try {
    blogData = await getBlogData(params.id);
  } catch (error) {
    console.error("Error fetching blog data:", error);
  }

  // If the blog data is not available, show a loading or error message
  if (!blogData) {
    return (
      <div className="p-4 my-28 h-auto text-center">
        <p>Unable to load the blog post. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="p-4 my-28 h-auto">
      <div className="shadow-md p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-md max-w-4xl mx-auto">
        {/* Blog Image */}
        <div className="relative mb-4">
          <Image
            width={2000}
            height={2000}
            src={blogData.image}
            alt={blogData.name || "image"}
            className="rounded-md object-cover h-64 sm:h-80 md:h-96"
            //  loading="lazy"
            priority
          />
        </div>

        {/* Blog Content */}
        <div className="overflow-x-hidden">
          <h1 className="text-xl sm:text-3xl font-semibold mx-auto my-2">
            {blogData.name}
          </h1>
          <div className="prose">
            {parse(blogData.content ?? "No content available.")}
          </div>
          <p className="mt-4 text-gray-600">Category: {blogData.category}</p>
        </div>
      </div>
      <BlogAction blog={blogData}/>
    </div>
  );
}
