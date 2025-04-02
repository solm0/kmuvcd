'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { useState, useEffect } from "react";

export default function DetailWindow({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isCleanPath = pathname === "/";

  const generateHref = (searchParams: string) => {
    return `/?${searchParams}`;
  }

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("expand") === "true") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
      // console.log('closed', isOpen)
    }
  }, [searchParams]);

  return (
      <div className={clsx(
        "absolute right-0 top-0 bg-white/20 backdrop-blur-md border border-gray-500 w-full h-full md:w-1/2 md:h-auto max-h-full z-10 overflow-x-auto",
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