'use client'

import CalendarEntry from "./calendar-entry";
import queryFilter from "@/app/lib/query-filter";
import { useSearchParams } from "next/navigation";
import { PostProps } from "@/app/lib/definitions";
import { useEffect } from "react";
import { scrollToDay } from "./calendar-controll";

interface EntryProps {
  start: number,
  end: number,
  // row: number,
}

export default function CalendarBody({
  calendarEntries,
  columnWidth,
  calendarRef
} : {
  calendarEntries: PostProps[],
  columnWidth: number,
  calendarRef: React.RefObject<HTMLDivElement | null>
}
) {
  const entry_count = calendarEntries.length;

  // get first entry's startDate and last entry's endDate
  const first_date = new Date(calendarEntries[0].startDate);
  const last_date = new Date(calendarEntries[calendarEntries.length - 1].endDate);
  const day_count = (+last_date - +first_date) / (1000 * 60 * 60 * 24);

  const today = new Date();
  const first_to_today = Math.floor((+today - +first_date) / (1000 * 60 * 60 * 24));

  useEffect(() => {
    scrollToDay(first_to_today, columnWidth, calendarRef, false)
  }, []);

  // 카테고리, 태그 필터
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  const search = searchParams.get('search');
  const filteredEntries = queryFilter(calendarEntries, category, tag, search);

  // entry들의 date계산해서 그 date와 firstEntry와의 차이를 계산.
  function getDiff(entry: PostProps) {
    const start_date = new Date(entry.startDate);
    const end_date = new Date(entry.endDate);
    const first_to_start = (+start_date - +first_date) / (1000 * 60 * 60 * 24);
    const first_to_end = (+end_date - +first_date) / (1000 * 60 * 60 * 24);
    return {
      start: first_to_start + 1,
      end: first_to_end + 1,
    }
  }

  // function getRow(entry: ) {...}
  /*
    1 부터 10까지의 변수를 만든다.
    entry가 렌더링될 때
    작은 숫자부터 검사, 변수에 담긴 endDate가 있으면, 새로운 entry의 startDate보다 뒤면 다음 숫자로 fall,
    아닐 때까지 계속 반복, endDate를 그 변수에 저장.
  */

  const entries: EntryProps[] = [];
  
  filteredEntries.map((entry: PostProps) => {
    entries.push(getDiff(entry)); // column위치계산
    // entries.push(getRow(entry)); row위치계산
  })

  return (
    <div
      className={`grid border`}
      style={{
        gridTemplateColumns: `repeat(${day_count}, ${columnWidth}px)`,
        gridTemplateRows: `repeat(${entry_count}, ${columnWidth}px)`,
        width: `${(day_count+1) * columnWidth}px`,
      }}
    >
      <div id="today"
        className="bg-gray-200"
        style={{
          gridRow: `1 / span ${entry_count}`,
          gridColumnStart: first_to_today+1,
          gridColumnEnd: first_to_today+2,
        }}
      ></div>
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