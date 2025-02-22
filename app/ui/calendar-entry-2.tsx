'use client'

import { CalendarProps, UserDataProps } from "../lib/definitions"
import { useState } from "react"

interface EntryProps {
  start: number,
  end: number,
  // row: number,
}

// index는 나중에 prop에서 삭제...
export default function CalendarEntry2({ entryPosition, index, data, token, user }: { entryPosition: EntryProps; index: number; data:CalendarProps; token?: string; user: UserDataProps; }) {
  const [userData] = useState<UserDataProps | null>(user);

  const isUser = userData?.id;

  console.log(data, token, isUser);

  // const Content = (...)
  // link

  return (
    <div
      className="bg-blue-300"
      style={{
        gridRowStart: index+1, // entryPosition.row
        gridRowEnd: index+2,
        gridColumnStart: entryPosition.start,
        gridColumnEnd: entryPosition.end,
      }}
    >
    </div>
  );
}