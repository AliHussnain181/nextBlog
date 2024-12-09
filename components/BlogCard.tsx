import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

interface Blog {
    _id: string;
    image: string;
    category: string;
    name: string;
  }
interface BlogCardProps {
    blog: Blog;
  }
  
const BlogCard: React.FC<BlogCardProps> = ({ blog }) => (
    <div className="w-72 h-96 px-1 flex-shrink-0 bg-[#0C312A] relative">
      <Image
        src={blog.image}
        width={1000}
        height={1000}
        alt={`${blog.category} blog`}
        className="h-full rounded-md opacity-50"
        priority
      />
      <div className="absolute bottom-0 left-12 mx-7">
        <h2 className="text-3xl">{blog.category}</h2>
        <h3 className="text-2xl">{blog.name}</h3>
        <Link href={`/blog/${blog._id}`}>
          <h2 className="border-green-500 border-[3px] my-6 text-2xl py-3 px-9 rounded-full font-Sf hover:bg-green-500 hover:text-white transition-all duration-300">
            Learn More
          </h2>
        </Link>
      </div>
    </div>
  );
  

  export default memo(BlogCard)