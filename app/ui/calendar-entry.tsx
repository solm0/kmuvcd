'use client'

import { useState } from "react";
import { CalendarProps } from "@/app/lib/definitions";
import BookmarkButton from "./bookmark-button";
import Link from "next/link";

interface UserDataProps {
  id: number;
  documentId: string;
  username: string;
  email: string;
  confirmed?: boolean;
  blocked?: boolean;
  role?: {
    id?: number;
    name?: string;
  };
  calendars?: CalendarProps[];
}

export default function Calendar({ calendar, token, user, href }: { calendar: CalendarProps; token?: string; user:UserDataProps; href?: string; }) {
  const [userData] = useState<UserDataProps | null>(user);

  const isUser = userData?.id;

  const Content = (
    <>
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
    </>
  );

  return (
    <div className='rounded-lg bg-gray-100 p-4 hover:bg-gray-200 mt-4'>
      {href ? <Link href={href}>{Content}</Link> : Content}
      {isUser && calendar?.documentId && token ?
        <BookmarkButton calendarId={calendar?.documentId} token={token} user={user} />
        : <div>theres no logined user</div>
      }
    </div>
  );
}