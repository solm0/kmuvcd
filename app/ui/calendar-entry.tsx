'use client'

import { useState } from "react";
import { CalendarProps, UserDataProps } from "@/app/lib/definitions";
// import BookmarkButton from "./bookmark-button";
// import Link from "next/link";
// import clsx from "clsx";
import { useSearchParams } from "next/navigation";

// interface EntryProps {
//   start: number,
//   end: number,
//   // row: number,
// }

export default function CalendarEntry({ data, token, user }: { data: CalendarProps[]; token?: string; user:UserDataProps; }) {
  const [userData] = useState<UserDataProps | null>(user);

  const isUser = userData?.id;

  console.log(token, isUser);

  // 태그 필터링
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');
  let filteredCalendarEntries
  
  if (tag === '*') {
    filteredCalendarEntries = data;
  } else {
    filteredCalendarEntries = data.filter((entry) => {
      return tag && Array.isArray(entry.tags) && entry.tags.some(t => t.tag === tag);
    })
  }

  return (
    <div className='rounded-lg bg-gray-100 p-4 mt-4'>
      {filteredCalendarEntries.map((entry: CalendarProps, index) => (
        <div key={index}>
          <p>{entry?.name}</p>
          <p>{entry?.startDate} - {entry?.endDate || entry?.startDate}</p>
          <p>{entry?.location}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {entry?.tags?.map((tag, index) => (
                <span
                    key={index}
                    className="bg-red-300 text-red-900 px-2 py-1 rounded-md text-sm"
                >
                    {tag.tag}
                </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}