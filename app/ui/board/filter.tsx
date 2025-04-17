'use client'

import { Search } from "./search";
import MoreOptions from "./more-options";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import clsx from 'clsx';
import ViewButton from "../header/view-button";
import CategoryButton from "../header/category-button";

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
    <nav className={clsx("p-4 h-auto flex items-start flex-col gap-4 w-full md:w-96", isOpen && "md:w-full")}>
      <ViewButton />
      <Search />
      <CategoryButton />
      <MoreOptions login={login} />
    </nav>
  );
}