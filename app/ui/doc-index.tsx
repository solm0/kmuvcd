'use client'

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams} from "next/navigation";
import { useState } from "react";

const categories = [
  { name: '소개',
    lists: [
      { name: '목표', href: 'mission'},
    ]
  },
  { name: '교육',
    lists: [
      { name: '교수진', href: 'professors'},
      { name: '커리큘럼', href: 'curriculum'},
      { name: '대학원', href: 'grad_schools'},
      { name: '국제교류', href: 'international'}
    ]
  },
  { name: '학생 지원',
    lists: [
      { name: '학생회', href: 'student_councils'},
      { name: '교직원', href: 'staffs'},
      { name: '시설', href: 'facility'},
    ]
  },
  { name: '학사 정보',
    lists: [
      { name: '졸업 요건', href: 'graduation'},
      { name: '복/부전공 요건', href: 'major'}
    ]
  },
]

export default function DocIndex() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hash, setHash] = useState<string>();

  return (
    <>
      {categories.map((category) => (
        <div 
          key={category.name}
          className="w-full h-auto border-t border-gray-400 flex flex-col items-start"
        >
          <div className="p-4 h-12 flex items-center">
            {category.name}
          </div>
          <div className="ml-28 -mt-12 w-28 h-auto p-0">
            {category.lists.map((link, index) => {
              return (
                <div
                  key={`${link.name}-${index}`}
                  className={clsx(
                    "w-28 h-12 break-keep hover:bg-gray-300 transition-colors",
                    {
                      "bg-gray-300": hash === `#${link.href}`,
                    },
                  )}
                >
                  <button
                    onClick={() => {
                      document.getElementById(link.href)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                      setHash(`#${link.href}`);
                      router.replace(`${pathname}?${searchParams}#${link.href}`, {scroll: false});
                    }}
                    className="w-full h-full flex items-center p-4"
                    >
                    {link.name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}