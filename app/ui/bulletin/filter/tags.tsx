'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation"
import clsx from "clsx"
import { tags } from "@/app/lib/data/tags"

export default function Tags({tag}: {tag: string}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedTags = searchParams.getAll("tag");

  const thisTag = tags.find((item) => item.tag === tag);
  let subTags;

  if (thisTag?.sub_tags) {
    subTags = thisTag?.sub_tags;
  } else {
    subTags = null;
  }

  const isAllSelected = subTags?.every(tag => selectedTags.includes(tag.name));
  const isTagSelected = (name: string) => selectedTags.includes(name);

  const handleOne = (name: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    const tags = newParams.getAll("tag");

    if (tags.includes(name)) {
      const updated = tags.filter(tag => tag !== name);
      newParams.delete("tag");
      updated.forEach(tag => newParams.append("tag", tag));
    } else {
      newParams.append("tag", name);
    }

    router.push(`${pathname}?${newParams.toString()}`);
  }

  const selectAll = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    const existingTags = newParams.getAll("tag");

    // 하위태그 전부가 existingTags에 있는지 확인, 없으면 추가
    if (subTags) {
      const subTagNames = subTags.map(tag => tag.name);
      const newTags = new Set([...existingTags, ...subTagNames]);

      newParams.delete("tag");
      newTags.forEach(tag => newParams.append("tag", tag));
    }

    router.push(`${pathname}?${newParams.toString()}`);
  }

  const removeAll = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    const existingTags = newParams.getAll("tag");

    // existingTags에 해당 하위태그 중 하나라도 있는지 확인, 있으면 삭제
    if (subTags) {
      newParams.delete("tag");

      const subTagNames = subTags.map(tag => tag.name);

      const filteredTags = existingTags.filter(tag => !subTagNames.includes(tag));

      filteredTags.forEach(tag => {
        newParams.append("tag", tag);
      });
    }

    router.push(`${pathname}?${newParams.toString()}`);
  }

  const handleAll = () => {
    if (!isAllSelected) {
      selectAll();
    } else {
      removeAll();
    }
  }

  return (
    <>
      {subTags && (
        <div className="h-auto text-sm flex items-center gap-3 flex-wrap">
          <button
            onClick={handleAll}
            className={clsx("hover:text-gray-400 h-6 w-auto px-3 break-keep border border-black", {"bg-gray-200": isAllSelected} )}
          >
            전체
          </button>
          {subTags?.map((tag) => (
            <button
              key={tag.name}
              onClick={() => handleOne(tag.name)}
              className={clsx("hover:text-gray-400 h-6 w-auto px-3 break-keep border border-black", {"bg-gray-200": isTagSelected(tag.name)})}
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}
    </>
  );
}