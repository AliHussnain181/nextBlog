import { Blog } from "@/schema/Blogs";
import { UploadOnCloude, checkAdmin, connectToDB } from "@/utils/features";
import { unlinkSync } from "fs";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { z } from "zod";

// Schema for validating the incoming data
const blogSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  file: z.instanceof(File).refine((file) => file.size > 0, {
    message: "File must not be empty",
  }),
});

// Utility function: Handle file upload and return the file path
async function handleFileUpload(file: File): Promise<string> {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const tempPath = `./public/${file.name}`; // Ensure unique file name
    await writeFile(tempPath, new Uint8Array(buffer));
    return tempPath;
  } catch (error) {
    console.error("Error during file upload:", error);
    throw new Error("Failed to upload file");
  }
}

// Utility function: Clean up temporary files
function safelyUnlink(filePath: string): void {
  try {
    unlinkSync(filePath);
  } catch (error) {
    console.warn(`Failed to remove temporary file at ${filePath}:`, error);
  }
}

// POST method to create a blog
export async function POST(req: Request) {
  try {
    // Step 1: Check admin privileges
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Only admins are allowed", success: false },
        { status: 403 }
      );
    }

    // Step 2: Parse form data
    const data = await req.formData();
    const parsedData = blogSchema.safeParse({
      name: data.get("name"),
      content: data.get("content"),
      category: data.get("category"),
      file: data.get("file"),
    });

    if (!parsedData.success) {
      return NextResponse.json(
        {
          message: parsedData.error.errors.map((err) => err.message).join(", "),
          success: false,
        },
        { status: 400 }
      );
    }

    const { name, content, category, file } = parsedData.data;

    // Step 3: Handle file upload
    const filePath = await handleFileUpload(file); // Upload locally
    const uploadedImage = await UploadOnCloude(filePath); // Upload to cloud
    if (!uploadedImage?.url) throw new Error("Cloud upload failed");

    // Step 4: Save blog to database
    await connectToDB();
    const blog = await Blog.create({
      name,
      image: uploadedImage.url,
      content,
      category,
    });

    // Step 5: Clean up temporary file
    safelyUnlink(filePath);

    // Step 6: Respond with success
    return NextResponse.json({ blog, success: true }, { status: 201 });
  } catch (error: any) {
    console.error("Error in POST:", error.message || error);

    // Differentiate between known and unknown errors
    if (error.message === "Failed to upload file") {
      return NextResponse.json(
        { message: "File upload failed", success: false },
        { status: 500 }
      );
    }

    if (error.message === "Cloud upload failed") {
      return NextResponse.json(
        { message: "Failed to upload image to cloud", success: false },
        { status: 500 }
      );
    }

    // Default error response for unknown errors
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}

// GET method to retrieve blogs
export async function GET() {
  try {
    await connectToDB();
    const blogs = await Blog.find().select("-__v -content -createdAt");
    
    if (!blogs || blogs.length === 0) {
      return NextResponse.json(
        {
          message: 'No blogs found',
          success: false,
          data: [],
        },
        { status: 404 }
      );
    }
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error in GET:", error);
    return NextResponse.json({
      message: "Internal server error",
      success: false,
    }, { status: 500 });
  }
}
