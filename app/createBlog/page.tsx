"use client";

import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useState,
  FormEvent,
} from "react";
import { Editor } from "@tinymce/tinymce-react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { editorConfig } from "@/lib/editorConfig";
import useAuthStore from "@/stores/authStore";

// TypeScript interfaces
interface EditorProps {
  name: string;
  content: string;
  category: string;
  image: File | string;
}

const MyEditor = () => {
  const [editorData, setEditorData] = useState<EditorProps>({
    name: "",
    content: "",
    category: "",
    image: "",
  });
  const [imagePrev, setImagePrev] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useAuthStore();

  // Handle TinyMCE editor content change
  const handleEditorChange = (content: string) => {
    setEditorData((prev) => ({ ...prev, content }));
  };

  // Validate image and update state
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedImage = files[0];

      // Validate image size and type
      if (selectedImage.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB.");
        return;
      }
      if (!selectedImage.type.startsWith("image/")) {
        toast.error("Please upload a valid image.");
        return;
      }

      setEditorData((prev) => ({ ...prev, image: selectedImage }));

      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImagePrev(reader.result);
        }
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { name, content, category, image } = editorData;

    // Validate form fields
    if (!name || !content || !category || !image) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("content", content);
      formData.append("category", category);
      if (image instanceof File) {
        formData.append("file", image);
      }

      const res = await axios.post("/api/blog", formData);
      if (res.status >= 200 && res.status < 300) {
        toast.success("Blog post added successfully!");
        resetForm();
      } else {
        toast.error(`Failed to add blog post. Status: ${res.status}`);      }
    } catch (error) {
      toast.error(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setEditorData({ name: "", content: "", category: "", image: "" });
    setImagePrev("");
  };

  // Check user role for access control
  useEffect(() => {
    if (user && user?.role !== "admin") {
      console.log(user?.role);
      console.log(user);
      
      redirect("/");
    }
  }, [user]);

  return (
    <div className="container mx-auto my-8 mt-28">
      {/* Image Preview */}
      {imagePrev && (
        <div className="mt-8 flex justify-center">
          <Image
            width={500}
            height={500}
            src={imagePrev}
            alt="Preview"
            className="rounded"
          />
        </div>
      )}

      {/* Blog Editor Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-8 rounded shadow-lg"
      >
        {/* Name Input */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={editorData.name}
            onChange={(e) =>
              setEditorData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter blog title"
            required
          />
        </div>

        {/* Image Input */}
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Image:
          </label>
          <input
            type="file"
            id="image"
            accept=".jpg,.jpeg,.png"
            onChange={handleImageChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Category Input */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Category:
          </label>
          <input
            type="text"
            id="category"
            value={editorData.category}
            onChange={(e) =>
              setEditorData((prev) => ({ ...prev, category: e.target.value }))
            }
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter blog category"
            required
          />
        </div>

        {/* TinyMCE Editor */}
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINY}
          initialValue="<p>Start writing your blog content here...</p>"
          init={editorConfig}
          onEditorChange={handleEditorChange}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className={`mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none ${
            loading ? "cursor-not-allowed opacity-50" : "hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default MyEditor;
