'use client';

import { PostProps } from "@/app/lib/types";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { ImageMedia } from "../../cms/media";
import generateHref from "@/app/lib/utils/generate-href";

export default function BoardImage({data}: { data: PostProps[]; }) {
  const pathname = usePathname().split('/').slice(1, 2).toString();
  const searchParams = useSearchParams();

   return (
    <div className="flex flex-wrap gap-4">
      {data.map((entry: PostProps) => (
        <div key={entry.documentId} className="max-w-64 min-w-48">
          {entry.documentId && entry.thumbnail ?
            <Link href={generateHref(pathname, searchParams.toString(), entry?.documentId)}>
              <div className={clsx("mb-4 hover:opacity-50 transition-opacity", {"opacity-50": (pathname === entry?.documentId)})}>
                <div>
                  <ImageMedia media={entry?.thumbnail} size="medium" />
                </div>
                <p className="text-sm mt-2 text-gray-700">{entry?.name}</p>
              </div>
            </Link>
            : <div className="p-4 mt-4 bg-gray-100">no documentId or thumbnail</div>
          }
        </div>
      ))}
    </div>
   );
}