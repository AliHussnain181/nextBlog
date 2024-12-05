import { checkAuth } from "@/utils/features";
import { NextResponse } from "next/server";

export const config = {
  api:{
    responseLimit: true
  }
}

export async function GET() {
  try {
    // Check the user's authentication status
    const user = await checkAuth();

    // If the user is not authenticated, return a 401 Unauthorized response
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "You must be logged in to access this resource."
      }, { status: 401 });
    }

    // Return user data if authenticated
    return NextResponse.json({
      success: true,
      user
    }, { status: 200 });

  } catch (error) {
    // Handle any unexpected errors and respond with a 500 Internal Server Error
    return NextResponse.json({
      success: false,
      message: "An internal server error occurred.",
      error: (error as Error).message // Avoid exposing full error details in production
    }, { status: 500 });
  }
}
