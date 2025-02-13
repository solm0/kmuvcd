import { cookies } from "next/headers";

export async function fetchUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value || null;

  if (!token) {
    console.log("No token found, user is not authenticatedffff.");
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
    const text = await res.text();

    if (!text) {
      console.warn("Empty response from API");
      return null;
    }

    const data = JSON.parse(text);

    return data;
  } catch (error) {
    // Handle fetch or network error
    console.error("Error fetching user data:", error);
  }
}