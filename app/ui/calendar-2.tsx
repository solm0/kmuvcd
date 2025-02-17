import { CalendarProps } from "@/app/lib/definitions";
import { getCalendarEntries } from "../lib/get-calendar-entries";
// import { getUserMe } from "../lib/services/get-user-me";
// import { getAuthToken } from "@/app/lib/services/get-token";

export default async function Calendar2() {
  const calendarEntries = await getCalendarEntries();
  // const user = await getUserMe(true);
  // const token = await getAuthToken();

  const entry_count = calendarEntries.length;

  // get first entry's startDate and last entry's endDate
  const first_date = new Date(calendarEntries.at(0).startDate);
  const last_date = new Date(calendarEntries.at(-1).endDate);
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

  interface EntryProps {
    start: number,
    end: number,
  }

  const entries: EntryProps[] = [];
  
  calendarEntries.map((entry: CalendarProps) => {
    entries.push(getDiff(entry));
  })

  return (
    <div className="w-full">
      <h1 className="text-2xl pb-8">Calendar2</h1>
      <div className="relative bg-gray-100 overflow-x-auto">
        <div
          className={`grid h-[800px] border`}
          style={{
            gridTemplateColumns: `repeat(${day_count}, 10px)`,
            gridTemplateRows: `repeat(${entry_count}, 10px)`,
            width: "fit-content",
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
    </div>
  );
}