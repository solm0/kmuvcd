'use client'

import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import Tags from "../board/tags";

const categories = [
  { name: '공지', query: 'notices', },
  { name: '이벤트', query: 'events', },
  { name: '전시', query: 'exhibitions', },
  { name: '활동', query: 'clubs', },
  { name: '국민대', query: 'kookmins', },
]

export default function CategoryButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const param = searchParams.get('view');
  const [isSelected, setIsSelected] = useState<string[]>([]);

  useEffect(() => {
    if (!param) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("view", 'calendar');
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
        {categories.map((category) => (
          <div key={category.name}>
            <button
              onClick={() => handleCategory(category.query)}
              className={clsx("hover:text-gray-400", {"text-gray-400": isSelected.includes(category.query)})}
            >
              {category.name}
            </button>
            {isSelected.includes(category.query) &&
              <Tags category={category.query} />
            }
          </div>
        ))}
      </nav>
    </>
  );
}