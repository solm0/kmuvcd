import { EventProps } from "@/app/types";

export default function Event({ event }: { event: EventProps }) {
  return (
    <div>
        <p>startDate: {event?.startDate}</p>
        <p>endDate: {event?.endDate || event?.startDate}</p>
        <p>location: {event?.location}</p>
        <div className="flex flex-wrap gap-2 mt-2">tags:
            {event?.tags?.map((tag) => (
                <span
                    key={tag.id}
                    className="bg-red-300 text-red-900 px-2 py-1 rounded-md text-sm"
                >
                    {tag.tag}
                </span>
            ))}
        </div>
        <div>poster:
            {event.poster?.map((poster) => (
                <img
                    key={poster.id}
                    src={poster.formats?.thumbnail?.url}
                    alt={poster.alternativeText || 'Image'}
                    className="mt-4"
                />
            ))}
        </div>
    </div>
  );
}