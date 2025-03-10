"use client";

import { motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default function AnimatedContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasSubPath = pathname.split('/').slice(2, 3).length !== 0;

  const generateHref = (pathname: string, searchParams: string) => {
    const cleanPathname = pathname.split('/').slice(0, 2).join('/');
    return `${cleanPathname}?${searchParams}`;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ width: "0%", opacity: 0, x: 50 }}
        animate={{ width: hasSubPath ? "50%" : "0%", opacity: 1, x: 0 }}
        exit={{ width: "0%", opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
        className={clsx("shadow-lg", {"min-w-72": hasSubPath})}
      >
        <div className="h-12 p-4 flex absolute w-1/2 items-center">
          <Link
            href={generateHref(pathname, searchParams.toString())}
            className="ml-auto text-gray-600 hover:text-gray-900 z-80 transition-colors"
          >
            <X />
          </Link>
        </div>
        <div className="relative top-12 h-[calc(100%-3rem)]">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}