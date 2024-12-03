import { Blog } from "@/schema/Blogs";
import { UploadOnCloude, checkAdmin, connectToDB } from "@/utils/features";
import { writeFile, unlink } from "fs/promises"; // Added unlink for cleanup
import { NextResponse } from "next/server";
import { z } from "zod"; // For validation

// Schema for validating the incoming data
const blogSchema = z.object({
  name: z.string().min(1, "Name is required"),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
  file: z.instanceof(File).refine((file) => file.size > 0, {
    message: "File is required",
  }),
});

// Utility function to handle file operations
async function handleFileUpload(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const tempPath = `./public/${file.name}`; // Use a temporary directory
  await writeFile(tempPath, new Uint8Array(buffer));
  return tempPath;
}

// POST method to create a blog
export async function POST(req: Request) {
  try {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Only admins are allowed" }, { status: 403 });
    }

    const data = await req.formData();
    const parsedData = blogSchema.safeParse({
      name: data.get("name"),
      content: data.get("content"),
      category: data.get("category"),
      file: data.get("file"),
    });

    if (!parsedData.success) {
      return NextResponse.json({
        message: parsedData.error.errors.map(err => err.message).join(", "),
        success: false,
      }, { status: 400 });
    }

    const { name, content, category, file } = parsedData.data;

    // Handle file upload
    const filePath = await handleFileUpload(file);
    const image = await UploadOnCloude(filePath);

    // Connect to the database
    await connectToDB();

    // Create the blog entry
    const blog = await Blog.create({
      name,
      image: image?.url,
      content,
      category,
    });

    // Clean up temporary file
    await unlink(filePath);

    return NextResponse.json({ blog, success: true }, { status: 201 });

  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json({
      message: "Internal server error",
      success: false,
    }, { status: 500 });
  }
}

// GET method to retrieve blogs
export async function GET() {
  try {
    await connectToDB();
    const blogs = await Blog.find();
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error in GET:", error);
    return NextResponse.json({
      message: "Internal server error",
      success: false,
    }, { status: 500 });
  }
}
