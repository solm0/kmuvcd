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
  const subPathname = usePathname().split('/').slice(2, 3).toString();

  return (
    <>
      {data.map((entry: PostProps) => {
        return (
          <tr
            key={entry.documentId}
            onClick={() => redirect(generateHref(pathname, searchParams.toString(), entry?.documentId))}
            className={clsx(
              subPathname === entry?.documentId && "bg-gray-100",
              "h-12 hover:bg-gray-100 transition-colors"
            )}
          >
            <td className="flex items-center break-keep h-12">
              <div
                className={clsx(
                  {"bg-[#00ffff]": entry.category === "notices"},
                  {"bg-[#ffff00]": entry.category === "events"},
                  {"bg-[#ff00ff]": entry.category === "exhibitions"},
                  {"bg-[#000000] text-gray-200": entry.category === "kookmins"},
                  "h-8 flex items-center text-sm px-3"
                )}
              >
                {entry.tags[0].name}
              </div>
              {(entry.tags?.length > 1) ? <span className="pl-2">{`외 ${entry.tags?.length - 1}`}</span> : null}
            </td>
            <td>{entry?.name}</td>
          </tr>
      )})}
    </>
  );
}