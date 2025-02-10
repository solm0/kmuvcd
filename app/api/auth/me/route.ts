import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value || null;

  if (!token) {
    console.log("No token found, user is not authenticated.");
    return;
  }

  try {
    const res = await fetch("https://kmuvcd-strapi.onrender.com/api/users/me?populate[calendars][populate][0]=detail&populate[calendars][populate][1]=tags&populate[role]=true", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await res.json();
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
  }
}