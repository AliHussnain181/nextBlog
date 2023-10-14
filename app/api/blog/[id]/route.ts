import { Blog } from "@/schema/Blogs";
import { connectToDB } from "@/utils/features";
import { NextResponse } from "next/server";

interface Response {
    params: {
        id: string;
    };
}

export async function GET(req: Request, res: Response) {

    try {
        connectToDB()
        let blog = await Blog.findById(res.params.id)
        return NextResponse.json(blog)
    } catch (error) {
        return NextResponse.json(error)
    }
}