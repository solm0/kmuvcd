"use client";

import { useState } from 'react';
import { UserDataProps } from '@/app/lib/types';

export default function UserCard({ user }: { user: UserDataProps }) {
  const [userData] = useState<UserDataProps | null>(user);

  return (
    <div>
      {userData ? (
        <>
          <p>{userData.realname}</p>
          <p>{userData.email}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}