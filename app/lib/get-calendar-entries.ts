import { CalendarProps } from "@/app/lib/definitions";

export async function getCalendarEntries() {
  const res = await fetch('https://kmuvcd-strapi.onrender.com/api/calendars?populate=*&pagination[pageSize]=300');
  
  if (!res.ok) {
    throw new Error('Failed to fetch calendar data');
  }

  const data = await res.json();

  const entries = data?.data.map((entry: CalendarProps) => {
    const getDocumentId = () => {
      return (
        entry?.notices?.documentId ||
        entry?.events?.documentId ||
        entry?.exhibitions?.documentId ||
        entry?.clubs?.documentId
      );
    };

    return {
      subPath: getDocumentId(),
      documentId: entry?.documentId,
      name: entry?.name ?? 'Unknown Event',
      startDate: entry?.startDate,
      endDate: entry?.endDate ?? entry?.startDate,
      location: entry?.location ?? null,
      tags: entry?.tags?.map(tag => ({
        tag: tag?.tag ?? null,
      })),
      category: entry?.tags?.[0]?.documentId === 'vl0xeseio4i439p1gmps7618' ? 'notices' : entry?.events?.category,
    }
  });

  const sortedEntries = entries.sort(function(a: CalendarProps, b: CalendarProps) {
    return (
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime() ||
      new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
    );
  })

  return sortedEntries;
}