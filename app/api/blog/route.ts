import { Blog } from "@/schema/Blogs"
import { checkAdmin, connectToDB } from "@/utils/features"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    try {
        const { name, image, content, category } = await req.json()

        if (!name || !image || !content || !category) {
            return NextResponse.json({ message: "please complete input fields", success: false })
        }

        const isAdmin = await checkAdmin();

        if (!isAdmin) {
            return NextResponse.json({ error: 'Only admin allow' }, { status: 400 });
        }

        connectToDB()

        const blog = await Blog.create({
            name, image, content, category
        })

        return NextResponse.json({ blog, success: true })
    } catch (error) {
        return NextResponse.json({ error, success: false, message: "internal server error" })
    }
}

export async function GET() {
    try {
        connectToDB()
        
        let blogs = await Blog.find()

        return NextResponse.json(blogs)

    } catch (error) {
        return NextResponse.json({ error, message: "internal server error", success: false })
    }
}