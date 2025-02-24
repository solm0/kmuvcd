'use client'

import { useState } from "react";
import { PostProps, UserDataProps } from "@/app/lib/definitions";
import clsx from "clsx";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import queryFilter from "@/app/lib/query-filter";

export default function BoardList({ data, token, user }: { data: PostProps[]; token?: string; user:UserDataProps; }) {
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
  
  const isUser = userData?.id;

  console.log(token, isUser);

  // 카테고리, 태그 필터
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  const search = searchParams.get('search');
  const filteredEntries = queryFilter(data, category, tag, search);

  return (
    <>
      {filteredEntries.map((entry: PostProps) => (
        <div key={entry.documentId}>
        {entry.documentId ?
          <Link href={generateHref(pathname, searchParams.toString(), entry?.documentId)}
          >
            <div className={clsx("rounded-lg p-4 mb-4 bg-gray-100 hover:bg-gray-300", {"bg-gray-300": (subPath === entry?.documentId)})}>
              <p>{entry?.name}</p>
              <p>{entry?.author}</p>
              <p>{entry?.publishedAt}</p>
              <p>{entry?.category}</p>
              {/* <div className="flex flex-wrap gap-2 mt-2">
                {entry?.tags?.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-red-300 text-red-900 px-2 py-1 rounded-md text-sm"
                    >
                        {tag.tag}
                    </span>
                ))}
              </div> */}
            </div>
          </Link>
          :
          <div className="rounded-lg p-4 mt-4 bg-gray-100">
            f
          </div>
        }
        </div>
      ))}
    </>
  );
}