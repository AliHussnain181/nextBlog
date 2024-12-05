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

export const generateToken = (_id: any) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET!);
};

export const checkAuth = async () => {
  const cookie = await cookies();

  let token = cookie.get("mntoken")?.value;

  if (!token) {
    throw new Error("Token not found");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string };

  return await User.findById(decoded._id);
};

export const checkAdmin = async () => {
  const cookie = await cookies();

  let token = cookie.get("mntoken")?.value;

  if (!token) {
    throw new Error("Token not found");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string };

  const user = await User.findById(decoded._id);

  return user && user.role === "admin";
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
    return null;
  }
};

export const deleteFromCloudinary = async (publicId:string): Promise<any> => {
  try {
    // Use the Cloudinary API to delete the resource with the provided publicId
    const result = await cloudinary.v2.uploader.destroy(publicId);
    console.log("Deleted from Cloudinary:", result);
    return result;
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw error;
  }
}
