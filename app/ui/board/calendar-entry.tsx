'use client'

import { UserDataProps, PostProps } from "@/app/lib/definitions";
import { useState, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

interface EntryProps {
  start: number,
  end: number,
  // row: number,
}

// index는 나중에 prop에서 삭제...
export default function CalendarEntry({ entryPosition, index, data, token, user }: { entryPosition: EntryProps; index: number; data:PostProps; token?: string; user: UserDataProps; }) {
  const [userData] = useState<UserDataProps | null>(user);
  const [isBookmarked, setIsBookmarked] = useState(false);

  console.log(token);

  const pathname = usePathname();
  const subPath = pathname.split('/').slice(2, 3).toString();
  const searchParams = useSearchParams();

  const generateHref = (pathname: string, searchParams: string, documentId: string) => {
    if (subPath !== documentId) {
      const cleanPathname =  pathname.split('/').slice(0, 2).join('/');
      return `${cleanPathname}/${documentId}?${searchParams}`;
    } else {
      const cleanPathname = pathname.split('/').slice(0, 2).join('/');
      return `${cleanPathname}?${searchParams}`;
    }
  }

  const postId = data.documentId;

  useEffect(() => {
    if (userData) {
      const categories = ["clubs", "events", "exhibitions", "notices", "kookmins"];
      const allPostIds = categories.flatMap(
        (category) => ((userData as unknown as Record<string, PostProps[]>)[category] || [])
          .map((post) => post.documentId)
      );
      setIsBookmarked(allPostIds.includes(postId));
    }
  }, [userData, postId]);

  // console.log(data)

  return (
    <>
      {data.documentId &&
        <Link
          key={`${data.documentId}-${index}`}
          href={generateHref(pathname, searchParams.toString(), data?.documentId)}
          className={clsx("bg-blue-300 hover:bg-blue-400", {"border border-red-500": isBookmarked}, {"bg-blue-400": (subPath === data?.documentId)})}
          style={{
            gridRowStart: index+1, // entryPosition.row
            gridRowEnd: index+2,
            gridColumnStart: entryPosition.start,
            gridColumnEnd: entryPosition.end+1,
          }}
        >
          <p className="text-xs text-nowrap">{data.name}, {data.startDate}-{data.endDate}
            <span className="text-red-600">{entryPosition.start}, {entryPosition.end+1}, {entryPosition.end+1 - entryPosition.start}칸</span>
          </p>
        </Link>
      }
    </>
  );
}