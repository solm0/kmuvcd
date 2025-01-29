import { WebsiteProps } from "@/app/types";

export default function Website({ website }: { website: WebsiteProps }) {
  return (
    <div className="flex flex-wrap gap-2">
        <a
          href={website.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-100 text-blue-900 hover:text-blue-500 px-2 py-1 mt-2 rounded-md text-sm"
        >
          {website.name}
        </a>
    </div>
  );
}