// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client'

import { PostProps } from "@/app/lib/definitions";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { useHoveredStore } from "@/app/lib/useHoveredStore";
import generateHref from "@/app/lib/generate-href";

interface EntryProps {
  start: number,
  end: number,
}

export default function CalendarEntry({ entryPosition, index, data }: { entryPosition: EntryProps; index: number; data:PostProps; }) {
  const pathname = usePathname();
  const subPath = pathname.split('/').slice(2, 3).toString();
  const searchParams = useSearchParams();

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

  const category = data.category as keyof typeof colorVariants;

  const setHoveredDate = useHoveredStore((state) => state.setHoveredDate);

  return (
    <>
      {data.documentId &&
        <Link
          key={`${data.documentId}-${index}`}
          href={generateHref(pathname, searchParams.toString(), data?.documentId, subPath)}
          className={clsx(
            subPath === data?.documentId ? "opacity-50 hover:!bg-opacity-100" : "hover:bg-opacity-50",
            colorVariants[colors[category]], 
            "flex items-center h-8 z-10"
          )}
          style={{
            gridRowStart: index+1, // entryPosition.row
            gridRowEnd: index+2,
            gridColumnStart: entryPosition.start,
            gridColumnEnd: entryPosition.end+1,
          }}
          onMouseEnter={() => setHoveredDate({ startDate: data.startDate, endDate: data.endDate })}
          onMouseLeave={() => setHoveredDate(null)}
        >
          <p className="text-sm text-nowrap">{data.name}
            {/* <span className="text-gray-800 opacity-50">{data.startDate}-{data.endDate}, {entryPosition.start}, {entryPosition.end+1}, {entryPosition.end+1 - entryPosition.start}칸</span> */}
          </p>
        </Link>
      }
    </>
  );
}