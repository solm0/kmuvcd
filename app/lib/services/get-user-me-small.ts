import { getAuthToken } from "./get-token";

export async function getUserMeSmall() {
  const baseUrl = "https://kmuvcd-strapi.onrender.com";
  const url = new URL("/api/users/me", baseUrl);

  const token = await getAuthToken();
  if (!token) return { ok: false, data: null, error: null };

  try {
    const res = await fetch(url.href, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.error) return { ok: false, data: null, error: data.error };
    
    return data;
  } catch (error) {
    console.log("Error fetching user data in getUserMeLoader:", error);
  }
}