import { connectToDB, generateToken } from "@/utils/features";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { User } from "@/schema/user";
import { z } from 'zod';  // Using Zod for schema validation

// Define input validation schema using Zod
const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export async function POST(req: Request) {
  try {
    // Parse and validate request body
    const body = await req.json();
    const { name, email, password } = userSchema.parse(body);

    // Connect to the database, if not already connected
    await connectToDB();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: 'Email already registered.',
      }, { status: 409 });
    }

    // Hash the password with a strong salt round factor
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user in the database
    const user = await User.create({ name, email, password: hashedPassword });

    // Generate authentication token
    const token = generateToken(user._id);

    // Set the secure cookie options dynamically based on the environment
    const isProduction = process.env.NODE_ENV === 'production';
    cookies().set('mntoken', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      path: "/",
      maxAge: 15 * 24 * 60 * 60 * 1000,  // 15 days
    });

    // Return a success response
    return NextResponse.json({
      success: true,
      message: 'User registered successfully.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    }, { status: 201 });

  } catch (error) {
    // Handle Zod validation errors separately
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Invalid input.',
        errors: error.errors,
      }, { status: 400 });
    }

    // Return a generic error message
    return NextResponse.json({
      success: false,
      message: 'An internal server error occurred.',
    }, { status: 500 });
  }
}
