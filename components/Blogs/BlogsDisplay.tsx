import { BlogType } from '@/Types';
import Image from 'next/image';
import Link from 'next/link';

const BlogsDisplay = ({filteredBlogs}:{filteredBlogs:BlogType[]}) => {

  return (
    <>
    <div className="flex justify-center flex-wrap my-7 gap-6 font-Sf">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <Link
              href={`/blog/${blog._id}`}
              key={blog._id}
              className={`w-72 ${
                 "h-72"
              } sm:w-60 rounded-sm mx-2 overflow-hidden  hover:shadow-sm`}
              aria-label={`Read blog: ${blog.name}`}
            >
              <div className="relative w-full h-52">
                <Image
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  src={blog.image || "/placeholder.png"}
                  alt={blog.name || "Blog image"}
                  layout="fill"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/placeholder.png";
                  }}
                />
              </div>
              <div className="px-4 py-2 font-Roboto">
                <p className="text-xs font-semibold text-[#379475] my-2">
                  {blog.category}
                </p>
                <p className="text-base font-semibold line-clamp-2 hover:underline">
                  {blog.name}
                </p>
              </div>
              {/* {user && user.role === "admin" && (
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
                )} */}
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-10">
            No blogs found. Try a different search.
          </p>
        )}
      </div>
    </>
  )
}

export default BlogsDisplay