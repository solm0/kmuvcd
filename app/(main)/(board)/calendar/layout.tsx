import { getBoardPosts } from "@/app/lib/get-board-posts";
import { getUserMe } from "@/app/lib/services/get-user-me";
import { getAuthToken } from "@/app/lib/services/get-token";
import CalendarGrid from "@/app/ui/board/calendar-grid";
import AnimatedContainer from "@/app/ui/board/animated-container";
import { PostProps } from "@/app/lib/definitions";

export default async function Layout({children}: {children: React.ReactNode}) {
  const posts = await getBoardPosts();
  const user = await getUserMe(true);
  const token = await getAuthToken();

  // posts를 startDate가 있는것만 filter
  const filteredPosts = posts
    .filter(post => post.startDate !== null)

  // 누락된 endDate 채우기, 시간순 sort
  const sortedPosts = filteredPosts
    .map(post => ({
      ...post,
      endDate: post.endDate ?? post.startDate,
    }))
    .sort(function(a: PostProps, b: PostProps) {
      return (
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime() ||
        new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
      );
  });

  return (
    <div className="w-full flex h-full">
      <div className="flex-1 overflow-x-auto">
        <CalendarGrid
          calendarEntries={sortedPosts}
          token={token ?? undefined}
          user={user?.data}
        />
      </div>
      <AnimatedContainer>{children}</AnimatedContainer>
    </div>
  );
}