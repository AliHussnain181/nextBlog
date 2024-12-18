import { BlogType } from "@/Types";
import {GetBlogs} from "@/data/getBlog";
import AllBlogs from "@/components/Blogs/AllBlogs";
import type { JSX } from "react";

// Component for displaying all blogs
const BlogsPage = async (): Promise<JSX.Element> => {
  let blogs: BlogType[] = [];

  try {
    // Fetch the blogs data
    const blogData = await GetBlogs();
    blogs = blogData;
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  return (
    <>
      <AllBlogs blogs={blogs} />
    </>
  );
};

export default BlogsPage;
