'use client'

import Link from "next/link"
import clsx from "clsx"
import { usePathname } from "next/navigation"

export default function DocsButton() {
  const pathname = usePathname();

  return (
      <div className="fixed w-28 h-8 transition-colors duration-300">
        <Link
          href="/"
          className={clsx(
            'h-8 flex items-center gap-2 text-sm break-keep hover:text-gray-400',
            {"text-gray-400": pathname === '/'}
          )}
        >
          국민대학교 시각디자인학과
        </Link>
      </div>
  )
}