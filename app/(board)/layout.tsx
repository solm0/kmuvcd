import BoardLayout from "../ui/board-layout";
import { getUserMe } from "../lib/services/get-user-me";
import { getBoardPosts } from "../lib/get-board-posts";
import WhatLayout from "../ui/what-layout";

export default async function Page({children}: {children: React.ReactNode}) {
  const user = await getUserMe(true);
  const posts = await getBoardPosts();
 
  return(
    <BoardLayout>
      <WhatLayout posts={posts} user={user.data}>
        {children}
      </WhatLayout>
    </BoardLayout>
  );
}