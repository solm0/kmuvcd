'use client'

import { CalendarProps, UserDataProps } from "../lib/definitions"
import { useRef } from "react";
import { useState } from "react";
import CalendarEntry2 from "./calendar-entry-2";
import generateCalendarHeadData from "../lib/generate-calendar-head-data";

interface EntryProps {
  start: number,
  end: number,
  // row: number,
}

export default function CalendarGrid({calendarEntries, token, user}: {calendarEntries: CalendarProps[]; token?: string; user: UserDataProps; }) {
  const entry_count = calendarEntries.length;

  // get first entry's startDate and last entry's endDate
  const first_date = new Date(calendarEntries[0].startDate);
  const last_date = new Date(calendarEntries[calendarEntries.length - 1].endDate);
  const day_count = (+last_date - +first_date) / (1000 * 60 * 60 * 24);

  console.log(calendarEntries);
  // 필터링. 쿼리에서 태그를 뺴내서 필터해야 하나?


  // entry들의 date계산해서 그 date와 firstEntry와의 차이를 계산.
  function getDiff(entry: CalendarProps) {
    const start_date = new Date(entry.startDate);
    const end_date = new Date(entry.endDate);
    const first_to_start = (+start_date - +first_date) / (1000 * 60 * 60 * 24);
    const first_to_end = (+end_date - +first_date) / (1000 * 60 * 60 * 24);
    return {
      start: first_to_start + 1,
      end: first_to_end + 1,
    }
  }

  // function getRow(entry: CalendarProps) {...}
  /*
    1 부터 10까지의 변수를 만든다.
    entry가 렌더링될 때
    작은 숫자부터 검사, 변수에 담긴 endDate가 있으면, 새로운 entry의 startDate보다 뒤면 다음 숫자로 fall,
    아닐 때까지 계속 반복, endDate를 그 변수에 저장.
  */

  const entries: EntryProps[] = [];
  
  calendarEntries.map((entry: CalendarProps) => {
    entries.push(getDiff(entry)); // column위치계산
    // entries.push(getRow(entry)); row위치계산
  })

  const calendarRef = useRef<HTMLDivElement>(null);

  function scrollToDay(first_to_targetday: number) {
    if (calendarRef.current) {
      const columnWidth = 10;
      console.log(first_to_targetday)
      const scrollTarget = first_to_targetday * columnWidth;

      calendarRef.current.scrollTo({
        left: scrollTarget,
        behavior: "smooth",
      });
    }
  }

  const today = new Date();
  const first_to_today = Math.floor((+today - +first_date) / (1000 * 60 * 60 * 24));

  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const format_day = day < 10 ? '0' + day : day;
  const format_month = month < 10 ? '0' + month : month;
  const format_today = `${year}-${format_month}-${format_day}`;

  const [inputDay, setInputDay] = useState(format_today)

  const handleInputDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInputDay(input);
  }
  const input_in_date = new Date(inputDay);
  const first_to_inputday = Math.floor((+input_in_date - +first_date) / (1000 * 60 * 60 * 24));

  // generate head year, month, date
  const calendar_head_data = generateCalendarHeadData(first_date, last_date);
  console.log(calendar_head_data)

  return (
    <>
      {/* position controll */}
      <button
        className="flex px-5 py-2 bg-neutral-950 text-white text-sm rounded-full hover:bg-neutral-700 transition-colors"
        onClick={() => {scrollToDay(first_to_today)}}
      >
        Today
      </button>

      <div className='rounded-lg bg-gray-100 p-8 my-4'>
        <form
          className="flex flex-col gap-2 items-start"
        >
          <label htmlFor="inputDay">Select a day</label>
          <input
            id="inputDay"
            type="date"
            name="inputDay"
            value={inputDay}
            min={calendarEntries[0].startDate}
            max={calendarEntries[calendarEntries.length - 1].endDate}
            onChange={handleInputDay}
          >
          </input>
        </form>
        <button
          type="submit"
          className="flex px-5 py-2 bg-neutral-950 text-white text-sm rounded-full hover:bg-neutral-700 transition-colors my-2"
          onClick={() => {scrollToDay(first_to_inputday)}}
        >
          Input Day
        </button>
      </div>

      {/* month, day area */}
      <div
        className="relative bg-gray-100 overflow-x-auto"
        style={{ width: "100%", maxWidth: "100%", overflowX: 'auto' }}
        ref={calendarRef}
        >
        <div
          id="month"
          className={`grid border`}
          style={{
            gridTemplateColumns: `repeat(${day_count}, 20px)`,
            gridTemplateRows: `repeat(3, 20px)`,
            width: `${day_count * 10}px`,
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
        
        {/* calendar content */}
        <div
          className={`grid h-[570px] border`}
          style={{
            gridTemplateColumns: `repeat(${day_count}, 20px)`,
            gridTemplateRows: `repeat(${entry_count}, 20px)`,
            width: `${day_count * 10}px`,
          }}
        >
          {entries.map((entry: EntryProps, index) => (
            <CalendarEntry2
              key={index}
              entryPosition={entry}
              index={index}
              data={calendarEntries[index]}
              token={token}
              user={user}
            />
          ))}
        </div>
      </div>
    </>
  );
}