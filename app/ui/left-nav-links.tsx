'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";
import { X } from 'lucide-react';

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
  const [isOpen, setIsOpen] = useState(false);
  
  const pathname = usePathname();

  const handleOpen = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div
      className={clsx(
        "bg-gray-200 h-full w-28 transition-[width, colors] duration-300",
        {
          "w-56": isOpen,
        },
        {
          "hover:bg-gray-300": !isOpen,
        }
      )}
      onClick={isOpen ? undefined : handleOpen}
    >
      <div className="bg-gray-400 h-12 flex p-4 items-center">
        {isOpen && (
          <button onClick={handleOpen} className="ml-auto text-gray-600 hover:text-gray-900 z-80 transition-colors">
            <X />
          </button>
        )}
      </div>
      {categories.map((category, index) => (
        <div
          key={index}
          className="w-full h-auto border-t border-gray-400 flex flex-col items-start"
        >
          <div className="p-4 h-12 flex items-center">
            {category.name}
          </div>
          {isOpen && (
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
                  className="w-full h-full flex items-center p-4"
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>
          )}
        </div>
      ))}
    </div>
  )
}