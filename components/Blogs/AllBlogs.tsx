"use server";
import { BlogType } from "@/Types";
import SearchBlogs from "./SearchBlogs";

interface AllBlogsProps {
  blogs: BlogType[];
}

const AllBlogs: React.FC<AllBlogsProps> = ({ blogs }) => {
  return (
    <section className="py-28 lg:py-32 bg-white">
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold font-Outfit">
          Discover Our Blogs
        </h1>
      </div>
            <SearchBlogs blogs={blogs} />
    </section>
  );
};

export default AllBlogs;
