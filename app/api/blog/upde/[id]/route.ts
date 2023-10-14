import { Blog } from "@/schema/Blogs";
import { checkAdmin, connectToDB } from "@/utils/features";
import { NextResponse } from "next/server";

interface Response {
    params: {
        id: string;
    };
}


export async function PUT(req: Request, res: Response) {
    try {
        const { name, content, image, category } = await req.json();

        if (!name || !content || !category || !image) {
            return NextResponse.json({ error: 'Please provide all required fields.' }, { status: 400 });
        }

        const isAdmin = await checkAdmin();

        if (!isAdmin) {
            return NextResponse.json({ error: 'Only admin allow' }, { status: 400 });
        }

        connectToDB()

        const blog = await Blog.findById(res.params.id);

        if (!blog) {
            return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
        }

        if (name) blog.name = name;
        if (content) blog.content = content;
        if (category) blog.category = category;
        if (image) blog.image = image;

        await blog.save();

        return NextResponse.json({ blog, message: "Updated successfully." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error, message: "Server error." }, { status: 500 });
    }
}


export async function DELETE(req: Request, res: Response) {
    try {

        const isAdmin = await checkAdmin();

        if (!isAdmin) {
            return NextResponse.json({ error: 'Only admin allow' }, { status: 400 });
        }

        connectToDB()

        let blog = await Blog.findByIdAndDelete(res.params.id)

        if (!blog) {
          return  NextResponse.json({ message: "please enter correct field", success: false })
        }

       return NextResponse.json({ message: "blog Deleted", success: true })

    } catch (error) {
       return NextResponse.json({ message: "internal server error", success: false })
    }
}