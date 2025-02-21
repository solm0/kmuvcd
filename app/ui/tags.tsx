'use client'

import { useState, useEffect } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import clsx from "clsx"

const tags = [
  { category: 'exhibitions',
    tags: [
      { name: '개인전', query: 'solo' },
      { name: '단체전', query: 'group'},
      { name: '조형전', query: 'kmuvcd'},
      { name: '과제전', query: 'assignment'},
    ],
  },
  { category: 'clubs',
    tags: [
      { name: '동아리', query: 'regular' },
      { name: '서클', query: 'circle'},
    ],
  },
  { category: 'events',
    tags: [
      { name: '공연', query: 'concert' },
      { name: '특강', query: 'lecture'},
      { name: '워크숍', query: 'workshop'},
      { name: '간식행사', query: 'snack'},
      { name: '무비나잇', query: 'movienight'},
      { name: '조형인의 밤', query: 'party'},
    ],
  },
  { category: 'notices',
    tags: [
      { name: '학사일정', query: 'academic' },
      { name: '뉴스', query: 'news'},
      { name: '공지', query: 'announcement'},
      { name: '채용공고', query: 'job'},
    ],
  },
]

export default function Tags({category}: {category: string}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentTag, setCurrentTag] = useState('*');

  console.log(currentTag)

  useEffect(() => {
    setCurrentTag(searchParams.get('tag') || '*'); 
}, [searchParams]); 

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("tag", '*');
    router.push(`${pathname}?${newParams.toString()}`);
  }, []);

  const handleTag = (query: string) => {
    setCurrentTag(query);

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("tag", query.toString());
    router.push(`${pathname}?${newParams.toString()}`);
  }

  const currentCategory = tags.find((element) => element.category === category);
  const tagSet = currentCategory?.tags;

  return (
    <div className="bg-gray-200 h-12 p-4 flex items-center border-b border-gray-400 gap-4">
      <label>태그: </label>
      <button
        onClick={() => handleTag('*')}
        className={clsx("hover:text-gray-500", {"text-gray-500": currentTag === '*'})}
      >
        전체
      </button>
      {tagSet?.map((tag, index) => (
        <button
          key={index}
          onClick={() => handleTag(tag.query)}
          className={clsx("hover:text-gray-500", {"text-gray-500": currentTag === tag.query})}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
}