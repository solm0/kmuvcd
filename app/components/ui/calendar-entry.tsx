import { CalendarProps } from "@/app/types";

export default function Calendar({ calendar }: { calendar: CalendarProps }) {
  return (
    <div>
        <p>{calendar?.name}</p>
        <p>{calendar?.startDate} - {calendar?.endDate || calendar?.startDate}</p>
        <p>{calendar?.location}</p>
        <div className="flex flex-wrap gap-2 mt-2">
        {calendar?.tags?.map((tag) => (
            <span
                key={tag.id}
                className="bg-red-300 text-red-900 px-2 py-1 rounded-md text-sm"
            >
                {tag.tag}
            </span>
        ))}
        </div>
    </div>
  );
}