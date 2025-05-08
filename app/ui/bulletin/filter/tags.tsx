'use client'

import { useState } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import clsx from "clsx"
import { tags } from "@/app/lib/data/tags"

export default function Tags({tag}: {tag: string}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const thisTag = tags.find((item) => item.tag === tag);
  let subTags;

  if (thisTag?.sub_tags) {
    subTags = thisTag?.sub_tags;
  } else {
    subTags = null;
  }

  const [isSelected, setIsSelected] = useState(() =>
    subTags ? Object.fromEntries(subTags?.map(tag => [tag.name, false])) : {}
  );

  const handleOne = (tag: string) => {
    const value = isSelected[tag as keyof typeof isSelected];
    const newParams = new URLSearchParams(searchParams.toString());

    if (value === false) {
      newParams.append("tag", tag);
    } else {
      newParams.delete("tag", tag);
    }

    router.push(`${pathname}?${newParams.toString()}`);

    setIsSelected(prev => ({
      ...prev,
      [tag]: !value,
    }));
  }

  const [isAllSelected, setIsAllSelected] = useState(false);

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
      setIsAllSelected(true);
    } else {
      removeAll();
      setIsAllSelected(false);
    }
  }

  // useEffect로 url바뀔 때마다 확인해서 하위태그 전부 있으면 setIsAllSelected(true)

  // sync: url확인해서 해당 하위태그 상태 true로 sync하기

  return (
    <>
      {subTags && (
        <div className="h-auto text-sm flex items-center gap-3 flex-wrap">
          <button
            onClick={handleAll}
            className={clsx("hover:text-gray-400 h-6 w-auto px-3 break-keep border border-black", )}
          >
            전체
          </button>
          {subTags?.map((tag) => (
            <button
              key={tag.name}
              onClick={() => handleOne(tag.name)}
              className={clsx("hover:text-gray-400 h-6 w-auto px-3 break-keep border border-black", {"bg-gray-200": isSelected[tag.name as keyof typeof isSelected]})}
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}
    </>
  );
}