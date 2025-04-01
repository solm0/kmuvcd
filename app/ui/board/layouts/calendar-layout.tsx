import { PostProps, UserDataProps} from "../../../lib/types";
import View from "../view";
import MoreOptions from "../more-options";
import CalendarPanel from "../calendar/calendar-panel";
import DetailWindow from "@/app/ui/board/detail-window";

export default function CalendarLayout({children, posts, filteredPosts, user}: {children: React.ReactNode; posts: PostProps[]; filteredPosts: PostProps[]; user: UserDataProps}) {
  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <View />
      <div className="w-full h-full overflow-x-auto p-4 flex flex-col items-start">
        <MoreOptions login={user ? true : false} />
        <div className="w-full overflow-x-auto text-sm">{`필터링 결과 ${filteredPosts.length}건`}</div>
        <CalendarPanel
          calendarEntries={posts}
          filteredEntries={filteredPosts}
        />
      </div>
      <DetailWindow>{children}</DetailWindow>
    </div>
  );
}