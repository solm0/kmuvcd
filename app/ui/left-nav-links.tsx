'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const categories = [
  { name: '소개',
    lists: [
      { name: '목표', href: '/mission'},
      { name: '역사', href: '/history'}
    ]
  },
  { name: '교육',
    lists: [
      { name: '교수진', href: '/professors'},
      { name: '커리큘럼', href: '/curriculum'},
      { name: '대학원', href: '/grad_schools'},
      { name: '국제교류', href: '/international'}
    ]
  },
  { name: '학생 지원',
    lists: [
      { name: '학생회', href: '/student_councils'},
      { name: '교직원', href: '/staffs'},
      { name: '시설', href: '/facility'},
    ]
  },
  { name: '학사 정보',
    lists: [
      { name: '졸업 요건', href: '/graduation'},
      { name: '복/부전공 요건', href: '/major'}
    ]
  },
]

export default function LeftNavLinks() {
  const pathname = usePathname();

  return (
    <div>
      {categories.map((category, index) => (
        <div
          key={index}
          className="w-full h-auto border-t border-gray-400"
        >
          <p className="p-4 h-12">{category.name}</p>
          <div className="ml-28 -mt-12 w-28 h-auto p-0">
            {category.lists.map((link, index) => (
              <div
                key={index}
                className={clsx(
                  "w-28 h-12 break-keep hover:bg-blue-500 transition-colors",
                  {
                    "bg-blue-500": pathname === link.href,
                  },
                )}
              >
                <Link
                  href={link.href}
                  className="w-full h-full flex items-center z-30 p-4"
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}