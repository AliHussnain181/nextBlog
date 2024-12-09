import {GetBlogs} from "@/data/getBlog";
import BlogSlider from "./blogSlider";
const Blogs = async () => {
  const blogData = await GetBlogs();

  return (
    <>
      <BlogSlider blogs={blogData} />
    </>
  );
};

export default Blogs;
