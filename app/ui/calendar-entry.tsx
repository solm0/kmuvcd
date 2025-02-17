'use client'

import { useState } from "react";
import { CalendarProps } from "@/app/lib/definitions";
import BookmarkButton from "./bookmark-button";
import Link from "next/link";
import clsx from "clsx";

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

export default function CalendarEntry({ data, token, user, href }: { data: CalendarProps; token?: string; user:UserDataProps; href?: string; }) {
  const [userData] = useState<UserDataProps | null>(user);

  const isUser = userData?.id;

  const Content = (
    <>
      <p>{data?.name}</p>
      <p>{data?.startDate} - {data?.endDate || data?.startDate}</p>
      <p>{data?.location}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {data?.tags?.map((tag, index) => (
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
    <div className={clsx(
      'rounded-lg bg-gray-100 p-4 mt-4',
      {
        'hover:bg-gray-200': href,
      },
    )}
    >
      {href ? <Link href={href}>{Content}</Link> : Content}
      {isUser && data?.documentId && token ?
        <BookmarkButton calendarId={data?.documentId} token={token} user={user} />
        : <div></div>
      }
    </div>
  );
}