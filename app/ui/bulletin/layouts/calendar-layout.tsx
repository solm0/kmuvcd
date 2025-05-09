'use client'

import { PostProps, UserDataProps} from "../../../lib/types";
import Filter from "../filter/filter";
import CalendarPanel from "../calendar/calendar-panel";
import DetailWindow from "../detail-window";
import clsx from 'clsx';
import { useIsOpen } from "@/app/lib/utils/use-is-open";

export default function CalendarLayout({children, posts, filteredPosts, user}: {children: React.ReactNode; posts: PostProps[]; filteredPosts: PostProps[]; user: UserDataProps}) {
  const isOpen = useIsOpen();

  return (
    <div className={clsx("flex-1 overflow-hidden flex flex-col")}>
      <Filter login={user ? true : false} />
      <div className={clsx(
        "w-full md:w-1/2 h-full overflow-x-auto flex flex-col gap-4 items-start",
        isOpen && '!w-full'
      )}>
        <div className="w-full pr-4 text-sm h-8 flex items-center text-slate-600 pb-4">{`필터링 결과 ${filteredPosts.length}건`}</div>
        <CalendarPanel
          calendarEntries={posts}
          filteredEntries={filteredPosts}
        />
      </div>
      <DetailWindow>{children}</DetailWindow>
    </div>
  );
}