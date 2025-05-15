'use client'

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { X } from "lucide-react";
import Link from "next/link";

export default function DetailWindow({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const isCleanPath = pathname === "/bulletin";

  const generateHref = (searchParams: string) => {
    return `/bulletin/?${searchParams}`; // TODO: 지우는거 없애야하나? 고정창이면?
  }

  return (
    <div
      className="absolute right-0 md:left-[26rem] top-0 w-full h-full md:w-[36rem] md:h-full pb-4 z-10 overflow-auto scrollbar-hide bg-white bg-opacity-80 block"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const href = generateHref(searchParams.toString());
          router.push(href);
        }
      }}
    >
      <div className="bg-white mt-96 sticky top-0 min-h-screen border border-gray-200 md:mt-0 md:min-h-full">
        <div className="h-12 sticky top-0 w-12 ml-auto pt-4">
          {!isCleanPath &&
            <Link
              href={generateHref(searchParams.toString())}
              className="flex items-center justify-center text-gray-600 hover:text-gray-900 z-30 transition-colors"
            >
              <X />
            </Link>
          }
        </div>
        {isCleanPath ?
          <div className="p-4 flex items-center justify-center">아무거나 선택하세요...</div>
          :
          <div className="relative -top-12 w-[calc(100%-3rem)]">{children}</div>
        }
      </div>
    </div>
  );
}