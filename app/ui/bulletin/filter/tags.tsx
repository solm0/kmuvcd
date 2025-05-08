'use client'

import { useState } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import clsx from "clsx"
import { tags } from "@/app/lib/data/tags"

export default function Tags({category}: {category: string}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentTag, setCurrentTag] = useState<string[]>([]);

  const handleTag = (query: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    const existingTags = newParams.getAll("tag");

    if (existingTags.includes('*')) {
      newParams.delete("tag");
    }

    if (existingTags.includes(query)) {
      const updatedTags = existingTags.filter(tag => tag !== query);
      newParams.delete("tag");

      if (updatedTags.length === 0) {
        newParams.set("tag", '*');
      }
      updatedTags.forEach(tag => newParams.append("tag", tag));
    } else {
      newParams.append("tag", query);
    }
    setCurrentTag(newParams.getAll("tag"));
    router.push(`${pathname}?${newParams.toString()}`);
  }

  const handleAllTag = (queries: {name: string}[]) => {
    const newParams = new URLSearchParams(searchParams.toString());
    const existingTags = newParams.getAll("tag");

    if (existingTags.includes('*')) {
      newParams.delete("tag");
    }

    queries.forEach(query => newParams.append("tag", query.name.toString()));
    router.push(`${pathname}?${newParams.toString()}`);

    setCurrentTag(searchParams.getAll('tag'))
  }

  // console.log("tag by url", currentTag)

  const currentCategory = tags.find((element) => element.tag === category);
  let tagSet
  if (currentCategory?.sub_tags) {
    tagSet = currentCategory?.sub_tags;
  } else {
    tagSet = null;
  }

  return (
    <>
      {(tagSet!==null) && (
        <div className="h-auto text-sm flex items-center gap-3 flex-wrap">
          <button
            onClick={() => handleAllTag(tagSet)}
            className={clsx("hover:text-gray-400 h-6 w-auto px-3 break-keep border border-black", )}
          >
            전체
          </button>
          {tagSet?.map((tag) => (
            <button
              key={tag.name}
              onClick={() => handleTag(tag.name)}
              className={clsx("hover:text-gray-400 h-6 w-auto px-3 break-keep border border-black", {"bg-gray-200": currentTag.includes(tag.name)})}
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}
    </>
  );
}