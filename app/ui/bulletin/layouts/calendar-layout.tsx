'use client'

import { PostProps, UserDataProps} from "../../../lib/types";
import Filter from "../filter/filter";
import CalendarPanel from "../calendar/calendar-panel";
import DetailWindow from "../detail-window";
import clsx from 'clsx';
import RemoveFilter from "../remove-filter";

export default function CalendarLayout({children, posts, filteredPosts, user}: {children: React.ReactNode; posts: PostProps[]; filteredPosts: PostProps[]; user: UserDataProps}) {

  return (
    <div className={clsx("flex-1 overflow-hidden flex flex-col")}>
      <Filter login={user ? true : false} />
      <div className="w-full md:w-1/2 h-full overflow-x-auto flex flex-col gap-4 items-start">
        <RemoveFilter length={posts.length} />
        <CalendarPanel
          calendarEntries={posts}
          filteredEntries={filteredPosts}
        />
      </div>
      <DetailWindow>{children}</DetailWindow>
    </div>
  );
}