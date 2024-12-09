import { BlogType } from "@/Types";
import { getBlogData } from "@/data/ParamBlog";
import parse from "html-react-parser";
import Image from "next/image";
import BlogAction from "./BlogAction";
// import { GetBlogs } from "@/data/getBlog";


// export async function generateStaticParams() {
//   try {
//     const blogs = (await GetBlogs())?.slice(0,3);
//     return blogs.map((blog) => ({
//       id: blog._id.toString(),
//     }));
//   } catch (error) {
//     console.error("Error generating static params:", error);
//     return [];
//   }
// }


// Metadata generation for dynamic pages
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const uid = (await params).id;
  try {
    const blog: BlogType = await getBlogData(uid);
    return {
      title: blog.name,
      description: blog.content?.substring(0, 150), // Trimmed content for meta description
    };
  } catch (error) {
    return {
      title: "Blog not found",
      description: "Error fetching the blog details.",
    };
  }
}

// Main page component for displaying the blog
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // Fetch the blog data for the given `id`
  let blogData: BlogType | null = null;
  
  const uid = (await params).id;
  
  try {
    blogData = await getBlogData(uid); // Fetch blog data by ID
  } catch (error) {
    console.error("Error fetching blog data:", error);
  }

  // If the blog data is not available, show an error message
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
          <h2 className="mt-4 text-gray-600">Category: {blogData.category}</h2>
        </div>
      </div>
      {/* client component */}
      <BlogAction blog={blogData} />
    </div>
  );
}
