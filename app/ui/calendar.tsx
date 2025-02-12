import { CalendarProps } from "@/app/lib/definitions";
import Calendar from "./calendar-entry";
import Link from "next/link";
import { getAuthToken } from "@/app/lib/services/get-token";

async function getCalendarData() {

  const res = await fetch('https://kmuvcd-strapi.onrender.com/api/calendars?populate=*&pagination[pageSize]=300');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  // console.log(data)
  
  const events = data?.data.map((data: CalendarProps) => ({
    url: data?.detail ? `https://kmuvcd.vercel.app/events/${data?.detail?.documentId}` : null,
    documentId: data?.documentId,
    name: data?.name ?? 'Unknown Event',
    startDate: data?.startDate ?? 'Unknown Start Date',
    endDate: data?.endDate ?? data?.startDate ?? 'Unknown End Date',
    location: data?.location ?? 'Unknown Location',
    tags: data?.tags?.map(tag => ({
      tag: tag?.tag ?? 'No Tags',
    })),
  }));

  // console.log(events);
  return events;
}

export default async function CalendarComponent() {
  const events = await getCalendarData();
  const token = await getAuthToken();

  return (
    <div className="w-full p-12 absolute top-[500px] z-0">
      <h1 className="text-2xl pb-8">Calendar</h1>
      {events.map((calendar: CalendarProps, index: number) => (
        <div key={index}>
          {calendar?.url ? (
            <Link key={calendar.id} href={calendar?.url}>
              <Calendar calendar={calendar} token={token ?? undefined} />
            </Link>
          ) : (
            <Calendar calendar={calendar} token={token ?? undefined} />
          )
          }
        </div>
      ))}
    </div>
  );
}