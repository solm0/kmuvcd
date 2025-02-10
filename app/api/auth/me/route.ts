import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value || null;

  // If no token is found, return 401 Unauthorized
  if (!token) {
    console.log("No token found, user is not authenticated.");
    return NextResponse.json({ error: "Unauthorized: No token found" }, { status: 401 });
  }

  try {
    // Making request to Strapi with Authorization header
    const res = await fetch("https://kmuvcd-strapi.onrender.com/api/users/me?populate[calendars][populate][0]=detail&populate[calendars][populate][1]=tags&populate[role]=true", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if response is OK
    if (!res.ok) {
      // Handle non-2xx status codes (e.g., 401, 403, etc.)
      throw new Error(`Failed to fetch user data: ${res.statusText}`);
    }

    // Parse response data
    const data = await res.json();
    return NextResponse.json({ data });
  } catch (error) {
    // Handle fetch or network error
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
  }
}