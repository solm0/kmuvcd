"use client";

import { useState } from 'react';
import { CalendarProps } from '@/app/lib/definitions';
import Calendar from '../calendar-entry';

interface UserDataProps {
  id: number;
  documentId: string;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  role: {
    id: number;
    name: string;
  };
  calendars?: CalendarProps[];
}

export default function UserCard({ token, user }: { token?: string; user: UserDataProps }) {
  const [userData] = useState<UserDataProps | null>(user);

  return (
    <div>
      {userData ? (
        <>
          <p>Welcome, {userData.username}!</p>
          <p>Your email is {userData.email}!</p>
          <p>Your email has been {userData.confirmed ? 'confirmed' : 'not confirmed'}!</p>
          <p>You are {userData.blocked ? 'blocked' : 'not blocked'}!</p>
          <p>Your role is &apos;{userData.role.name}&apos; user!</p>
          { userData.calendars && userData.calendars.length > 0 && (
            <div>
              {userData.calendars
                .filter(calendar => calendar.publishedAt !== null) // Filter out calendars with null 'publishedAt'
                .map((calendar) => (
                    <Calendar
                      key={calendar.id}
                      calendar={calendar}
                      token={token ?? undefined}
                      user={user}
                      href={`https://kmuvcd.vercel.app/events/${calendar.detail?.documentId}`}
                    />
              ))}
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}