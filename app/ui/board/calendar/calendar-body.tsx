'use client'

import CalendarEntry from "./calendar-entry";
import { PostProps } from "@/app/lib/types";
import { useCalendarData } from "../../../lib/utils/use-calendar-data";

interface EntryProps {
  start: number,
  end: number,
}

function TodayIndicator({ entryCount, column }: { entryCount: number; column: number}) {
  return (
    <div
      id="today"
      className="relative z-10 border-l border-red-600 left-1/2"
      style={{
        gridRow: `1 / span ${entryCount}`,
        gridColumnStart: column+1,
        gridColumnEnd: column+2,
      }}
    ></div>
  )
}

export default function CalendarBody({
  calendarEntries,
  filteredEntries,
  columnWidth,
  calendarRef
} : {
  calendarEntries: PostProps[],
  filteredEntries: PostProps[],
  columnWidth: number,
  calendarRef: React.RefObject<HTMLDivElement | null>
}
) {
  const entry_count = calendarEntries.length;
  
  const { entries, day_count, first_to_today } = useCalendarData(
    calendarEntries,
    filteredEntries,
    columnWidth,
    calendarRef
  );

  return (
    <div
      className={`grid border`}
      style={{
        gridTemplateColumns: `repeat(${day_count}, ${columnWidth}px)`,
        gridTemplateRows: `repeat(${entry_count}, ${columnWidth}px)`,
        width: `${(day_count+1) * columnWidth}px`,
      }}
    >
      <TodayIndicator entryCount={entry_count} column={first_to_today} />

      {entries.map((entry: EntryProps, index) => (
        <CalendarEntry
          key={`${entry.start}-${index}`}
          entryPosition={entry}
          index={index}
          data={filteredEntries[index]}
        />
      ))}
    </div>
  )
}