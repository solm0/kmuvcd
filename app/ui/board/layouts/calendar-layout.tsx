import { PostProps, UserDataProps} from "../../../lib/definitions";
import View from "../view";
import MoreOptions from "../more-options";
import CalendarPanel from "../calendar/calendar-panel";
import DetailWindow from "@/app/ui/board/detail-window";

export default function CalendarLayout({children, posts, user}: {children: React.ReactNode; posts: PostProps[]; user: UserDataProps}) {
  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <View />
      <div className="w-full h-full overflow-x-auto p-4 flex flex-col items-start">
        <MoreOptions login={user ? true : false} />
        <CalendarPanel
          calendarEntries={posts}
          user={user}
        />
      </div>
      <DetailWindow>{children}</DetailWindow>
    </div>
  );
}