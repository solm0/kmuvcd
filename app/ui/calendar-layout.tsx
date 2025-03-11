import { PostProps, UserDataProps} from "../lib/definitions";
import View from "./view";
import MoreOptions from "./board/more-options";
import CalendarPanel from "./board/calendar-panel";
import AnimatedContainer from "@/app/ui/board/animated-container";

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
      <AnimatedContainer>{children}</AnimatedContainer>
    </div>
  );
}