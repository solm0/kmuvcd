'use client'

import Link from "next/link"
import { usePathname } from "next/navigation";
import clsx from "clsx";

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

  return (
    <nav className="fixed right-16 w-auto h-8 text-sm p-4 flex items-center gap-4">
      {menus.map((menu) => (
        <Link key={menu.src} href={menu.src} className={clsx("hover:text-gray-400", {"text-gray-400": pathname === menu.src})}>{menu.menu}</Link>
      ))}
    </nav>
  )
}