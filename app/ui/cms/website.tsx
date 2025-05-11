import { WebsiteProps } from "@/app/lib/types";
import { ArrowRight } from 'lucide-react';

export default function Website({ website }: { website: WebsiteProps }) {
  const fullUrl = website.url?.startsWith('http') ? website.url : `https://${website.url}`;

  return (
    <div className="flex flex-wrap gap-2">
        <a
          href={fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-100 text-gray-600 hover:text-gray-500 hover:bg-gray-50 px-3 py-2 text-base flex gap-2 items-center rounded-full transition-colors"
        >
          {website.name}
          <ArrowRight className="w-5 h-5" />
        </a>
    </div>
  );
}