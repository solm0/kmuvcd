'use client'

import { useState } from "react";
import { PostProps, UserDataProps } from "@/app/lib/definitions";
import clsx from "clsx";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

const generateHref = (pathname: string, searchParams: string, subPath: string) => {
  const cleanPathname =  pathname.split('/').slice(0, 2).join('/');
  return `${cleanPathname}/${subPath}?${searchParams}`;
}

export default function BoardList({ data, token, user }: { data: PostProps[]; token?: string; user:UserDataProps; }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [userData] = useState<UserDataProps | null>(user);
  
  const isUser = userData?.id;

  console.log(token, isUser);

  const subPath = pathname.split('/').slice(2, 3).toString();

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

  // console.log("categoryFiltered", categoryFiltered)

  // 태그 필터링 TODO
  // const tag = searchParams.get('tag');
  // let tagFiltered
  
  // if (tag === '*') {
  //   tagFiltered = categoryFiltered;
  // } else {
  //   tagFiltered = categoryFiltered.filter((entry) => {
  //     return tag && Array.isArray(entry.tags) && entry.tags.some(t => t.tag === tag);
  //   })
  // }

  // console.log("tagFiltered", tagFiltered)

  return (
    <>
      {categoryFiltered.map((entry: PostProps, index) => (
        <div key={index}>
        {entry.documentId ?
          <Link href={generateHref(pathname, searchParams.toString(), entry?.documentId)}>
            <div className={clsx("rounded-lg p-4 mt-4 bg-gray-100 hover:bg-gray-300", {"bg-gray-300": (subPath === entry?.documentId)})}>
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