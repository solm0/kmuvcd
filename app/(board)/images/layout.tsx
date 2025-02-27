import { PostProps } from "@/app/lib/definitions";
import { getBoardPosts } from "@/app/lib/get-board-posts";
import BoardImage from "@/app/ui/board/board-image";
import AnimatedContainer from "@/app/ui/board/animated-container";
import { getUserMe } from "@/app/lib/services/get-user-me";
import MoreOptions from "@/app/ui/board/more-options";

export default async function Layout({children}: {children: React.ReactNode}) {
  const posts = await getBoardPosts();
  const user = await getUserMe(true);

  // dynamic zone -> image_block이 있는것만 filter
  const filteredPosts = posts
    .filter(post => post.dynamic?.some(item => "image_block" in item));

  // image_block을 thumbnail로.
  const thumbnailPosts = filteredPosts
    .map((post) => ({
      ...post,
      thumbnail: post.dynamic?.find(item => "image_block" in item)?.image_block?.[0],
    }))

  // publishedAt sort
  const sortedPosts = thumbnailPosts
    .sort((a: PostProps, b: PostProps) => {
      return (
        new Date(a.publishedAt ?? "9999-12-31T23:59:59Z").getTime() - new Date(b.publishedAt ?? "9999-12-31T23:59:59Z").getTime() ||
        new Date(a.startDate)?.getTime() - new Date(b.startDate)?.getTime() ||
        new Date(a.endDate)?.getTime() - new Date(b.endDate)?.getTime()
      );
    });
  
  return (
    <div className="w-full flex h-full">
      <div className="flex-1 overflow-x-auto p-4">
        <MoreOptions login={user.ok ? true : false} />
        <BoardImage
          data={sortedPosts}
          user={user.data}
        />
      </div>
      <AnimatedContainer>{children}</AnimatedContainer>
    </div>
  );
}