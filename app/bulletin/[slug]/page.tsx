import SlugPage from "@/app/ui/bulletin/slug-page";
import { getAuthToken } from "@/app/lib/api/get-token";
import { getUserMe } from "@/app/lib/api/get-user-me";
import { getBoardPosts } from "@/app/lib/api/get-board-posts";
import { Suspense } from "react";

export async function generateStaticParams() {
  const posts = await getBoardPosts();
  // console.log("Generated Static Params:", posts);

  if (!posts) {
    console.error('No posts found');
    return [];
  }

  return posts.map((post) => ({
    slug: post.documentId,
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const token = await getAuthToken();
  const user = await getUserMe(true);
  const posts = await getBoardPosts();

  return (
    <Suspense fallback={<div className="w-full p-4">Loading post...</div>}>
      <SlugPage slug={slug} token={token} user={user.data} posts={posts} />
    </Suspense>
  )
}