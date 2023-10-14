import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "@/schema/user";
import { cookies } from 'next/headers'

let isConnected = false; 

export const connectToDB = async () => {
  // Set strict query mode for Mongoose to prevent unknown field queries.
  mongoose.set("strictQuery", true);

  if (!process.env.MONGO_URI) return console.log("Missing MongoDB URL");

  // If the connection is already established, return without creating a new connection.
  if (isConnected) {
    console.log("MongoDB connection already established");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI,{
      dbName:"personalApp"
    });

    isConnected = true; // Set the connection status to true
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export const generateToken = (_id:any) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET!);
};


export const checkAuth = async () => {

  const cookie = cookies()

  let token = cookie.get('mntoken')?.value

  if (!token) {
    throw new Error('Token not found');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!)as { _id: string };

  return await User.findById(decoded._id);
}

export const checkAdmin = async () => {

  const cookie = cookies()

  let token = cookie.get('mntoken')?.value

  if (!token) {
    throw new Error('Token not found');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!)as { _id: string };

  const user = await User.findById(decoded._id)

  return user && user.role === 'admin';
}
