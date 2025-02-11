'use client'

import { useState, useEffect } from "react";
import { CalendarProps } from "@/app/types";
import BookmarkButton from "./bookmark-button";

interface UserDataProps {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  role: {
    id: number;
    name: string;
  };
  calendars?: CalendarProps[];
}

export default function Calendar({ calendar, token }: { calendar: CalendarProps; token?: string }) {
  const [userData, setUserData] = useState<UserDataProps | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");

        if (!res.ok) {
          console.warn(`User not logged in: ${res.status} ${res.statusText}`);
          setUserData(null); // Clear user data if unauthorized
          return;
        }

        const text = await res.text();

        if (!text) {
          console.warn("Empty response from API");
          setUserData(null);
          return;
        }

        const data = JSON.parse(text);
        setUserData(data.data || null);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }
    fetchUser();
  }, []);


  const isUser = userData?.id;

  return (
    <div className='rounded-lg bg-gray-100 p-4 hover:bg-gray-200'>
        <p>{calendar?.name}</p>
        <p>{calendar?.startDate} - {calendar?.endDate || calendar?.startDate}</p>
        <p>{calendar?.location}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {calendar?.tags?.map((tag, index) => (
              <span
                  key={index}
                  className="bg-red-300 text-red-900 px-2 py-1 rounded-md text-sm"
              >
                  {tag.tag}
              </span>
          ))}
        </div>
        {isUser && calendar?.documentId && token ?
          <BookmarkButton calendarId={calendar?.documentId} token={token} />
          : <div>theres no logined user</div>
        }
    </div>
  );
}