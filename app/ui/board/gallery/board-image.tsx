'use client';

import { PostProps } from "@/app/lib/definitions";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { ImageMedia } from "../../cms/media";
import generateHref from "@/app/lib/generate-href";

export default function BoardImage({data}: { data: PostProps[]; }) {
  const pathname = usePathname().split('/').slice(1, 2).toString();
  const searchParams = useSearchParams();

   return (
    <div className="flex gap-4">
      {data.map((entry: PostProps) => (
        <div key={entry.documentId} className="max-w-96 min-w-48">
          {entry.documentId && entry.thumbnail ?
            <Link href={generateHref(pathname, searchParams.toString(), entry?.documentId)}>
              <div className={clsx("rounded-lg mb-4 hover:opacity-50", {"opacity-50": (pathname === entry?.documentId)})}>
                <div>
                  <ImageMedia media={entry?.thumbnail} size="medium" />
                </div>
                <p className="text-sm">{entry?.name}</p>
              </div>
            </Link>
            : <div className="rounded-lg p-4 mt-4 bg-gray-100">no documentId or thumbnail</div>
          }
        </div>
      ))}
    </div>
   );
}