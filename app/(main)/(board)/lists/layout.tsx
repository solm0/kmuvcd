import { getBoardPosts } from "@/app/lib/get-board-posts";
import { getUserMe } from "@/app/lib/services/get-user-me";
import { getAuthToken } from "@/app/lib/services/get-token";
import BoardList from "@/app/ui/board/board-list";
import AnimatedContainer from "@/app/ui/board/animated-container";
import { PostProps } from "@/app/lib/definitions";

export default async function Layout({children}: {children: React.ReactNode}) {
  const posts = await getBoardPosts();
  const user = await getUserMe(true);
  const token = await getAuthToken();

  // publishedAt 정렬.
  const sortedPosts = posts
    .sort((a: PostProps, b: PostProps) => {
      return (
        new Date(a.publishedAt ?? "9999-12-31T23:59:59Z").getTime() - new Date(b.publishedAt ?? "9999-12-31T23:59:59Z").getTime() ||
        new Date(a.startDate)?.getTime() - new Date(b.startDate)?.getTime() ||
        new Date(a.endDate)?.getTime() - new Date(b.endDate)?.getTime()
      )
    })
  
  return (
    <div className="w-full flex h-full">
      <div className="flex-1 overflow-x-auto p-4">
        <BoardList
          data={sortedPosts}
          token={token ?? undefined}
          user={user?.data}
        />
      </div>
      <AnimatedContainer>{children}</AnimatedContainer>
    </div>
  );
} 