'use client'

import { useState } from "react";
import { CalendarProps, UserDataProps } from "@/app/lib/definitions";
// import BookmarkButton from "./bookmark-button";
// import Link from "next/link";
// import clsx from "clsx";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

// interface EntryProps {
//   start: number,
//   end: number,
//   // row: number,
// }

const generateHref = (pathname: string, searchParams: string, subPath: string) => {
  const cleanPathname =  pathname.split('/').slice(0, 2).join('/');
  return `${cleanPathname}/${subPath}?${searchParams}`;
}

export default function CalendarEntry({ data, token, user }: { data: CalendarProps[]; token?: string; user:UserDataProps; }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [userData] = useState<UserDataProps | null>(user);
  
  const isUser = userData?.id;

  console.log(token, isUser);

  // 카테고리 필터링
  const category = searchParams.get('category');
  let categoryFiltered;

  if (category === '*') {
    categoryFiltered = data;
  } else {
    categoryFiltered = data.filter((entry) => {
      console.log(entry.category)
      return category && entry.category === category;
    })
  }

  console.log("categoryFiltered", categoryFiltered)

  // 태그 필터링
  const tag = searchParams.get('tag');
  let tagFiltered
  
  if (tag === '*') {
    tagFiltered = categoryFiltered;
  } else {
    tagFiltered = categoryFiltered.filter((entry) => {
      return tag && Array.isArray(entry.tags) && entry.tags.some(t => t.tag === tag);
    })
  }

  console.log("tagFiltered", tagFiltered)

  return (
    <>
      {tagFiltered.map((entry: CalendarProps) => (
        <div key={entry.documentId}>
        {entry.subPath ?
          <Link href={generateHref(pathname, searchParams.toString(), entry?.subPath)}>
            <div className="rounded-lg p-4 mt-4 bg-gray-100 hover:bg-gray-300">
              <p>{entry?.name}</p>
              <p>{entry?.startDate} - {entry?.endDate || entry?.startDate}</p>
              <p>{entry?.location}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {entry?.tags?.map((tag) => (
                    <span
                        key={tag.id}
                        className="bg-red-300 text-red-900 px-2 py-1 rounded-md text-sm"
                    >
                        {tag.tag}
                    </span>
                ))}
              </div>
            </div>
          </Link>
          :
          <div className="rounded-lg p-4 mt-4 bg-gray-100">
            <p>{entry?.name}</p>
            <p>{entry?.startDate} - {entry?.endDate || entry?.startDate}</p>
            <p>{entry?.location}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {entry?.tags?.map((tag) => (
                  <span
                      key={tag.documentId}
                      className="bg-red-300 text-red-900 px-2 py-1 rounded-md text-sm"
                  >
                      {tag.tag}
                  </span>
              ))}
            </div>
          </div>
        }
        </div>
      ))}
    </>
  );
}