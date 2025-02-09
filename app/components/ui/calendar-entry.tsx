import { CalendarProps } from "@/app/types";

export default function Calendar({ calendar }: { calendar: CalendarProps }) {
  return (
    <div>
        <p>name: {calendar?.name}</p>
        <p>startDate: {calendar?.startDate}</p>
        <p>endDate: {calendar?.endDate || calendar?.startDate}</p>
        <p>location: {calendar?.location}</p>
        <div className="flex flex-wrap gap-2 mt-2">tags:
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