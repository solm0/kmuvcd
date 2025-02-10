'use client'

import { useState, useEffect } from "react";
import { CalendarProps } from "@/app/types";
import { BookmarkIcon as BookmarkOutlineIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";

interface UserDataProps {
  id: number;
  calendars?: CalendarProps[];
}

export default function BookmarkButton ({ calendarId }: { calendarId: string}) {
  const [userData, setUserData] = useState<UserDataProps | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

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

  useEffect(() => {
    if (userData?.calendars) {
      const calendarIds = userData.calendars.map((calendar) => calendar.documentId);
      setIsBookmarked(calendarIds.includes(calendarId));
    }
  }, [userData, calendarId]);

  return (
    <div>
      {isBookmarked ? 
        <BookmarkSolidIcon className="w-6 h-6 text-gray-400 hover:text-gray-500" />
      : 
        <BookmarkOutlineIcon className="w-6 h-6 text-gray-500 hover:text-gray-600" />
      }
    </div>
  )
}
