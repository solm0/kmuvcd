'use client'

import { PostProps, UserDataProps } from "../../lib/definitions"
import { useRef } from "react";
import { GoToToday, GoToInputday } from "./calendar-controll";
import CalendarWindow from "./calendar-window";

export default function CalendarPanel({calendarEntries, token, user}: {calendarEntries: PostProps[]; token?: string; user: UserDataProps; }) {
  const columnWidth = 20;
  const calendarRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {/* calendar controll */}
      <GoToToday first_date={new Date(calendarEntries[0].startDate)} columnWidth={columnWidth} calendarRef={calendarRef} />
      <GoToInputday first_date={new Date(calendarEntries[0].startDate)} columnWidth={columnWidth} calendarRef={calendarRef} min={calendarEntries[0].startDate} max={calendarEntries[calendarEntries.length - 1].endDate}/>
      
      {/* calendar */}
      <div
        className="relative bg-gray-100 flex flex-col items-center"
        id="calendar_window"
        style={{ width: "100%", maxWidth: "100%", overflowX: 'auto' }}
        ref={calendarRef}
        >
          <div className="fixed bg-gray-200 w-[20px] h-full"></div>
          <div className="w-full h-full z-10">
            <CalendarWindow
              calendarEntries={calendarEntries}
              token={token}
              user={user}
              columnWidth={columnWidth}
              calendarRef={calendarRef}
            />
          </div>
      </div>
    </>
  );
}