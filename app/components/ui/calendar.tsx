import fs from "fs/promises";
import path from "path";
import { fetchCMSData } from "../cms/fetchCMSData";
import { PostProps, EventProps } from "@/app/types";

async function getCalendarData() {
  const current_year = new Date().getFullYear();

  // Fetch academic data from the local file
  const academicDataPath = path.join(process.cwd(), `/app/data/academic_calendar_${current_year}.json`);
  const academicData = JSON.parse(await fs.readFile(academicDataPath, "utf-8"));
  const academicCalendar: EventProps[] = academicData?.map((event: EventProps) => ({
    name: event?.name ?? 'Unknown Event',
    startDate: event?.startDate ?? 'Unknown Start Date',
    endDate: event?.endDate ?? event?.startDate ?? 'Unknown End Date',
    tags: [{ tag: '학사일정' }],
  }))

  // Fetch event data from Strapi
  const eventData = await fetchCMSData<PostProps>('events?populate[Event][populate][tags]=true&populate[Event][populate][poster]=true&populate[website]=true') as PostProps[];
  const eventCalendar: EventProps[] = eventData?.[0]?.Event?.map((event) => ({
    name: event?.name ?? 'Unknown Event',
    startDate: event?.startDate ?? 'Unknown Start Date',
    endDate: event?.endDate ?? event?.startDate ?? 'Unknown End Date',
    location: event?.location ?? 'Unknown Location',
    tags: event?.tags?.length
      ? event.tags.map(tag => ({
        tag: tag?.tag ?? 'No Tags'
      }))
      : undefined,
  })) ?? [];

  const combinedEvents = [
    ...eventCalendar, 
    ...academicCalendar
  ];

  return combinedEvents;
  
}

export default async function CalendarComponent() {
  const events = await getCalendarData();

  return (
    <div>hello this is calendar.tsx
      {events.map((event, index) => (
        <div key={index}>
          <h3>{event.name}</h3>
          <p>{event.startDate} - {event.endDate}</p>
          <p>{event.location}</p>
          <div className="flex flex-wrap gap-2 mt-2">
              {event?.tags?.map((tag, index) => (
                  <span
                      key={index}
                      className="bg-red-300 text-red-900 px-2 py-1 rounded-md text-sm"
                  >
                      {tag.tag}
                  </span>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}