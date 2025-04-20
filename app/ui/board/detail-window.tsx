'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { useIsOpen } from "@/app/lib/utils/use-is-open";

export default function DetailWindow({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isCleanPath = pathname === "/";

  const generateHref = (searchParams: string) => {
    return `/?${searchParams}`;
  }

  const isOpen = useIsOpen();

  return (
      <div className={clsx(
        "absolute right-0 top-0 bg-gray-100  w-full h-full md:w-1/2 md:h-auto max-h-full z-10 overflow-x-auto",
        isOpen && "md:w-[100%] md:h-[100%]",
        isCleanPath && "hidden"
        )}
      >
        <div className="h-12 p-4 flex absolute w-full items-center">
          <Link
            href={generateHref(searchParams.toString())}
            className="ml-auto text-gray-600 hover:text-gray-900 z-30 transition-colors"
          >
            <X />
          </Link>
        </div>
        <div>
          {children}
        </div>
      </div>
  );
}