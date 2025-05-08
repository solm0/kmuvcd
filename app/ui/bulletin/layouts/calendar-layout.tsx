'use client'

import { PostProps, UserDataProps} from "../../../lib/types";
import Filter from "../filter/filter";
import CalendarPanel from "../calendar/calendar-panel";
import DetailWindow from "../detail-window";
import clsx from 'clsx';

export default function CalendarLayout({children, posts, filteredPosts, user}: {children: React.ReactNode; posts: PostProps[]; filteredPosts: PostProps[]; user: UserDataProps}) {

  return (
    <div className={clsx("flex-1 overflow-hidden flex flex-col")}>
      <Filter login={user ? true : false} />
      <div className="w-1/2 h-full overflow-x-auto flex flex-col gap-4 items-start">
        <div className="w-full pr-4 text-sm h-8 flex items-center">{`필터링 결과 ${filteredPosts.length}건`}</div>
        <CalendarPanel
          calendarEntries={posts}
          filteredEntries={filteredPosts}
        />
      </div>
      <DetailWindow>{children}</DetailWindow>
    </div>
  );
}