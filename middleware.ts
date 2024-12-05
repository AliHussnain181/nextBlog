import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define route groups for easier management
const PUBLIC_ROUTES = new Set(["/", "/login"]); // Routes accessible without authentication
const PROTECTED_ROUTES = new Set(["/blogs", "/profile"]); // Routes requiring authentication

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl; // Extract the path
  const authToken = request.cookies.get("mntoken"); // Get the authentication token from cookies

  const isAuthenticated = Boolean(authToken?.value); // Boolean flag for authentication status
console.log(isAuthenticated);

  // Debugging (remove or disable in production)
  // console.debug(`Path: ${pathname}, Authenticated: ${isAuthenticated}`);

  // Handle unauthenticated users
  if (!isAuthenticated) {
    // Redirect if accessing a protected route
    if (PROTECTED_ROUTES.has(pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Allow access to public routes
    return NextResponse.next();
  }

  // Handle authenticated users
  if (isAuthenticated) {
    // Redirect if accessing a public-only route
    if (PUBLIC_ROUTES.has(pathname)) {
      return NextResponse.redirect(new URL("/blogs", request.url)); // Default authenticated route
    }
    // Allow access to protected routes
    return NextResponse.next();
  }

  // Fallback (shouldn't be reached in normal cases)
  console.error("Unexpected middleware flow. Please check routes configuration.");
  return NextResponse.next();
}

// Middleware configuration
export const config = {
  matcher: [
    "/", // Public route
    "/login", // Public route
    "/blogs", // Protected route
    "/profile", // Protected route
  ],
};
