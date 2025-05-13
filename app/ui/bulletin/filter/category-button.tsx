'use client'

import { useState } from "react";
import clsx from "clsx";
import Tags from "./tags";
import { tags } from "@/app/lib/data/tags";

export default function CategoryButton() {

  const [isTagOpen, setIsTagOpen] = useState({
    notices: false,
    events: false,
    exhibitions: false,
    kookmins: false,
  });

  const toggleTag = (tag: string, value: boolean) => {
    setIsTagOpen(prev => ({
      ...prev,
      [tag]: value,
    }));
  };

  return (
    <>
      <nav className="w-auto h-auto text-sm flex flex-wrap items-center">
        {tags.map((tag) => (
          <div key={tag.name} className="flex flex-row">
            <button
              onClick={() => toggleTag(tag.tag, !isTagOpen[tag.tag as keyof typeof isTagOpen])}
              className={clsx(
                "hover:opacity-70 inline-flex items-center h-8 px-3 break-keep transition-all",
                {"bg-[#00ffff]": tag.tag === "notices"},
                {"bg-[#ffff00]": tag.tag === "events"},
                {"bg-[#ff00ff]": tag.tag === "exhibitions"},
                {"bg-[#000000] text-gray-200": tag.tag === "kookmins"},
              )}
            >
              {tag.name}
            </button>
            {isTagOpen[tag.tag as keyof typeof isTagOpen] &&
              <Tags tag={tag.tag} />
            }
          </div>
        ))}
      </nav>
    </>
  );
}