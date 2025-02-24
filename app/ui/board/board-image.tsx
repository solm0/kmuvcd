'use client';

import { PostProps } from "@/app/lib/definitions";
import { usePathname, useSearchParams } from "next/navigation";
import queryFilter from "@/app/lib/query-filter";
import Link from "next/link";
import clsx from "clsx";
import { ImageMedia } from "../cms/media";

export default function BoardImage({data}: { data: PostProps[]}) {
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
   const filteredEntries = queryFilter(data, category, tag, search);

   return (
    <div className="flex gap-4">
      {filteredEntries.map((entry: PostProps) => (
        <div key={entry.documentId} className="max-w-96 min-w-48">
          {entry.documentId && entry.thumbnail ?
            <Link href={generateHref(pathname, searchParams.toString(), entry?.documentId)}>
              <div className={clsx("rounded-lg mb-4 hover:opacity-50", {"opacity-50": (subPath === entry?.documentId)})}>
                <div>
                  <ImageMedia media={entry?.thumbnail} size="medium" />
                </div>
                <p>{entry?.name}</p>
              </div>
            </Link>
            : <div className="rounded-lg p-4 mt-4 bg-gray-100">no documentId or thumbnail</div>
          }
        </div>
      ))}
    </div>
   );
}