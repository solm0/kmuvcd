// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use client'

import { PostProps, UserDataProps } from "@/app/lib/definitions";
import clsx from "clsx";
import { useSearchParams, usePathname, redirect } from "next/navigation";
import queryFilter from "@/app/lib/query-filter";
import bookmarkFilter from "@/app/lib/bookmark-filter";
import generateHref from "@/app/lib/generate-href";

export default function BoardList({ data, user }: { data: PostProps[]; user: UserDataProps }) {
  const pathname = usePathname().split('/').slice(1, 2).toString();
  const searchParams = useSearchParams();

  // 카테고리, 태그 필터
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  const search = searchParams.get('search');
  const bookmark = searchParams.get('bookmark');
  const filteredEntries = queryFilter(data, category, tag, search);
  const bookmarkEntries = bookmarkFilter(filteredEntries, bookmark, user);

  return (
    <>
      {bookmarkEntries.map((entry: PostProps) => {
        return (
          <tr
            key={entry.documentId}
            onClick={() => redirect(generateHref(pathname, searchParams.toString(), entry?.documentId))}
            className={clsx(
              pathname === entry?.documentId && "bg-gray-100",
              "h-12 hover:bg-gray-100"
            )}
          >
                <td className="pr-4">{entry?.name}</td>
                <td className="pr-4">
                  <div
                    className={clsx(
                      {"bg-[#000000] text-[#ffffff]": entry.category === "notices"},
                      {"bg-[#ffff00]": entry.category === "events"},
                      {"bg-[#ff00ff]": entry.category === "exhibitions"},
                      {"bg-[#00ffff]": entry.category === "clubs"},
                      {"bg-[#eeeeee]": entry.category === "kookmins"},
                      "p-2 rounded-full text-center text-sm"
                    )}
                  >
                    {entry.category && entry?.category}
                  </div>
                </td>
                {/* <td>{entry.startDate && <p>{entry.startDate}{entry.endDate && `-${entry.endDate}`}</p>}</td> */}
                <td className="pr-4">{entry.author && entry?.author}</td>
                <td>{entry?.publishedAt?.slice(0,10)}</td>

          </tr>
      )})}
    </>
  );
}