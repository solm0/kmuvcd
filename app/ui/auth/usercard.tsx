"use client";

import { useEffect, useState } from 'react';
import { CalendarProps } from '@/app/lib/definitions';
import Calendar from '../calendar-entry';
// import Link from 'next/link';

interface UserDataProps {
  id: number;
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

export default function UserCard({ token }: { token?: string }) {
  const [userData, setUserData] = useState<UserDataProps | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");

        if (!res.ok) {
          console.warn(`User not logged in: ${res.status} ${res.statusText}`);
          setUserData(null); // Clear user data if unauthorized
          return;
        }

        const text = await res.text();

        if (!text) {
          console.warn("Empty response from API");
          setUserData(null);
          return;
        }

        const data = JSON.parse(text);
        setUserData(data.data || null);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }
    fetchUser();
  }, []);

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
                  // <Link key={calendar.id} href={`https://kmuvcd.vercel.app/events/${calendar.detail?.documentId}`}>
                    <Calendar key={calendar.id} calendar={calendar} token={token ?? undefined} />
                  // </Link>
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