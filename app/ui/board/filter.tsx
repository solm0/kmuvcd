'use client'

import TagSet from "./tag-set";
import { Search } from "./search";
import MoreOptions from "./more-options";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import clsx from 'clsx';

export default function Filter({login}: {login: boolean }) {
  const searchParams = useSearchParams()
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
    <nav className={clsx("bg-gray-100 p-4 h-auto flex flex-col gap-4 w-full md:w-96", isOpen && "md:w-full")}>
      <TagSet />
      <Search />
      <MoreOptions login={login} />
    </nav>
  );
}