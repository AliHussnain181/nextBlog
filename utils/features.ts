import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "@/schema/user";
import { cookies } from "next/headers";
import cloudinary from "cloudinary";
import fs from "fs";

let isConnected = false;

export const connectToDB = async () => {
  if (!process.env.MONGO_URI) return console.log("Missing MongoDB URL");

  // If the connection is already established, return without creating a new connection.
  if (isConnected) {
    console.log("MongoDB connection already established");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "personalApp",
    });

    isConnected = true; // Set the connection status to true
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

connectToDB()

export const generateToken = (_id: string): string => {
  return jwt.sign({ _id }, process.env.JWT_SECRET!, { expiresIn: "12h" });
};

export const checkAuth = async () => {
  try {
    const token = (await cookies()).get("blogtoken")?.value;

    if (!token) {
      throw new Error("Token not found");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      _id: string;
    };

    if (!decoded._id) {
      throw new Error("Invalid token payload");
    }

    const user = await User.findById(decoded._id);

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error((error as Error).message || "Authentication failed");
  }
};

export const checkAdmin = async () => {
  try {
    const cookie = await cookies();

    let token = cookie.get("blogtoken")?.value;

    if (!token) {
      throw new Error("Token not found");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      _id: string;
    };
    if (!decoded._id) {
      throw new Error("Invalid token payload");
    }
    const user = await User.findById(decoded._id);
    if (!user || user.role !== "admin") {
      return false;
    }
    return true;
  } catch (error) {
    throw new Error((error as Error).message || "Admin check failed");
  }
};
cloudinary.v2.config({
  cloud_name: process.env.C_N,
  api_key: process.env.A_P,
  api_secret: process.env.A_S,
});

export const UploadOnCloude = async (file: string) => {
  try {
    const res = await cloudinary.v2.uploader.upload(file, {
      resource_type: "auto",
    });
    fs.unlinkSync(file);
    return res;
  } catch (error) {
    fs.unlinkSync(file); // remove the locally saved temporary file as the upload operation got failed
    console.error("Error uploading to Cloudinary", error);
    return null;
  }
};

export const deleteFromCloudinary = async (publicId: string): Promise<any> => {
  try {
    // Use the Cloudinary API to delete the resource with the provided publicId
    const result = await cloudinary.v2.uploader.destroy(publicId);
    console.log("Deleted from Cloudinary:", result);
    return result;
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw error;
  }
};


// export const fetcher = async <T>(url: string, options?: RequestInit): Promise<T> => {
//   const response = await fetch(url, { credentials: "include", ...options });

//   if (!response.ok) {
//     throw new Error(response.statusText);
//   }

//   return response.json();
// };
