import { Blog } from "@/schema/Blogs";
import { UploadOnCloude, checkAdmin, connectToDB, deleteFromCloudinary } from "@/utils/features";
import { writeFile, unlink } from "fs/promises"; // Don't forget to import unlink if you need to delete files
import { NextResponse } from "next/server";

interface Response {
  params: {
    id: string;
  };
}

async function handleFileUpload(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const tempPath = `./public/${file.name}`;

  // Write the file
  await writeFile(tempPath, new Uint8Array(buffer));

  return tempPath;
}

export async function PUT(req: Request, { params }: Response) {
  try {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Only admin allowed" }, { status: 403 });
    }

    const data = await req.formData();
    const name = data.get("name");
    const content = data.get("content");
    const category = data.get("category");
    const file = data.get("file") as File | null; // Explicitly define file type

    if (!name || !content || !category || !file) {
      return NextResponse.json({
        message: "Please complete all input fields.",
        success: false,
      }, { status: 400 });
    }

    await connectToDB();
    
    const blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }

    const tempPath = await handleFileUpload(file);
    const image = await UploadOnCloude(tempPath);

    if (!image) {
      return NextResponse.json({ error: "Failed to upload image." }, { status: 500 });
    }

    // Remove old image from Cloudinary
    if (blog.image) {
      const publicId = blog.image.substring(blog.image.lastIndexOf("/") + 1, blog.image.lastIndexOf("."));
      await deleteFromCloudinary(publicId);
    }

    // Update blog fields
    blog.name = name as string;
    blog.content = content as string;
    blog.category = category as string;
    blog.image = image.url;

    await blog.save();

    // Optionally delete the local file after uploading to Cloudinary
    await unlink(tempPath);

    return NextResponse.json({ blog, message: "Updated successfully." }, { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Response) {
  try {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Only admin allowed" }, { status: 403 });
    }

    await connectToDB();
    const blog = await Blog.findById(params.id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }

    // Delete the blog and its image from Cloudinary
    if (blog.image) {
      const publicId = blog.image.substring(blog.image.lastIndexOf("/") + 1, blog.image.lastIndexOf("."));
      await deleteFromCloudinary(publicId);
    }

    await Blog.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Blog deleted successfully.", success: true });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
