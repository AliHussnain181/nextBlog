import {GetBlogs} from "@/data/getBlog";
import BlogSlider from "./blogSlider";
const Blogs = async () => {
  const blogData = GetBlogs();
  const blogs = await blogData;

  return (
    <>
      <BlogSlider blogs={blogs} />
    </>
  );
};

export default Blogs;
