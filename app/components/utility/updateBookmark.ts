import { getAuthToken } from "@/app/data/services/get-token-client";

export async function addBookmark(userId: string, calendarId: string) {
  const token = await getAuthToken();

  try {
    const res = await fetch(`https://kmuvcd-strapi.onrender.com/api/calendars/${calendarId}`, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",  // Make sure to set the correct content-type
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({  // Make sure to stringify the body
        data: {
          users: {
            connect: [`${userId}`]  // Correct format for associating the user
          }
        }
      })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to add calendar: ${data.message || 'Unknown error'}`);
    }

    console.log('User successfully connected from the calendar')
  } catch (error) {
    console.error("Error adding bookmark:", error);
    throw new Error("Failed to add bookmark");
  }

}

export async function removeBookmark(userId: string, calendarId: string) {
  const token = await getAuthToken();

  try {
    const res = await fetch(`https://kmuvcd-strapi.onrender.com/api/calendars/${calendarId}?populate=*`, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",  // Make sure to set the correct content-type
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({  // Make sure to stringify the body
        data: {
          users: {
            disconnect: [`${userId}`]  // Correct format for associating the user
          }
        }
      })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to remove calendar: ${data.message || 'Unknown error'}`);
    }

    console.log('User successfully disconnected from the calendar')
  } catch (error) {
    console.error("Error removing bookmarkkkkk:", error);
    throw new Error("Failed to remove bookmark");
  }
}