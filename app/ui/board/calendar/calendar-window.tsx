'use client'

import { PostProps } from "@/app/lib/definitions";
import CalendarHead from "./calendar-head";
import CalendarBody from "./calendar-body";

export default function CalendarWindow({calendarEntries, filteredEntries, columnWidth, calendarRef}: {calendarEntries: PostProps[]; filteredEntries: PostProps[]; token?: string; columnWidth: number; calendarRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <>
      <CalendarHead
        calendarEntries={calendarEntries}
        columnWidth={columnWidth}
      />
      <CalendarBody
        calendarEntries={calendarEntries}
        filteredEntries={filteredEntries}
        columnWidth={columnWidth}
        calendarRef={calendarRef}
      />
    </>
  )
}