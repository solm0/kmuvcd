'use client'

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import Categories from "@/app/ui/categories";

export default function Layout({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const generateHref = (path: string) => {
    return queryString ? `${path}?${queryString}` : path;
  };

  return(
    <div className="w-full h-full flex flex-col">
      <nav className="h-auto">
        <div className="bg-gray-200 w-full h-12 p-4 flex items-center border-b border-gray-400 gap-4">
          <label>보기: </label>
          <Link href={generateHref('/calendar')} className={clsx("hover:text-gray-500", {"text-gray-500": pathname === '/calendar'})}>
            캘린더
          </Link>
          <Link href={generateHref('/lists')} className={clsx("hover:text-gray-500", {"text-gray-500": pathname === '/lists'})}>
            리스트
          </Link>
          <Link href={generateHref('/images')} className={clsx("hover:text-gray-500", {"text-gray-500": pathname === '/images'})}>
            이미지
          </Link>
        </div>
        <Categories />
      </nav>
      
      <div className="p-4 flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}