import { WebsiteProps } from "@/app/lib/types";

export default function Website({ website }: { website: WebsiteProps }) {
  const fullUrl = website.url?.startsWith('http') ? website.url : `https://${website.url}`;

  return (
    <div className="inline-flex flex-wrap gap-2">
        <a
          href={fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-100 text-blue-900 hover:text-blue-500 px-2 py-1 text-sm"
        >
          {website.name}
        </a>
    </div>
  );
}