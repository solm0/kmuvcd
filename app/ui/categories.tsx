'use client'

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";

const categories = [
  { name: '전시', query: 'exhibitions', },
  { name: '동아리', query: 'clubs', },
  { name: '이벤트', query: 'events', },
  { name: '공지', query: 'notices', },
]

export default function Categories() {
  const [currentCategory, setCurrentCategory] = useState('exhibitions');
  const searchParams = useSearchParams();

  const handleCategory = (query: string) => {
    setCurrentCategory(query);

    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set("category", query.toString());
    window.history.pushState({}, "", "?" + newParams.toString());
  }

  return (
    <div className="bg-gray-200 h-12 p-4 flex items-center border-b border-gray-400 gap-4">
      <label>카테고리: </label>
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => handleCategory(category.query)}
          className={clsx("hover:text-gray-500", {"text-gray-500": currentCategory === category.query})}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}