'use client'

import { PostProps } from "@/app/lib/definitions"
import generateCalendarHeadData from "@/app/lib/generate-calendar-head-data";

export default function CalendarHead({calendarEntries, columnWidth}: {calendarEntries: PostProps[], columnWidth: number;}) {
  const first_date = new Date('2024-01-01');
  const last_date = new Date(calendarEntries[calendarEntries.length - 1].endDate);

  // generate head
  const head_data = generateCalendarHeadData(first_date, last_date);

  function days_of_a_year(year: number) {
    return (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) ? 366 : 365;
  }
  
  return (
    <>
      <div
        id="calendar-head"
        className="border overflow-visible grid"
        style={{
          gridAutoFlow: "column", // Stacks children horizontally
          gridAutoColumns: "max-content", // Ensures children use their own width
          width: 1000 * columnWidth, // Ensure enough space
        }}
      >
        {head_data &&
          [...head_data.years.entries()].map(([year, yearData]) => {
            const width = days_of_a_year(year) * columnWidth;

            return (
              <div
                key={year}
                className="sticky left-0 bg-gray-100"
                style={{
                  width: width,
                }}
              >
                {year}
                <div
                  className="top-[20px] grid"
                  style={{
                    gridAutoFlow: "column", // Stacks children horizontally
                    gridAutoColumns: "max-content", // Ensures children use their own width
                  }}
                >
                  {yearData && [...yearData.months.entries()].map(([month, monthData]) => {
                    const width = 30 * columnWidth;
                  
                    return (
                      <div
                        key={month}
                        id="month"
                        className="sticky left-0 bg-gray-100"
                        style={{
                          width: width,
                        }}
                      >
                        {month + 1}
                        <div
                          className="top-[20px] grid"
                          style={{
                            gridAutoFlow: "column", // Stacks children horizontally
                            gridAutoColumns: "max-content", // Ensures children use their own width
                          }}
                        >
                          {monthData && [...monthData.dates.entries()].map(([date]) => {
                            const width = columnWidth; 
                            return (
                              <div
                                key={date}
                                id="date"
                                style={{
                                  gridAutoFlow: "column", // Stacks children horizontally
                                  gridAutoColumns: "max-content", // Ensures children use their own width
                                  width: width,
                                }}
                              >
                                {date + 1}
                              </div>
                          )})}
                        </div>
                      </div>
                  )})}
                </div>
              </div>
            );
          })}
      </div>
    </>
  )
}