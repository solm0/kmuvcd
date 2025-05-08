'use client'

import { PostProps } from "@/app/lib/types";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { useHoveredStore } from "@/app/lib/store/useHoveredStore";
import generateHref from "@/app/lib/utils/generate-href";

interface EntryProps {
  start: number,
  end: number,
}

export default function CalendarEntry({ entryPosition, index, data }: { entryPosition: EntryProps; index: number; data:PostProps; }) {
  const pathname = usePathname().split('/').slice(1, 2).toString();
  const searchParams = useSearchParams();

  const setHoveredDate = useHoveredStore((state) => state.setHoveredDate);

  return (
    <>
      {data.documentId &&
        <Link
          key={`${data.documentId}-${index}`}
          href={generateHref(pathname, searchParams.toString(), data?.documentId)}
          className={clsx(
            pathname === data?.documentId ? "opacity-50 hover:!bg-opacity-100" : "hover:bg-opacity-50",
            "flex items-center h-8 z-10",
            {"bg-[#00ffff]": data.category === "notices"},
            {"bg-[#ffff00]": data.category === "events"},
            {"bg-[#ff00ff]": data.category === "exhibitions"},
            {"bg-[#eeeeee]": data.category === "kookmins"},
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