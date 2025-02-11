// import fs from "fs";
// import path from "path";
import { CalendarProps } from "@/app/types";
import Calendar from "./calendar-entry";
import Link from "next/link";
import { getAuthToken } from "@/app/data/services/get-token";

// export function getAcademicCalendarData() {
//   const folderPath = 'app/data/academic_calendar';
//   const files = fs.readdirSync(folderPath);
//   const jsonFiles = files.filter(file => file.endsWith('.json'));

//   const mergedData = jsonFiles.flatMap(file => {
//     const filePath = path.join(folderPath, file);
//     const content = fs.readFileSync(filePath, 'utf8');
//     return JSON.parse(content);
//   });

//   return mergedData;
// }

async function getCalendarData() {
  // const academicData = getAcademicCalendarData();

  // // console.log('this is a merged academicData:', academicData);

  // const academicCalendar: CalendarProps[] = academicData?.map((event: CalendarProps) => ({
  //   name: event?.name ?? 'Unknown Event',
  //   startDate: event?.startDate ?? 'Unknown Start Date',
  //   endDate: event?.endDate ?? event?.startDate ?? 'Unknown End Date',
  //   tags: [{ tag: '학사일정' }],
  // }))

  const res = await fetch('https://kmuvcd-strapi.onrender.com/api/calendars?populate=*');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const eventData = await res.json();
  // console.log(eventData)
  
  const eventCalendar = eventData?.data.map((data: CalendarProps) => ({
    url: `https://kmuvcd.vercel.app/events/${data?.detail?.documentId}`,
    documentId: data?.documentId,
    name: data?.name ?? 'Unknown Event',
    startDate: data?.startDate ?? 'Unknown Start Date',
    endDate: data?.endDate ?? data?.startDate ?? 'Unknown End Date',
    location: data?.location ?? 'Unknown Location',
    tags: data?.tags?.map(tag => ({
      tag: tag?.tag ?? 'No Tags',
    })),
  }));

  // console.log(eventCalendars);

  const combinedEvents = [
    ...eventCalendar, 
    // ...academicCalendar
  ];

  return combinedEvents;
}

export default async function CalendarComponent() {
  const events = await getCalendarData();
  const token = await getAuthToken();

  return (
    <div className="w-full p-12 absolute top-[500px] z-0">
      <h1 className="text-2xl pb-8">Calendar</h1>
      {events.map((calendar: CalendarProps, index) => (
        <div key={index}>
          {calendar?.url &&
            <Link key={calendar.id} href={calendar?.url}>
              <Calendar calendar={calendar} token={token ?? undefined} />
            </Link>
          }
        </div>
      ))}
    </div>
  );
}