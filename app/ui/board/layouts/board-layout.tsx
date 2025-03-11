'use client'

import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { useState, useEffect } from "react";

export default function BoardLayout({children}: {children: React.ReactNode}) {
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("expand") === "true") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [searchParams]);

  return(
    <div className={clsx("w-full h-full flex flex-col", isOpen ? "bg-gray-200 hover:bg-white transition-colors duration-300" : "bg-white")}>
      {children}
    </div>
  );
}