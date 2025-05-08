import { getUserMe } from "./lib/api/get-user-me";
import { getBoardPosts } from "./lib/api/get-board-posts";
import WhatLayout from "./ui/bulletin/layouts/what-layout";

export default async function Page({children}: {children: React.ReactNode}) {
  const user = await getUserMe(true);
  const posts = await getBoardPosts();
 
  return(
    <div className="w-full h-full flex flex-col">
      <WhatLayout posts={posts} user={user.data}>
        {children}
      </WhatLayout>
    </div>
  );
}