'use client'

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { X } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { useIsOpen } from "@/app/lib/utils/use-is-open";

export default function DetailWindow({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const isCleanPath = pathname === "/bulletin";

  const generateHref = (searchParams: string) => {
    return `/bulletin/?${searchParams}`; // TODO: 지우는거 없애야하나? 고정창이면?
  }

  const isOpen = useIsOpen();

  return (
    <div
      className={clsx(
        "absolute right-0 top-0 w-full h-full md:w-1/2 md:h-full pb-4 z-10 overflow-auto scrollbar-hide bg-white bg-opacity-80 block",
        isOpen && "md:w-full md:h-[calc(100% - 24rem)]",
        isCleanPath && isOpen && "hidden",
        isCleanPath && !isOpen && "hidden md:block",
      )}
      onClick={() => {
        const href = generateHref(searchParams.toString());
        router.push(href);
      }}
    >
      <div className={clsx(
        "bg-gray-100 mt-96 sticky top-0 min-h-screen",
        !isOpen && "md:mt-0 md:min-h-full",
        )}
      >
        <div className="h-12 p-4 flex absolute w-full items-center">
          {!isCleanPath &&
            <Link
              href={generateHref(searchParams.toString())}
              className="ml-auto text-gray-600 hover:text-gray-900 z-30 transition-colors"
            >
              <X />
            </Link>
          }
        </div>
        {isCleanPath ?
          <div className="p-4 flex items-center justify-center">아무거나 선택하세요...</div>
          :
          <div>{children}</div>
        }
      </div>
    </div>
  );
}