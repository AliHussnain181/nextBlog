"use client";
import React, { useMemo, useState } from "react";
import { BlogType } from "@/Types";
import BlogsDisplay from "./BlogsDisplay";

const SearchBlogs = React.memo(({ blogs }: { blogs: BlogType[] }) => {
  const [search, setSearch] = useState("");

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) =>
      blog.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, blogs]);

  return (
    <div>
      <div className="mt-4 mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by blog title"
          className="px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          aria-label="Search blogs by title"
        />
      </div>
      <BlogsDisplay filteredBlogs={filteredBlogs} />
    </div>
  );
});

SearchBlogs.displayName = "SearchBlogs";

export default SearchBlogs;
