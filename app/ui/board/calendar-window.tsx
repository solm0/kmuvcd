'use client'

import { PostProps } from "@/app/lib/definitions";
import CalendarHead from "./calendar-head";
import CalendarBody from "./calendar-body";

export default function CalendarWindow({calendarEntries, columnWidth, calendarRef}: {calendarEntries: PostProps[]; columnWidth: number; calendarRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <>
      <CalendarHead
        calendarEntries={calendarEntries}
        columnWidth={columnWidth}
      />
      <CalendarBody
        calendarEntries={calendarEntries}
        columnWidth={columnWidth}
        calendarRef={calendarRef}
      />
    </>
  )
}