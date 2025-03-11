'use client'

import { PostProps, UserDataProps } from "@/app/lib/definitions";
import { useRef } from "react";
import { GoToInputday, GoToToday } from "./calendar-controll";
import CalendarWindow from "./calendar-window";

export default function CalendarPanel({calendarEntries, user}: {calendarEntries: PostProps[]; user: UserDataProps}) {
  const columnWidth = 35;
  const calendarRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {/* calendar controll */}
      <div className="flex items-start mb-4">
        <GoToToday first_date={new Date(calendarEntries[0].startDate)} columnWidth={columnWidth} calendarRef={calendarRef} />
        <GoToInputday first_date={new Date(calendarEntries[0].startDate)} columnWidth={columnWidth} calendarRef={calendarRef} min={calendarEntries[0].startDate} max={calendarEntries[calendarEntries.length - 1].endDate}/>
      </div>
      
      {/* calendar */}
      <div className="relative flex flex-col items-center w-full overflow-hidden">
        <div
          className="overflow-x-auto w-full h-full z-10"
          id="calendar_window"
          ref={calendarRef}
        >
          <CalendarWindow
            calendarEntries={calendarEntries}
            user={user}
            columnWidth={columnWidth}
            calendarRef={calendarRef}
          />
        </div>
      </div>
    </>
  );
}