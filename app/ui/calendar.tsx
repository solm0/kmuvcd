import { CalendarProps } from "@/app/lib/definitions";
import CalendarEntry from "./calendar-entry";
import { getAuthToken } from "@/app/lib/services/get-token";
import { getUserMe } from "../lib/services/get-user-me";

async function getCalendarEntries() {

  const res = await fetch('https://kmuvcd-strapi.onrender.com/api/calendars?populate=*&pagination[pageSize]=300');
  if (!res.ok) {
    throw new Error('Failed to fetch calendar data');
  }

  const data = await res.json();
  // console.log(data)
  
  const entries = data?.data.map((entry: CalendarProps) => ({
    url: entry?.detail ? `/events/${entry?.detail?.documentId}` : null,
    documentId: entry?.documentId,
    name: entry?.name ?? 'Unknown Event',
    startDate: entry?.startDate,
    endDate: entry?.endDate ?? entry?.startDate,
    location: entry?.location ?? null,
    tags: entry?.tags?.map(tag => ({
      tag: tag?.tag ?? null,
    })),
  }));

  const sortedEntries = entries.sort(function(a: CalendarProps, b: CalendarProps) {
    return (
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime() ||
      new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
    );
  })

  return sortedEntries;
}

export default async function Calendar() {
  const calendarEntries = await getCalendarEntries();
  const user = await getUserMe(true);
  const token = await getAuthToken();

  return (
    <div className="w-full">
      <h1 className="text-2xl pb-8">Calendar</h1>
      {calendarEntries.map((entry: CalendarProps, index: number) => (
        <div key={index}>
          {entry?.url ? (
              <CalendarEntry
                key={entry.id}
                data={entry}
                token={token ?? undefined}
                user={user?.data}
                href={entry?.url}
              />
          ) : (
            <CalendarEntry
              key={entry.id}
              data={entry}
              token={token ?? undefined}
              user={user?.data}
            />
          )
          }
        </div>
      ))}
    </div>
  );
}