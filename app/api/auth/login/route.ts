import { User } from "@/schema/user";
import { generateToken, connectToDB } from "@/utils/features";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { z } from 'zod'; // Schema validation

// Define schema validation for the request body
const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 8 characters long')
});

export async function POST(req: Request) {
  try {
    // Parse and validate the request body
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    // Ensure a connection to the database is established
    await connectToDB();

    // Find the user in the database and explicitly select the password field
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        message: 'Incorrect email or password' 
      }, { status: 401 });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ 
        success: false, 
        message: 'Incorrect email or password' 
      }, { status: 401 });
    }

    // Generate an authentication token for the user
    const token = generateToken(user._id);

    // Set the cookie with security options based on the environment
    const isProduction = process.env.NODE_ENV === 'production';
    cookies().set('mntoken', token, {
      httpOnly: true,
      secure: isProduction,  // Only set secure flag in production
      path: "/",
      sameSite: 'strict',
      maxAge: 15 * 24 * 60 * 60 * 1000  // 15 days
    });

    // Return a success response with the user data
    return NextResponse.json({
      success: true,
      message: `${user.name} logged in successfully.`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    }, { status: 200 });

  } catch (error) {
    // Handle schema validation errors from Zod
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid input data', 
        errors: error.errors 
      }, { status: 400 });
    }

    // Handle generic errors
    return NextResponse.json({
      success: false,
      message: 'An internal server error occurred.',
    }, { status: 500 });
  }
}
