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
  const [isSelected, setIsSelected] = useState<string[]>([]);

  useEffect(() => {
    if (!param) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("view", 'lists');
      newParams.set("tag", '*');
      router.push(`${pathname}?${newParams.toString()}`);
    }
  }, []);

  const handleCategory = (query: string) => {
    if (isSelected.includes(query)) {
      setIsSelected(prev => prev.filter(item => item !== query))
    } else {
      setIsSelected(prev => [...prev, query])
    }

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("tag", '*');
    router.push(`${pathname}?${newParams.toString()}`);
  }

  return (
    <>
      <nav className="w-auto h-auto p-4 text-sm bg-gray-100 flex flex-wrap items-center gap-4">
        {tags.map((tag) => (
          <div key={tag.name}>
            <button
              onClick={() => handleCategory(tag.tag)}
              className={clsx("hover:text-gray-400", {"text-gray-400": isSelected.includes(tag.tag)})}
            >
              {tag.name}
            </button>
            {isSelected.includes(tag.tag) &&
              <Tags category={tag.tag} />
            }
          </div>
        ))}
      </nav>
    </>
  );
}