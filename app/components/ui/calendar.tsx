import fs from "fs";
import path from "path";
import { fetchCMSData } from "../cms/fetchCMSData";
import { PostProps, CalendarProps } from "@/app/types";

export function getAcademicCalendarData() {
  const folderPath = 'app/data/academic_calendar';
  const files = fs.readdirSync(folderPath);
  const jsonFiles = files.filter(file => file.endsWith('.json'));

  const mergedData = jsonFiles.flatMap(file => {
    const filePath = path.join(folderPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  });

  return mergedData;
}

async function getCalendarData() {
  const academicData = getAcademicCalendarData();

  // console.log('this is a merged academicData:', academicData);

  const academicCalendar: CalendarProps[] = academicData?.map((event: CalendarProps) => ({
    name: event?.name ?? 'Unknown Event',
    startDate: event?.startDate ?? 'Unknown Start Date',
    endDate: event?.endDate ?? event?.startDate ?? 'Unknown End Date',
    tags: [{ tag: '학사일정' }],
  }))

  interface CalendarDataProps {
    documentId?: string;
    Calendar?: CalendarProps[];
  }
  
  // Fetch event data from Strapi
  const eventData = await fetchCMSData<PostProps>('events?populate[calendars][populate][0]=tags') as PostProps[];
  const eventCalendars = eventData?.map((data: PostProps) => ({
    documentId: data?.documentId,
    Calendar: data?.calendars,
  }));

  // console.log(eventCalendars);

  const eventCalendar = eventCalendars?.map((calendar: CalendarDataProps) => 
    calendar.Calendar?.map((data) => ({
      url: `https://kmuvcd.vercel.app/events/${calendar.documentId}`,
      name: data?.name ?? 'Unknown Event',
      startDate: data?.startDate ?? 'Unknown Start Date',
      endDate: data?.endDate ?? data?.startDate ?? 'Unknown End Date',
      location: data?.location ?? 'Unknown Location',
      tags: data?.tags?.map(tag => ({
            tag: tag?.tag ?? 'No Tags',
        })),
    }))
  ).flat() ?? [];

  const combinedEvents = [
    ...eventCalendar, 
    ...academicCalendar
  ];

  return combinedEvents;
}

export default async function CalendarComponent() {
  const events = await getCalendarData();

  return (
    <div className="w-full p-12 absolute top-[500px] z-0">
      <h1 className="text-2xl pb-8">Calendar</h1>
      {events.map((event, index) => (
        <div key={index}>
          <a href={event?.url}>
            <div className='rounded-lg bg-gray-100 p-8 mb-4 hover:bg-gray-200'>
              <p>{event?.name}</p>
              <p>{event?.startDate} - {event?.endDate}</p>
              <p>{event?.location}</p>
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
          </a>
        </div>
      ))}
    </div>
  );
}