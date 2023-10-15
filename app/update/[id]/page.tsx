"use client"
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Context } from '@/components/context';
import { Editor } from '@tinymce/tinymce-react';

interface User {
    role: string;
    // Add other properties if needed
}


const Page = ({ params }: any) => {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const router = useRouter();

    const { user } = useContext(Context)

    useEffect(() => {
        if (!user || (user as User).role !== 'admin') {
            toast.error("You don't have access to this page.");
            router.push('/');
        } else {
            const getData = async () => {
                try {
                    let res = await fetch(`/api/blog/${params.id}`);
                    if (res.ok) {
                        let result = await res.json();
                        setName(result.name);
                        setContent(result.content);
                        setImage(result.image);
                        setCategory(result.category);
                    } else {
                        toast.error('Failed to fetch product data');
                    }
                } catch (error) {
                    toast.error((error as Error).message);
                }
            };
            getData();
        }
    }, [user, params.id, router]);

    const handleEditorChange = (content: string) => {
        // console.log('Content was updated:', content);
        setContent(content); // Update the content state with the editor content
    };

    const updateProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let result = await fetch(`/api/blog/upde/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ name, content, category, image }),
            });

            if (result.ok) {
                toast.success('blog updated');
                router.push('/blogs');
            } else {
                toast.error('Failed to update product');
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

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

    return (
        <div className="p-8 bg-white rounded shadow-md my-24">
            <h2 className="text-2xl font-semibold mb-4">Update a Blog</h2>
            <form onSubmit={updateProduct} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Product Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Image Source:(only https image used)</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Category</label>
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
                    onChange={(e) => setContent(e.target.value)}
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
};

export default Page;
