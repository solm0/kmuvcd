'use client'

import { useState} from "react";
import { PostProps, UserDataProps } from "@/app/lib/definitions";
import clsx from "clsx";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import BookmarkButton from "../bookmark-button";

export default function BookmarkList({ data, token, user }: { data: PostProps[]; token?: string; user:UserDataProps; }) {
  const pathname = usePathname();
  const subPath = pathname.split('/').slice(2, 3).toString();
  const searchParams = useSearchParams();
  const [userData] = useState<UserDataProps | null>(user);

  const generateHref = (pathname: string, searchParams: string, documentId: string) => {
    if (subPath !== documentId) {
      const cleanPathname =  pathname.split('/').slice(0, 2).join('/');
      return `${cleanPathname}/${documentId}?${searchParams}`;
    } else {
      const cleanPathname = pathname.split('/').slice(0, 2).join('/');
      return `${cleanPathname}?${searchParams}`;
    }
  }

  const categories = ["clubs", "events", "exhibitions", "notices", "kookmins"];
  const allPostIds = categories.flatMap(
    (category) => ((userData as unknown as Record<string, PostProps[]>)[category] || [])
      .map((post) => post.documentId)
  );

  const filteredEntries = data.filter(post => allPostIds.includes(post.documentId));

  console.log(filteredEntries)


  return (
    <>
      {filteredEntries.map((entry: PostProps) => (
        <div key={entry.documentId}>
        {entry.documentId ?
        <div className={clsx("rounded-lg p-4 mb-4 bg-gray-100 hover:bg-gray-300", {"bg-gray-300": (subPath === entry?.documentId)})}>
          <Link href={generateHref(pathname, searchParams.toString(), entry?.documentId)}>
            <div>
              <p>{entry?.name}</p>
              <p>작성자: {entry?.author}</p>
              <p>{entry?.publishedAt?.slice(0,10)} 작성</p>
              {entry.startDate && <p>{entry.startDate}{entry.endDate && `-${entry.endDate}`}</p>}
              <p>{entry?.category}</p>
            </div>
          </Link>
          {entry.documentId && token && user && entry.category && <BookmarkButton postId={entry.documentId} token={token} user={user} category={entry.category} />}
        </div>
          :
          <div className="rounded-lg p-4 mt-4 bg-gray-100">no documentId</div>
        }
        </div>
      ))}
    </>
  );
}