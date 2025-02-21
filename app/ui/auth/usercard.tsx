"use client";

import { useState } from 'react';
import { UserDataProps } from '@/app/lib/definitions';
// import CalendarEntry from '../calendar-entry';

export default function UserCard({ token, user }: { token?: string; user: UserDataProps }) {
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
          {/* { userData.calendars && userData.calendars.length > 0 && (
            <div>
              {userData.calendars
                .filter(calendar => calendar.publishedAt !== null) // Filter out calendars with null 'publishedAt'
                .map((calendar) => (
                    <CalendarEntry
                      key={calendar.id}
                      data={calendar}
                      token={token ?? undefined}
                      user={user}
                      href={calendar.detail ? `/events/${calendar.detail?.documentId}` : undefined}
                    />
              ))}
            </div>
          )} */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}