'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from 'clsx';

interface ButtonProps {
  text: string;
  href: string;
}

export default function Button({text, href}: ButtonProps) {
  const pathname = usePathname();

  return (
    <Link
      className={clsx(
        "rounded-full border border-solid border-black/[.08] transition-colors flex items-center justify-center hover:bg-[#f2f2f2]  hover:border-transparent text-sm sm:text-base h-10 sm:h-10 px-4 sm:px-5 sm:min-w-40",
        {
          'bg-[#f2f2f2]': pathname === href,
        }
      )}
      href={ href }
    >
      {text}
    </Link>
  )
}