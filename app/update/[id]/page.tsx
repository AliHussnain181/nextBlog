"use client";
import React, {
  ChangeEvent,
  useEffect,
  useState,
  useCallback,
} from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import axios from "axios";
import { editorConfig } from "@/lib/editorConfig";
import useAuthStore from "@/stores/authStore";

interface User {
  role: string;
  // Add other properties if needed
}

interface BlogData {
  name: string;
  content: string;
  image: string;
  category: string;
}

export default  function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = useCallback(async () => {
    const id = (await params).id;
    return id;
  }, [params]);
  
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | string>("");
  const [imagePrev, setImagePrev] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const checkAccessAndFetchData = async () => {
      
      if (!user || (user as User).role !== "admin") {
        toast.error("You don't have access to this page.");
        return router.push("/");
      }

      try {
        const res = await axios.get<BlogData>(`/api/blog/${id}`);
        if (res.status === 200) {
          const result = res.data;
          setName(result.name);
          setContent(result.content);
          setImage(result.image);
          setCategory(result.category);
        } else {
          toast.error("Failed to fetch blog data");
        }
      } catch (error) {
        toast.error((error as Error).message);
      }
    };

    checkAccessAndFetchData();
  }, [user, id, router]);

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImagePrev(reader.result);
        }
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const updateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("content", content);
    formData.append("category", category);
    if (image instanceof File) {
      formData.append("file", image);
    }

    try {
      const result = await axios.put(`/api/blog/upde/${id}`, formData);
      if (result.status === 200) {
        toast.success("Blog updated");
        // router.push("/blogs");
      } else {
        toast.error("Failed to update blog");
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="p-8 bg-white rounded shadow-md my-40">
      {imagePrev || image ? (
        <div className="flex justify-center w-[20rem] h-[20rem] mb-4">
          <Image
            width={1000}
            height={1000}
            src={imagePrev || (image as string)}
            alt="Blog preview"
            className="object-cover"
          />
        </div>
      ) : null}

      <h2 className="text-2xl font-semibold mb-4">Update a Blog</h2>
      <form onSubmit={updateBlog} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Blog Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            accept=".jpg,.jpeg,.png"
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Category
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINY}
          initialValue={content}
          init={editorConfig}
          onEditorChange={handleEditorChange}
          value={content}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}
