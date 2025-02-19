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

export default function LeftNavLinks({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isContentOpen, setIsContentOpen] = useState(false);
  
  const pathname = usePathname();

  const handleOpen = () => {
    setIsOpen(!isOpen);

    if (hasSubPath) {
      setIsContentOpen(true);
    }

    if (isContentOpen) {
      setIsContentOpen(false);
    }
  }

  const handleContentOpen = () => {
    if (pathname && !isContentOpen) {
      setIsContentOpen(true);
    }
  }

  const hasSubPath = pathname !== "/" && pathname.split("/").length > 1;

  return (
    <div
      className="h-full w-screen flex"
      onClick={isOpen ? undefined : handleOpen}
    >
      <div
        className={clsx(
          "bg-gray-200 h-full w-28 transition-[width, colors] duration-300",
          isOpen ?
            isContentOpen && hasSubPath ? "w-[42rem]"
            : "w-56"
          : "hover:bg-gray-300"
          // {
          //   "w-auto": isContentOpen,
          // }
        )}
        onClick={isOpen ? undefined : handleOpen}
      > 
        <div className="bg-gray-400 w-full h-12 flex p-4 items-center border-b border-gray-400">
          {isOpen && (
            <button onClick={handleOpen} className="ml-auto text-gray-600 hover:text-gray-900 z-80 transition-colors">
              <X />
            </button>
          )}
        </div>

        <div className="flex h-[calc(100%-48px)]">
          <div className={clsx(
            "w-28", {"w-56": isOpen},
          )}>
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
                        onClick={handleContentOpen}
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
          <div className={clsx(
            "w-full h-full", {"w-0": !isContentOpen}
          )}>
            {hasSubPath && isContentOpen && (
              <div className="bg-gray-200 overflow-y-auto max-h-full top-16 p-4 border-t border-gray-400">
                {children}
              </div>
            )}
          </div>
        </div>
      </div>


    </div>
  )
}