import BoardList from "@/app/ui/board-list";
import { getBoardPosts } from "@/app/lib/get-board-posts";
import { getCalendarEntries } from "@/app/lib/get-calendar-entries";
import { getUserMe } from "@/app/lib/services/get-user-me";
import { getAuthToken } from "@/app/lib/services/get-token";

export default async function Layout({children}: {children: React.ReactNode}) {
  const calendarEntries = await getCalendarEntries();
  const posts = await getBoardPosts();
  const user = await getUserMe(true);
  const token = await getAuthToken();

  console.log("lists", calendarEntries[0], posts[0]);
  
  return (
    <div className="w-full flex p-4 h-full gap-4">
      <div className="flex-1 overflow-x-auto">
        <BoardList
          data={posts}
          token={token ?? undefined}
          user={user?.data}
        />
      </div>
      <div className="w-auto overflow-x-auto">
        {children}
      </div>
    </div>
  );
}