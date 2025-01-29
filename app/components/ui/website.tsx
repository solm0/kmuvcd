import { WebsiteProps } from "@/app/types";

export default function Website({ website }: { website: WebsiteProps }) {
  return (
    <div>
        <a
          href={website.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline block"
        >
          {website.name}
        </a>
    </div>
  );
}