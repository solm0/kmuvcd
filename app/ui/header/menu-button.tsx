'use client'

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";
import { AlignJustify } from 'lucide-react';

export const menus = [
  {
    menu: '홈',
    src: '/',
  },
  {
    menu: '소식',
    src: '/bulletin',
  },
  {
    menu: '동아리/서클',
    src: '/club',
  },
  {
    menu: '아카이브',
    src: '/archive',
  },
  {
    menu: '시설 이용',
    src: '/facility',
  }
]

export default function MenuButton() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClick = (src: string, searchParams: string) => {
    if (pathname === src) {
      return `${src}/?${searchParams}`;
    } else {
      return `${src}`;
    }
  }

  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  return (
    <>
      <button
        className={clsx("fixed right-16 h-8 md:hidden")}
        onClick={() => {setIsHamburgerOpen(!isHamburgerOpen); console.log(isHamburgerOpen)}}
      >
        <AlignJustify className={clsx("flex items-center w-6 h-6 hover:text-gray-500 transition-colors", isHamburgerOpen ? "text-gray-400" : "text-black")} />
      </button>
      <nav className={clsx(
        "fixed right-16 w-auto h-8 text-sm p-4 items-start md:items-center gap-4",
        {
          "hidden md:flex md:flex-row": !isHamburgerOpen,
          "flex flex-col top-12": isHamburgerOpen,
        }
      )}>
        {menus.map((menu) => (
          <Link
            key={menu.src}
            href={handleClick(menu.src, searchParams.toString())}
            className={clsx(
              "hover:text-gray-400 transition-colors",
              {
                "text-gray-400": menu.src === '/'
                ? pathname === '/'
                : pathname.startsWith(menu.src)}
            )}
          >
            {menu.menu}
          </Link>
        ))}
      </nav>
    </>
  )
}