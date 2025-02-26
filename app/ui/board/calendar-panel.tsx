'use client'

import { PostProps, UserDataProps } from "../../lib/definitions"
import { useEffect, useRef } from "react";
import CalendarEntry from "./calendar-entry";
import generateCalendarHeadData from "../../lib/generate-calendar-head-data";
import queryFilter from "@/app/lib/query-filter";
import { useSearchParams } from "next/navigation";
import { scrollToDay, GoToToday, GoToInputday } from "./calendar-controll";

interface EntryProps {
  start: number,
  end: number,
  // row: number,
}

export default function CalendarPanel({calendarEntries, token, user}: {calendarEntries: PostProps[]; token?: string; user: UserDataProps; }) {
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


  const columnWidth = 20;

  const calendarRef = useRef<HTMLDivElement | null>(null);

  
  // generate head year, month, date
  const calendar_head_data = generateCalendarHeadData(first_date, last_date);
  // console.log(calendar_head_data)

  return (
    <>
      <GoToToday first_date={new Date(calendarEntries[0].startDate)} columnWidth={columnWidth} calendarRef={calendarRef} />
      <GoToInputday first_date={new Date(calendarEntries[0].startDate)} columnWidth={columnWidth} calendarRef={calendarRef} min={calendarEntries[0].startDate} max={calendarEntries[calendarEntries.length - 1].endDate}/>
      
      <div
        className="relative bg-gray-100 overflow-x-auto"
        id="calendar_window"
        style={{ width: "100%", maxWidth: "100%", overflowX: 'auto' }}
        ref={calendarRef}
        >
        <div
          id="month"
          className={`grid border`}
          style={{
            gridTemplateColumns: `repeat(${day_count}, ${columnWidth}px)`,
            gridTemplateRows: `repeat(3, ${columnWidth}px)`,
            width: `${day_count * columnWidth}px`,
          }}
        >
          {calendar_head_data &&
            [...calendar_head_data.years.entries()].map(([year, yearData]) => (
              <div
                key={year}
                id="year"
                style={{
                  gridRowStart: 1,
                  gridRowEnd: 2,
                  gridColumnStart: 3, // change
                  gridColumnEnd: 4, // change
                }}
              >
                {year}
                {yearData && [...yearData.months.entries()].map(([month, monthData]) => (
                  <div
                    key={month}
                    id="month"
                    style={{
                      gridRowStart: 2,
                      gridRowEnd: 3,
                      gridColumnStart: 3, // change
                      gridColumnEnd: 4, // change
                    }}
                  >
                    {month + 1}
                    {monthData && [...monthData.dates.entries()].map(([date]) => (
                      <div
                        key={date}
                        id="date"
                        style={{
                          gridRowStart: 3,
                          gridRowEnd: 4,
                          gridColumnStart: 3, // change
                          gridColumnEnd: 4, // change
                        }}
                      >
                        {date + 1}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
        </div>
        
        {/* body */}
        <div
          className={`grid h-[570px] border`}
          style={{
            gridTemplateColumns: `repeat(${day_count}, ${columnWidth}px)`,
            gridTemplateRows: `repeat(${entry_count}, ${columnWidth}px)`,
            width: `${day_count * columnWidth}px`,
          }}
        >
          <div id="today"
            className="bg-gray-200"
            style={{
              gridRow: `1 / span ${entry_count}`,
              gridColumnStart: first_to_today+1,
              gridColumnEnd: first_to_today+2,
            }}
          >
          </div>
          {entries.map((entry: EntryProps, index) => (
            <CalendarEntry
              key={`${entry.start}-${index}`}
              entryPosition={entry}
              index={index}
              data={filteredEntries[index]}
              token={token}
              user={user}
            />
          ))}
        </div>
      </div>
    </>
  );
}