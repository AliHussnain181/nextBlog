"use client";

import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useState,
  FormEvent,
} from "react";
import { Editor, } from "@tinymce/tinymce-react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { Context } from "@/components/context";
import axios from "axios";
import Image from "next/image";
import { editorConfig } from "@/lib/editorConfig";

// TypeScript interfaces
interface EditorProps {
  name: string;
  content: string;
  category: string;
  image: File | string;
}


const MyEditor = () => {
  // Component state
  const [editorData, setEditorData] = useState<EditorProps>({
    name: "",
    content: "",
    category: "",
    image: "",
  });

  const [imagePrev, setImagePrev] = useState<string>("");

  const { user } = useContext(Context);

  // Update content from TinyMCE editor
  const handleEditorChange = (content: string) => {
    setEditorData((prev) => ({ ...prev, content }));
  };

  // Handle image file selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedImage = files[0];
      setEditorData((prev) => ({ ...prev, image: selectedImage }));

      // Preview image using FileReader
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

    // Form validation
    if (!name || !content || !category || !image) {
      toast.error("All fields are required.");
      return;
    }

    try {
      // Prepare form data for submission
      const formData = new FormData();
      formData.append("name", name);
      formData.append("content", content);
      formData.append("category", category);
      if (image instanceof File) {
        formData.append("file", image);
      }

      // API call to create a new blog
      const res = await axios.post("/api/blog", formData);
      if (res.status === 200) {
        toast.success("Blog post added successfully!");
        resetForm();
      } else {
        toast.error("Failed to add blog post.");
      }
    } catch (error) {
      toast.error("Error: " + (error as Error).message);
    }
  };

  // Reset form after successful submission
  const resetForm = () => {
    setEditorData({ name: "", content: "", category: "", image: "" });
    setImagePrev("");
  };

  // Check user role for access control
  useEffect(() => {
    if (user?.role !== "admin") {
      redirect("/");
    }
  }, [user]);


  return (
    <div className="mx-auto my-8 mt-28">
      {/* Image preview */}
      {imagePrev && (
        <div className="mt-32 flex justify-center">
          <Image width={1000} height={1000} src={imagePrev} alt="Preview" />
        </div>
      )}

      {/* Blog editor form */}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded shadow-md">
        {/* Name input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input
            type="text"
            id="name"
            value={editorData.name}
            onChange={(e) => setEditorData((prev) => ({ ...prev, name: e.target.value }))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Image input */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image:</label>
          <input
            type="file"
            id="image"
            accept=".jpg"
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Category input */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
          <input
            type="text"
            id="category"
            value={editorData.category}
            onChange={(e) => setEditorData((prev) => ({ ...prev, category: e.target.value }))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* TinyMCE Editor */}
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINY}
          initialValue="<p>This is the initial content of the editor</p>"
          init={editorConfig}
          onEditorChange={handleEditorChange}
        />

        {/* Submit button */}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MyEditor;
