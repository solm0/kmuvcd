'use client'

import clsx from "clsx"

interface tag {
  name: string;
  documentId: string;
}

export default function SlugPageTags({tag, category}: {tag: tag, category: string | undefined}) {
  return (
    <div
      key={tag.documentId}
      className={clsx(
        "inline-flex text-sm  items-center h-8 px-2 py-1 break-keep",
        {"bg-[#00ffff]": category === "notices"},
        {"bg-[#ffff00]": category === "events"},
        {"bg-[#ff00ff]": category === "exhibitions"},
        {"bg-[#000000] text-gray-200": category === "kookmins"},
      )}
    >
      {tag.name}
    </div>
  )
}