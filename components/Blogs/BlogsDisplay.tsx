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
              className={`w-72 h-[19rem]  sm:w-60 rounded-sm mx-2 overflow-hidden   hover:shadow-sm`}
              aria-label={`Read blog: ${blog.name}`}
            >
              <div className="relative w-full h-52">
                <Image
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  src={blog.image || "/placeholder.png"}
                  alt={blog.name || "Blog image"}
                  width={1500}
                  height={1500}
                  loading='lazy'
                  blurDataURL="/placeholder.png" 
                />
              </div>
              <div className="px-4 py-2 font-Roboto">
                <h3 className="text-xs font-semibold text-[#379475] my-2">
                  {blog.category}
                </h3>
                <h2 className="text-base font-semibold line-clamp-2 hover:underline">
                  {blog.name}
                </h2>
              </div>
            </Link>
          ))
        ) : (
          <h1 className="text-gray-500 text-center mt-10" aria-live='polite'>
            No blogs found. Try a different search.
          </h1>
        )}
      </div>
    </>
  )
}

export default BlogsDisplay