import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value || null;
  const token = cookieStore.get("jwt")?.value || null;

  if (!username) {
    console.log("No username found, user is not authenticated.");
    return;
  }

  if (!token) {
    console.log("No token found, user is not authenticated.");
    return;
  }

  try {
    const res = await fetch("https://kmuvcd-strapi.onrender.com/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await res.json();
    return NextResponse.json({ username, data });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
  }
}