import SlugPage from "@/app/ui/slug-page";
import { getAuthToken } from "@/app/lib/services/get-token";
import { getUserMe } from "@/app/lib/services/get-user-me";
import { getBoardPosts } from "@/app/lib/get-board-posts";
import { Suspense } from "react";

const posts = await getBoardPosts();

export async function generateStaticParams() {
  console.log("Generated Static Params:", posts);

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

  return (
    <Suspense key='images' fallback={<div className="w-full">Loading post...</div>}>
      <SlugPage slug={slug} token={token} user={user.data} posts={posts} />
    </Suspense>
  ) 
}