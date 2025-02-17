'use client'

import { CalendarProps } from "../lib/definitions"
import { useRef } from "react";
import { useState } from "react";

interface EntryProps {
  start: number,
  end: number,
}

export default function CalendarEntry2({calendarEntries}: {calendarEntries: CalendarProps[]}) {
  const entry_count = calendarEntries.length;

  // get first entry's startDate and last entry's endDate
  const first_date = new Date(calendarEntries[0].startDate);
  const last_date = new Date(calendarEntries[calendarEntries.length - 1].endDate);
  const day_count = (+last_date - +first_date) / (1000 * 60 * 60 * 24);

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

  const entries: EntryProps[] = [];
  
  calendarEntries.map((entry: CalendarProps) => {
    entries.push(getDiff(entry));
  })

  const calendarRef = useRef<HTMLDivElement>(null);

  function scrollToDay(first_to_targetday: number) {
    if (calendarRef.current) {
      const columnWidth = 10;
      console.log(first_to_targetday)
      const scrollTarget = first_to_targetday * columnWidth;
      // console.log(calendarRef.current.scrollLeft, calendarRef.current.scrollWidth)

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

  return (
    <>
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

      <div
        className="relative bg-gray-100 overflow-x-auto"
        style={{ width: "100%", maxWidth: "100%", overflowX: 'auto' }}
        ref={calendarRef}
        >
        <div
          className={`grid h-[800px] border`}
          style={{
            gridTemplateColumns: `repeat(${day_count}, 10px)`,
            gridTemplateRows: `repeat(${entry_count}, 10px)`,
            width: `${day_count * 10}px`,
          }}
          
        >
          {entries.map((entry: EntryProps, index) => (
            <div
              key={index}
              className="bg-blue-300"
              style={{
                gridRowStart: index+1,
                gridRowEnd: index+2,
                gridColumnStart: entry.start,
                gridColumnEnd: entry.end,
              }}
            >
            </div>
          ))}
        </div>
      </div>
    </>
  );
}