import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeSmall } from "./app/lib/services/get-user-me-small";

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
  const currentPath = request.nextUrl.pathname;

  if (isProtectedRoute(currentPath)) {
    const user = await getUserMeSmall();

    if (user.ok === false) {
      console.log("Redirecting to signin...");
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/myprofile"
  ],
};