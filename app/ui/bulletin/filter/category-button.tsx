'use client'

import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import Tags from "./tags";
import { tags } from "@/app/lib/data/tags";

export default function CategoryButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const param = searchParams.get('view');

  useEffect(() => {
    if (!param) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("view", 'lists');
      newParams.set("tag", '*');
      router.push(`${pathname}?${newParams.toString()}`);
    }
  }, []);

  const [isTagOpen, setIsTagOpen] = useState({
    notices: false,
    events: false,
    exhibitions: false,
    kookmins: false,
  });

  console.log(isTagOpen)

  const toggleTag = (tag: string, value: boolean) => {
    console.log(tag, value);

    setIsTagOpen(prev => ({
      ...prev,
      [tag]: value,
    }));
  };

  return (
    <>
      <nav className="w-auto h-auto p-4 text-sm bg-gray-100 flex flex-wrap items-center gap-4">
        {tags.map((tag) => (
          <div key={tag.name}>
            <button
              onClick={() => toggleTag(tag.tag, !isTagOpen[tag.tag as keyof typeof isTagOpen])}
              className={clsx("hover:text-gray-400", { "text-gray-400": isTagOpen[tag.tag as keyof typeof isTagOpen] })}
            >
              {tag.name}
            </button>
            {isTagOpen[tag.tag as keyof typeof isTagOpen] &&
              <Tags category={tag.tag} />
            }
          </div>
        ))}
      </nav>
    </>
  );
}