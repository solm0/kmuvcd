import { getBoardPosts } from "@/app/lib/get-board-posts";
import { getUserMe } from "@/app/lib/services/get-user-me";
import { getAuthToken } from "@/app/lib/services/get-token";
import BoardList from "@/app/ui/board/board-list";
import AnimatedContainer from "@/app/ui/docs/animated-container";

export default async function Layout({children}: {children: React.ReactNode}) {
  const posts = await getBoardPosts();
  const user = await getUserMe(true);
  const token = await getAuthToken();
  
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