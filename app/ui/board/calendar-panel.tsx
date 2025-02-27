'use client'

import { PostProps } from "../../lib/definitions"
import { useRef } from "react";
import { GoToToday, GoToInputday } from "./calendar-controll";
import CalendarWindow from "./calendar-window";

export default function CalendarPanel({calendarEntries}: {calendarEntries: PostProps[]; }) {
  const columnWidth = 35;
  const calendarRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {/* calendar controll */}
      <GoToToday first_date={new Date(calendarEntries[0].startDate)} columnWidth={columnWidth} calendarRef={calendarRef} />
      <GoToInputday first_date={new Date(calendarEntries[0].startDate)} columnWidth={columnWidth} calendarRef={calendarRef} min={calendarEntries[0].startDate} max={calendarEntries[calendarEntries.length - 1].endDate}/>
      
      {/* calendar */}
      <div className="relative bg-gray-100 flex flex-col items-center w-full overflow-hidden">
        <div
          className="overflow-x-auto w-full h-full z-10"
          id="calendar_window"
          ref={calendarRef}
        >
          <CalendarWindow
            calendarEntries={calendarEntries}
            columnWidth={columnWidth}
            calendarRef={calendarRef}
          />
        </div>
      </div>
    </>
  );
}