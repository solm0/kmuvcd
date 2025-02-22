'use client'

import { useState, useEffect } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import clsx from "clsx"

const tags = [
  { category: 'notices',
    tags: [
      { name: '학과 공지'},
      { name: '국민대 학사일정'},
      { name: '채용공고'},
      { name: '뉴스'},
    ],
  },
  { category: 'events',
    tags: [
      { name: '공연'},
      { name: '특강'},
      { name: '워크숍'},
      { name: '간식행사'},
      { name: '무비나잇'},
      { name: '조형인의 밤'},
    ],
  },
  { category: 'exhibitions',
    tags: [
      { name: '개인전'},
      { name: '단체전'},
      { name: '조형전'},
      { name: '과제전'},
    ],
  },
  { category: 'clubs',
    tags: [
      { name: '동아리'},
      { name: '서클'},
    ],
  },
]

export default function Tags({category}: {category: string}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentTag, setCurrentTag] = useState('*');

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("tag", '*');
    router.push(`${pathname}?${newParams.toString()}`);
  }, []);

  const handleTag = (query: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("tag", query.toString());
    router.push(`${pathname}?${newParams.toString()}`);
  }

  useEffect(() => {
    const param = searchParams.get('tag');

    if (param && param!== currentTag) {
      setCurrentTag(param);
    }
  }, [searchParams]); 

  // console.log("tag by url", currentTag)

  const currentCategory = tags.find((element) => element.category === category);
  let tagSet
  if (currentCategory?.tags) {
    tagSet = currentCategory?.tags;
  } else {
    tagSet = null;
  }

  return (
    <>
      {(tagSet!==null) && (
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
              onClick={() => handleTag(tag.name)}
              className={clsx("hover:text-gray-500", {"text-gray-500": currentTag === tag.name})}
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}
    </>
  );
}