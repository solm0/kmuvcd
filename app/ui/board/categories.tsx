'use client'

import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import Tags from "./tags";

const categories = [
  { name: '공지', query: 'notices', },
  { name: '이벤트', query: 'events', },
  { name: '전시', query: 'exhibitions', },
  { name: '동아리', query: 'clubs', },
  { name: '국민대', query: 'kookmins', },
]

export default function Categories() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentCategory, setCurrentCategory] = useState('*');

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("category", '*');
    newParams.set("tag", '*');
    router.push(`${pathname}?${newParams.toString()}`);
  }, []);

  const handleCategory = (query: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("category", query);
    newParams.set("tag", '*');
    router.push(`${pathname}?${newParams.toString()}`);
  }

  useEffect(() => {
    const param = searchParams.get('category');

    if (param && param !== currentCategory) {
      setCurrentCategory(param);
    }
  }, [searchParams]);

  return (
    <>
      <div className="bg-gray-200 h-12 p-4 flex items-center border-b border-gray-400 gap-4">
        <label>카테고리: </label>
        <button
          onClick={() => handleCategory('*')}
          className={clsx("hover:text-gray-500", {"text-gray-500": currentCategory === '*'})}
        >
          전체
        </button>
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => handleCategory(category.query)}
            className={clsx("hover:text-gray-500", {"text-gray-500": currentCategory === category.query})}
          >
            {category.name}
          </button>
        ))}
      </div>
      {currentCategory !== '*' && <Tags category={currentCategory} />}
    </>
  );
}