'use client'

import { useState, useEffect } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import clsx from "clsx"

const tags = [
  { category: 'notices',
    tags: [
      { name: '학과 공지'},
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
  { category: 'kookmins',
    tags: [],
  },
]

export default function Tags({category}: {category: string}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentTag, setCurrentTag] = useState('*');
  const param = searchParams.get('tag');

  const handleTag = (query: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("tag", query.toString());
    router.push(`${pathname}?${newParams.toString()}`);
  }

  useEffect(() => {
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
        <div className="h-auto text-sm flex items-center gap-3 flex-wrap">
          <button
            onClick={() => handleTag('*')}
            className={clsx("hover:text-gray-400 h-6 w-auto px-3 break-keep border border-black", {"bg-gray-200": currentTag === '*'})}
          >
            전체
          </button>
          {tagSet?.map((tag) => (
            <button
              key={tag.name}
              onClick={() => handleTag(tag.name)}
              className={clsx("hover:text-gray-400 h-6 w-auto px-3 break-keep border border-black", {"bg-gray-200": currentTag === tag.name})}
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}
    </>
  );
}