'use client'

import { PostProps, UserDataProps } from "@/app/lib/definitions";
import CalendarHead from "./calendar-head";
import CalendarBody from "./calendar-body";

export default function CalendarWindow({calendarEntries, token, user, columnWidth, calendarRef}: {calendarEntries: PostProps[]; token?: string; user: UserDataProps; columnWidth: number; calendarRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <>
      <CalendarHead
        calendarEntries={calendarEntries}
        columnWidth={columnWidth}
      />
      <CalendarBody
        calendarEntries={calendarEntries}
        token={token}
        user={user}
        columnWidth={columnWidth}
        calendarRef={calendarRef}
      />
    </>
  )
}