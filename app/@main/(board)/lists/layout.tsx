import BoardList from "@/app/ui/board-list";
import { getBoardPosts } from "@/app/lib/get-board-posts";
import { getCalendarEntries } from "@/app/lib/get-calendar-entries";
import { getUserMe } from "@/app/lib/services/get-user-me";
import { getAuthToken } from "@/app/lib/services/get-token";
import AnimatedContainer from "@/app/ui/animated-container";

export default async function Layout({children}: {children: React.ReactNode}) {
  const calendarEntries = await getCalendarEntries();
  const posts = await getBoardPosts();
  const user = await getUserMe(true);
  const token = await getAuthToken();

  console.log("lists", calendarEntries[0], posts[0]);
  
  return (
    <div className="w-full flex h-full">
      <div className="flex-1 overflow-x-auto p-4">
        <BoardList
          data={posts}
          token={token ?? undefined}
          user={user?.data}
        />
      </div>
        <AnimatedContainer>{children}</AnimatedContainer>
    </div>
  );
}