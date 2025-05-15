'use client';

import { PostProps } from "@/app/lib/types";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { ImageMedia } from "../../cms/media";
import generateHref from "@/app/lib/utils/generate-href";

export default function BoardImage({data}: { data: PostProps[]; }) {
  const pathname = usePathname().split('/').slice(1, 2).toString();
  const selected = usePathname().split('/').slice(2, 3).toString();
  const searchParams = useSearchParams();

   return (
    <div className="flex flex-wrap">
      {data.map((entry: PostProps) => (
        <div key={entry.documentId} className="h-20 overflow-hidden">
          {entry.documentId ? entry.thumbnail ?
            <Link href={generateHref(pathname, searchParams.toString(), entry?.documentId)}>
              <div
                className={clsx(
                  "relative top-0 left-0 transition-opacity h-20 w-20 overflow-hidden -z-10",
                  {"bg-[#00ffff]": entry.category === "notices"},
                  {"bg-[#ffff00]": entry.category === "events"},
                  {"bg-[#ff00ff]": entry.category === "exhibitions"},
                  {"bg-[#000000] text-gray-200": entry.category === "kookmins"},
                )}
              >
                  <ImageMedia media={entry?.thumbnail} size="medium" />
              </div>
              <p className="relative -top-20 left-0 h-20 w-20 opacity-0 hover:opacity-100 transition-opacity bg-white text-sm text-gray-700">{entry?.name}</p>
            </Link>
            :
            <Link href={generateHref(pathname, searchParams.toString(), entry?.documentId)}>
              <div
                className={clsx(
                  "p-4 h-20 w-20",
                  {"bg-[#00ffff]": entry.category === "notices"},
                  {"bg-[#ffff00]": entry.category === "events"},
                  {"bg-[#ff00ff]": entry.category === "exhibitions"},
                  {"bg-[#000000] text-gray-200": entry.category === "kookmins"},
                )}
              ></div>
              <p className={clsx(
                "relative -top-20 left-0 h-20 w-20 opacity-0 hover:opacity-100 transition-opacity bg-white text-sm text-gray-700",
                {"opacity-100": selected === entry?.documentId}
              )}>{entry?.name}</p>
            </Link>
            : <div>no documentId</div>
          }
        </div>
      ))}
    </div>
   );
}