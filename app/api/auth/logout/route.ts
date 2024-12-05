import { cookies } from 'next/headers';
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Delete the authentication token (mntoken) cookie
    const cookieStore = await cookies();
    cookieStore.delete('mntoken'); // This will remove the cookie from the client

    // Return a success response
    return NextResponse.json({
      success: true,
      message: "You have successfully logged out."
    }, { status: 200 });

  } catch (error) {
    // Return a generic error response with the correct status code
    return NextResponse.json({
      success: false,
      message: "An internal server error occurred.",
      error: (error as Error).message // Log the error message (you can also omit this for security reasons)
    }, { status: 500 });
  }
}
