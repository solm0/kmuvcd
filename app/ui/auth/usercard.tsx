"use client";

import { useState } from 'react';
import { UserDataProps } from '@/app/lib/definitions';
import BookmarkList from '../board/bookmark-list';
import { PostProps } from '@/app/lib/definitions';

export default function UserCard({ data, token, user }: { data: PostProps[]; token?: string; user: UserDataProps }) {
  const [userData] = useState<UserDataProps | null>(user);

  console.log(token);

  return (
    <div>
      {userData ? (
        <>
          <p>Welcome, {userData.realname}!</p>
          <p>Your email is {userData.email}!</p>
          <p>Your email has been {userData.confirmed ? 'confirmed' : 'not confirmed'}!</p>
          <p>You are {userData.blocked ? 'blocked' : 'not blocked'}!</p>
          <p>Your role is &apos;{userData.role.name}&apos; user!</p>
          <div>내 북마크:
            <BookmarkList data={data} token={token} user={userData} />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}