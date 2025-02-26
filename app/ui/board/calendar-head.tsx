'use client'

import { PostProps } from "@/app/lib/definitions"
import generateCalendarHeadData from "@/app/lib/generate-calendar-head-data";

export default function CalendarHead({calendarEntries, columnWidth}: {calendarEntries: PostProps[], columnWidth: number;}) {
  const first_date = new Date(calendarEntries[0].startDate);
  const last_date = new Date(calendarEntries[calendarEntries.length - 1].endDate);
  const day_count = (+last_date - +first_date) / (1000 * 60 * 60 * 24);

  // generate head
  const head_data = generateCalendarHeadData(first_date, last_date);
  
  return (
    <>
      <div
        id="month"
        className={`grid border`}
        style={{
          gridTemplateColumns: `repeat(${day_count}, ${columnWidth}px)`,
          gridTemplateRows: `repeat(3, ${columnWidth}px)`,
          width: `${day_count * columnWidth}px`,
        }}
      >
        {head_data &&
          [...head_data.years.entries()].map(([year, yearData]) => (
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
    </>
  )
}