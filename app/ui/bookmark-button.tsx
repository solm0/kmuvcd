'use client'

import { useState, useEffect } from "react";
import { CalendarProps } from "@/app/lib/definitions";
import { BookmarkIcon as BookmarkOutlineIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";
import { addBookmark, removeBookmark } from "../lib/updateBookmark";

interface UserDataProps {
  id: number;
  documentId: string;
  calendars?: CalendarProps[];
}

export default function BookmarkButton ({ calendarId, token, user }: { calendarId: string; token: string; user: UserDataProps} ) {
  const [userData, setUserData] = useState<UserDataProps | null>(user);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (userData?.calendars) {
      const calendarIds = userData.calendars.map((calendar) => calendar.documentId);
      setIsBookmarked(calendarIds.includes(calendarId));
    }
  }, [userData, calendarId]);

  // userId와 calendarId를 argument로 updateBookmark에 보낸다.
  // 그럼 updateBookmark에서는 토큰을 가져오고, user id 로 url을 만들어서 PUT으로 connect/disconnect를 힌다.
  // 버튼은 userData가 바뀌었으므로 재랜더링된다.

  const handleAddBookmark = async () => {
    if (userData?.id && calendarId) {
      try {
        const result = await addBookmark(userData?.documentId, calendarId, token);
        console.log("Bookmark added:", result);

        setIsBookmarked(true);
        setUserData((prev) =>
          prev
            ? {
                ...prev,
                calendars: [
                  ...(prev.calendars || []),
                  { documentId: calendarId, publishedAt: "" } as CalendarProps, // Ensure it matches CalendarProps
                ],
              }
            : prev
        );
      } catch (error) {
        console.log("Error adding bookmark:", error);
      }
    }
  };

  const handleRemoveBookmark = async () => {
    if (userData?.id && calendarId) {
      try {
        const result = await removeBookmark(userData?.documentId, calendarId, token);
        console.log("Bookmark deleted:", result);

        setIsBookmarked(false);
        setUserData((prev) =>
          prev
            ? {
                ...prev,
                calendars: prev.calendars?.filter((calendar) => calendar.documentId !== calendarId) || [],
              }
            : prev
        );
      } catch (error) {
        console.log("Error delettttting bookmark:", error);
      }
    }
  };

  return (
    <div>
      {isBookmarked ? 
        <button onClick={handleRemoveBookmark}>
          <BookmarkSolidIcon className="w-6 h-6 text-gray-400 hover:text-gray-500" />
        </button>
      : 
        <button onClick={handleAddBookmark}>
          <BookmarkOutlineIcon className="w-6 h-6 text-gray-500 hover:text-gray-600" />
        </button>
      }
    </div>
  )
}
