"use client";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import Image from "next/image";

interface Blog {
  _id: string;
  name: string;
  content: string;
  image: string;
  category: string;
}

const Blog = ({ params }: any) => {
  const [data, setData] = useState<Blog | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await fetch(`/api/blog/${params.id}`);
        const result = await res.json();
        setData(result);
        setShow(true);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    getBlogs();
  }, [params.id]);

  return (
    <div className="blog-container font-Sf">
      {data ? (
        <div className="blog-content">
          <div className="blog-image">
            <div className="image-overlay"></div>
            <Image
              width={1000}
              height={1000}
              src={data.image}
              alt={data.name}
              className="rounded-lg img"
            />
          </div>
          <div className="blog-text">
            <p className="blog-title">{data.name}</p>
            <div className="blog-description">
              <div className="scrollable-text">{parse(data.content)}</div>
            </div>
            <p className="blog-category">
              Category: {data.category}
            </p>
          </div>
        </div>
      ) : (
        <p className="loading-text">Loading blog post...</p>
      )}
    </div>
  );
};

export default Blog;
