import { CalendarProps } from "@/app/lib/definitions";
import Calendar from "./calendar-entry";
import { getAuthToken } from "@/app/lib/services/get-token";
import { getUserMe } from "../lib/services/get-user-me";

async function getCalendarData() {

  const res = await fetch('https://kmuvcd-strapi.onrender.com/api/calendars?populate=*&pagination[pageSize]=300');
  if (!res.ok) {
    throw new Error('Failed to fetch calendar data');
  }

  const data = await res.json();
  // console.log(data)
  
  const events = data?.data.map((data: CalendarProps) => ({
    url: data?.detail ? `https://kmuvcd.vercel.app/events/${data?.detail?.documentId}` : null,
    documentId: data?.documentId,
    name: data?.name ?? 'Unknown Event',
    startDate: data?.startDate,
    endDate: data?.endDate ?? data?.startDate,
    location: data?.location ?? 'Unknown Location',
    tags: data?.tags?.map(tag => ({
      tag: tag?.tag ?? 'No Tags',
    })),
  }));

  const sortedEvents = events.sort(function(a: CalendarProps, b: CalendarProps) {
    return (
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime() ||
      new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
    );
  })

  // console.log(events);
  return sortedEvents;
}

export default async function CalendarComponent() {
  const events = await getCalendarData();
  const user = await getUserMe(true);
  const token = await getAuthToken();

  return (
    <div className="w-full">
      <h1 className="text-2xl pb-8">Calendar</h1>
      {events.map((calendar: CalendarProps, index: number) => (
        <div key={index}>
          {calendar?.url ? (
              <Calendar
                key={calendar.id}
                calendar={calendar}
                token={token ?? undefined}
                user={user?.data}
                href={calendar?.url}
              />
          ) : (
            <Calendar
              key={calendar.id}
              calendar={calendar}
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