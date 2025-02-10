'use client'

import { useState, useEffect } from "react";
import { CalendarProps } from "@/app/types";

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
      {isBookmarked ? <p>Bookmarked</p> : <p>is not Bookmarked</p>}
    </div>
  )
}