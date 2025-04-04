// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use client'

import { PostProps } from "@/app/lib/types";
import clsx from "clsx";
import { useSearchParams, usePathname, redirect } from "next/navigation";
import generateHref from "@/app/lib/utils/generate-href";

export default function BoardList({ data }: { data: PostProps[]; }) {
  const pathname = usePathname().split('/').slice(1, 2).toString();
  const searchParams = useSearchParams();

  return (
    <>
      {data.map((entry: PostProps) => {
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