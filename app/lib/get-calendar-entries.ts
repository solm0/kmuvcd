import { CalendarProps } from "@/app/lib/definitions";

export async function getCalendarEntries() {
  const res = await fetch('https://kmuvcd-strapi.onrender.com/api/calendars?populate=*&pagination[pageSize]=300');
  
  if (!res.ok) {
    throw new Error('Failed to fetch calendar data');
  }

  const data = await res.json();
  
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