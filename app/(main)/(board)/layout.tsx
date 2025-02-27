'use client'

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import Categories from "@/app/ui/board/categories";
import { Search } from "@/app/ui/search";

export default function Layout({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const generateHref = (newPath: string, pathname: string, searchParams: string) => {
    const subPath = pathname.split('/').slice(2, 3);
    return `${newPath}/${subPath}?${searchParams}`;
  };

  return(
    <div className="w-full h-full flex flex-col ">
      <nav className="h-auto">
        <div className="bg-gray-200 w-full h-12 p-4 flex items-center border-b border-gray-400 gap-4">
          <label>보기: </label>
          <Link href={generateHref('/calendar', pathname, searchParams.toString())} className={clsx("hover:text-gray-500", {"text-gray-500": pathname.startsWith('/calendar')})}>
            캘린더
          </Link>
          <Link href={generateHref('/lists', pathname, searchParams.toString())} className={clsx("hover:text-gray-500", {"text-gray-500": pathname.startsWith('/lists')})}>
            리스트
          </Link>
          <Link href={generateHref('/images', pathname, searchParams.toString())} className={clsx("hover:text-gray-500", {"text-gray-500": pathname.startsWith('/images')})}>
            이미지
          </Link>

          <div className="ml-auto w-96 border-l border-gray-400 h-12 p-4 flex items-center">
            <Search />
          </div>
        </div>
        <Categories />
      </nav>
      
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}