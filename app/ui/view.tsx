'use client'

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import Categories from "@/app/ui/board/categories";
import { Search } from "../ui/search";
import { useState, useEffect } from "react";

export default function View() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [layout, setLayout] = useState("calendar");

  useEffect(() => {
    const view = searchParams.get("view");

    if (view) {
      setLayout(view);
    }
  }, [searchParams]);

  const generateHref = (newPath: string, pathname: string, searchParams: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("view", newPath);

    return `${pathname}/?${newParams.toString()}`
  };

  return(
    <nav className="h-auto">
      <div className="w-full h-8 text-sm p-4 flex items-center gap-4">
        <label>보기: </label>
        <Link href={generateHref('calendar', pathname, searchParams.toString())} className={clsx("hover:text-gray-400", {"text-gray-400": layout === 'calendar'})}>
          캘린더
        </Link>
        <Link href={generateHref('lists', pathname, searchParams.toString())} className={clsx("hover:text-gray-400", {"text-gray-400": layout === 'lists'})}>
          리스트
        </Link>
        <Link href={generateHref('gallery', pathname, searchParams.toString())} className={clsx("hover:text-gray-400", {"text-gray-400": layout === 'gallery'})}>
          이미지
        </Link>
      </div>
      <Categories />
      <Search />
    </nav>
  );
}