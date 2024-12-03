import { Blog } from "@/schema/Blogs";
import { connectToDB } from "@/utils/features";
import { NextResponse } from "next/server";
import mongoose from "mongoose"; // To validate ObjectId

interface Params {
    id: string;
}

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    // Ensure the database is connected
    await connectToDB();

    // Validate that the provided ID is a valid MongoDB ObjectId
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        message: "Invalid blog ID.",
      }, { status: 400 });
    }

    // Find the blog by ID
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({
        success: false,
        message: "Blog not found.",
      }, { status: 404 });
    }

    // Respond with the found blog
    return NextResponse.json({
      success: true,
      data: blog,
    }, { status: 200 });

  } catch (error) {
    // Handle unexpected errors and provide a generic message
    return NextResponse.json({
      success: false,
      message: "An internal server error occurred.",
      error: error instanceof Error ? error.message : null,
    }, { status: 500 });
  }
}
