// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client'

import { PostProps, UserDataProps } from "@/app/lib/definitions";
import clsx from "clsx";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import queryFilter from "@/app/lib/query-filter";
import bookmarkFilter from "@/app/lib/bookmark-filter";

export default function BoardList({ data, user }: { data: PostProps[]; user: UserDataProps }) {
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

  // 카테고리, 태그 필터
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  const search = searchParams.get('search');
  const bookmark = searchParams.get('bookmark');
  const filteredEntries = queryFilter(data, category, tag, search);
  const bookmarkEntries = bookmarkFilter(filteredEntries, bookmark, user);

  const colors = {
    "notices": "green",
    "events": "purple",
    "exhibitions": "orange",
    "clubs": "pink",
    "kookmins": "blue",
  }

  const colorVariants = {
    green: "bg-green-400 hover:bg-opacity-50",
    purple: "bg-purple-400 hover:bg-opacity-50",
    orange: "bg-orange-400 hover:bg-opacity-50",
    pink: "bg-pink-400 hover:bg-opacity-50",
    blue: "bg-blue-400 hover:bg-opacity-50",
  };

  return (
    <>
      {bookmarkEntries.map((entry: PostProps) => {
        const colorCategory = entry.category as keyof typeof colorVariants;

        return (
        <div key={entry.documentId}>
        {entry.documentId ?
          <Link href={generateHref(pathname, searchParams.toString(), entry?.documentId)}>
            <div className={clsx(
              subPath === entry?.documentId ? "opacity-50 hover:!bg-opacity-100" : "hover:bg-opacity-50",
              colorVariants[colors[colorCategory]],
              "p-4 mb-4",
            )}>
              <p>{entry?.name}</p>
              {entry.startDate && <p>기간: {entry.startDate}{entry.endDate && `-${entry.endDate}`}</p>}
              {entry.author && <p>작성자: {entry?.author}</p>}
              <p>작성일: {entry?.publishedAt?.slice(0,10)}</p>
            </div>
          </Link>
          :
          <div className="p-4 mt-4 bg-gray-100">no documentId</div>
        }
        </div>
      )})}
    </>
  );
}