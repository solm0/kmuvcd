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
    console.time("Middleware Execution Time");

    const user = await getUserMeSmall();
    console.log("User Status: ", user.ok);

    if (user.ok === false) {
      console.log("Redirecting to signin...");
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    console.timeEnd("Middleware Execution Time");
  }

  return NextResponse.next();
}

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