export async function getAuthToken() {
  if (typeof window === "undefined") return null; // Prevent server-side usage
  console.log(document.cookie, "fff");
  const cookies = document.cookie.split("; ").find(row => row.startsWith("jwt="));
  return cookies ? cookies.split("=")[1] : null;
}