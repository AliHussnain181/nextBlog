"use client"
import React, { useContext, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import toast from 'react-hot-toast';
import { redirect } from "next/navigation";
import { Context } from '@/components/context';

const MyEditor = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const { user, setUser } = useContext(Context);

  interface User {
    role: string;
    // Add other properties if needed
  }

  const handleEditorChange = (content: string) => {
    // console.log('Content was updated:', content);
    setContent(content); // Update the content state with the editor content
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      // Send data to the server
      let res = await fetch('api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, content, image, category }),
      });

      if (!res.ok) {
        toast.error(res.statusText);
      } else {
        toast.success('Product added successfully!');
      }

      // Clear the form after submission
      setName('');
      setContent('');
      setImage('');
      setCategory('');
    }
    catch (error) {
      toast.error((error as Error).message);
    }
  }

  const editorConfig = {
    height: 500,
    menubar: false,
    plugins: [
      'image',
      'advlist',
      'autolink',
      'lists',
      'link',
      'image',
      'charmap',
      'preview',
      'anchor',
      'searchreplace',
      'visualblocks',
      'code',
      'fullscreen',
      'insertdatetime',
      'media',
      'table',
      'code',
      'help',
      'wordcount',
      'anchor',
      'code'
    ],
    toolbar:
      "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent code |removeformat | help",
    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
  };

  useEffect(() => {
    const auth = async () => {
      try {
        await ((user as User)?.role !== "admin") ? redirect("/") : undefined;
      } catch (error) {
        console.log(error);
      }
    };

    auth();
  }, [user]);    

  
  return (
    <div className="container mx-auto my-8 mt-28">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded shadow-md">
        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Image URL Input */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
            Image URL:
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Category Input */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
            Category:
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* TinyMCE Editor */}
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINY}
          initialValue="<p>This is the initial content of the editor</p>"
          init={editorConfig}
          onEditorChange={handleEditorChange}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MyEditor;
