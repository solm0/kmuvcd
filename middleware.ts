import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "./app/data/services/get-user-me-loader";

// Define an array of protected routes
const protectedRoutes = [
  "/myprofile",
  // Add more protected routes here
];

// Helper function to check if a path is protected
function isProtectedRoute(path: string): boolean {
  return protectedRoutes.some((route) => path.startsWith(route));
}

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();
  const currentPath = request.nextUrl.pathname;

  console.log("Request URL:", request.url); 
  console.log("Current Path: ", currentPath); // Log the current path to ensure it's being matched
  console.log("User Status: ", user.ok); // Log user status to check authentication status

  if (isProtectedRoute(currentPath) && user.ok === false) {
    console.log("Redirecting to signin..."); // Add logging here
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

// Optionally, you can add a matcher to optimize performance
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};