'use client'

import { PostProps } from "@/app/lib/types"
import generateCalendarHeadData from "@/app/lib/utils/generate-calendar-head-data";
import { useHoveredStore } from "@/app/lib/store/useHoveredStore";
import clsx from "clsx";

export default function CalendarHead({calendarEntries, columnWidth}: {calendarEntries: PostProps[], columnWidth: number;}) {
  const first_date = new Date(calendarEntries[0].startDate);
  const last_date = new Date(calendarEntries[calendarEntries.length - 1].endDate);
  const day_count = Math.max(1, Math.round((+last_date - +first_date) / (1000 * 60 * 60 * 24)));
  const entry_count = calendarEntries.length;

  // generate head
  const head_data = generateCalendarHeadData(first_date, last_date);

  const hoveredDate = useHoveredStore((state) => state.hoveredDate);
  
  return (
    <div className="sticky top-0 z-20">
      <div
        className="flex text-sm text-gray-600 overflow-visible"
        style={{
          width: `${(day_count+1) * columnWidth}px`,
        }}
      >
        {head_data &&
        [...head_data.years.entries()].flatMap(([year, yearData]) =>
          yearData
            ? [...yearData.months.entries()].flatMap(([month, monthData]) => (
              <div
                key={`${year}-${month}`}
                id="month"
                className="flex items-center sticky left-0 pl-4 bg-white"
                style={{width: `${monthData.dates.length * columnWidth}px`}}
              >
                {month === 0 ? `${year}년` : null} {month + 1}월
              </div>
            )
              )
            : []
        )}
      </div>
      <div
        className="grid absolute items-center"
        style={{
          gridTemplateColumns: `repeat(${day_count+1}, ${columnWidth}px)`,
          gridTemplateRows: `repeat(1, ${columnWidth}px)`,
          width: `${(day_count+1) * columnWidth}px`,
        }}
      >
        {hoveredDate ? (
          <div
            className="relative bg-gray-100 mix-blend-multiply w-auto h-8"
            style={{
              gridRow: `1 / span ${entry_count}`,
              gridColumnStart: (+new Date(hoveredDate.startDate) - +new Date(calendarEntries[0].startDate)) / (1000 * 60 * 60 * 24)+1,
              gridColumnEnd: (+new Date(hoveredDate.endDate) - +new Date(calendarEntries[0].startDate)) / (1000 * 60 * 60 * 24)+2
            }}
          >
          </div>
        ) : (
          null
        )}
      </div>
      <div
        className="grid text-sm text-gray-600 bg-white"
        style={{
          gridTemplateColumns: `repeat(${day_count+1}, ${columnWidth}px)`,
          gridTemplateRows: `repeat(1, ${columnWidth}px)`,
          width: `${(day_count+1) * columnWidth}px`,
        }}
      >
        {head_data &&
        [...head_data.years.entries()].flatMap(([year, yearData]) =>
          yearData
            ? [...yearData.months.entries()].flatMap(([month, monthData]) =>
                monthData
                  ? [...monthData.dates.values()].map((actualDate) => {
                    const dateObj = new Date(`${year}-${month + 1}-${actualDate}`);
                    const isWeekend = [0, 6].includes(dateObj.getDay()); // 0 = Sunday, 6 = Saturday

                    return (
                      <div
                        key={`${year}-${month}-${actualDate}`}
                        id="date"
                        className={clsx("text-center flex justify-center items-center", {"text-gray-400": isWeekend})}
                      >
                        {actualDate}
                      </div>
                    );
                  })
                : []
              )
            : []
        )}
      </div>
    </div>
  );
}