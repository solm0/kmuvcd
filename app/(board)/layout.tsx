'use client'

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import Categories from "@/app/ui/board/categories";
import { Search } from "../ui/search";
import { useState, useEffect } from "react";

export default function Layout({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const generateHref = (newPath: string, pathname: string, searchParams: string) => {
    const subPath = pathname.split('/').slice(2, 3);
    return `${newPath}/${subPath}?${searchParams}`;
  };

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("expand") === "true") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
      // console.log('closed', isOpen)
    }
  }, [searchParams]);

  return(
    <div className={clsx("w-full h-full flex flex-col", isOpen ? "bg-gray-200 hover:bg-white transition-colors duration-300" : "bg-white")}>
      <nav className="h-auto">
        <div className="w-full h-8 text-sm p-4 flex items-center gap-4">
          <label>보기: </label>
          <Link href={generateHref('/calendar', pathname, searchParams.toString())} className={clsx("hover:text-gray-400", {"text-gray-400": pathname.startsWith('/calendar')})}>
            캘린더
          </Link>
          <Link href={generateHref('/lists', pathname, searchParams.toString())} className={clsx("hover:text-gray-400", {"text-gray-400": pathname.startsWith('/lists')})}>
            리스트
          </Link>
          <Link href={generateHref('/images', pathname, searchParams.toString())} className={clsx("hover:text-gray-400", {"text-gray-400": pathname.startsWith('/images')})}>
            이미지
          </Link>
        </div>
        <Categories />
        <Search />
      </nav>
      
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}