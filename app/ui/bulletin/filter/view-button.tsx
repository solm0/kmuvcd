'use client'

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { Logs, Images } from "lucide-react";

export default function ViewButton() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const layout = searchParams.get("view");

  const generateHref = (newPath: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("view", newPath);

    return `${pathname}/?${newParams.toString()}`
  };

  return (
    <nav className="w-auto h-8 text-sm p-4 bg-gray-100 flex items-center gap-4">
      <Link href={generateHref('lists')} className={clsx("hover:text-gray-400 transition-colors", {"text-gray-400": layout === 'lists'})}>
        <Logs className="w-[16px]" />
      </Link>
      <Link href={generateHref('gallery')} className={clsx("hover:text-gray-400 transition-colors", {"text-gray-400": layout === 'gallery'})}>
        <Images className="w-[16px]" />
      </Link>
    </nav>
  )
}