'use client'

import { PostProps, UserDataProps} from "../../../lib/types";
import Filter from "../filter";
import CalendarPanel from "../calendar/calendar-panel";
import DetailWindow from "@/app/ui/board/detail-window";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import clsx from 'clsx';

export default function CalendarLayout({children, posts, filteredPosts, user}: {children: React.ReactNode; posts: PostProps[]; filteredPosts: PostProps[]; user: UserDataProps}) {
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("expand") === "true") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
      // console.log('closed', isOpen)
    }
  }, [searchParams]);

  return (
    <div className={clsx("flex-1 overflow-hidden flex flex-col md:flex-row", isOpen && "md:flex-col")}>
      <Filter login={user ? true : false} />
      <div className="w-full h-full overflow-x-auto flex flex-col gap-4 items-start">
        <div className="w-full p-4 text-sm h-8 flex items-center">{`필터링 결과 ${filteredPosts.length}건`}</div>
        <CalendarPanel
          calendarEntries={posts}
          filteredEntries={filteredPosts}
        />
      </div>
      <DetailWindow>{children}</DetailWindow>
    </div>
  );
}