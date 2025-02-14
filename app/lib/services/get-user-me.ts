import { getAuthToken } from "./get-token";

export async function getUserMe(detailed = false) {
  const baseUrl = "https://kmuvcd-strapi.onrender.com";

  const endpoint = detailed
    ? "/api/users/me?populate[calendars][populate][0]=detail&populate[calendars][populate][1]=tags&populate[role]=true"
    : "/api/users/me";
  
  const url = new URL(endpoint, baseUrl);
  
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

    return { ok: true, data: data, error: null };
  } catch (error) {
    console.error("Error fetching user data in getUserMe:", error);
    return { ok: false, data: null, error };
  }
}