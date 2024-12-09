import Image from "next/image";
import Link from "next/link";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import {GetBlogs} from "@/data/getBlog";
import { BlogType } from "@/Types";


// Main Component to Display Blogs
const MyBlogs: React.FC = async () => {
  // Initialize blogs with appropriate typing
  const blogs: BlogType[] = await fetchBlogs();

  return (
    <section id="features" className="my-16">
      <div className="font-Outfit w-[88%] xl:w-[50%] mx-auto text-center space-y-7">
        <h2 className="text-3xl xl:text-[40px] font-semibold">
          We’re in the business of bringing out the best in our clients.
        </h2>
        <h3 className="text-[22px] font-[550]">
          In a time of marketing start-ups, there is something reassuring about
          20 years of experience delivering powerful creative solutions for
          clients of all sizes in so many different sectors.
        </h3>
      </div>

      <div className="w-full lg:w-[90%] mx-auto gap-y-11 my-10 sm:grid sm:grid-cols-2">
        {blogs.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <ErrorMessage />
        )}
      </div>
    </section>
  );
};

// Fetch blogs with improved error handling
const fetchBlogs = async (): Promise<BlogType[]> => {
  try {
    const blogData = await GetBlogs();    
    return Array.isArray(blogData) ? blogData.slice(0, 4) : [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return []; // Return empty array on error
  }
};

// Error Message Component
const ErrorMessage: React.FC = () => (
  <div className="text-center text-red-500">
    <h1>Failed to load blogs. Please try again later.</h1>
  </div>
);

// Blog Card Component
interface BlogCardProps {
  blog: BlogType;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => (
  <div className="w-[90%] xl:w-[33rem] my-8 sm:my-0 mx-auto md:even:mt-14">
    <Image
      className="rounded-xl h-[40vh] md:h-[45vh] xl:h-[25rem] object-cover"
      src={blog.image}
      alt={blog.name || "Blog image"} // Fallback alt text for accessibility
      width={700}
      height={700}
      placeholder="blur"
      blurDataURL="/path/to/placeholder.png" // Path to the placeholder image
      loading="lazy" // Lazy-load the image
    />
    <div className="px-4 space-y-5 font-Sf">
      <h2 className="text-[19px] font-semibold text-[#379475]">
        {blog.category}
      </h2>
      <h3 className="text-[19px] font-semibold">{blog.name}</h3>
      <Link href={`/blog/${blog._id}`} >
        <span className="flex items-center text-[19px] font-semibold w-fit cursor-pointer">
          Learn more
          <LiaLongArrowAltRightSolid size={30} />
        </span>
      </Link>
    </div>
  </div>
);

export default MyBlogs;
