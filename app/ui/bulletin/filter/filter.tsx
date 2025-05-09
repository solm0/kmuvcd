'use client'

import { Search } from "./search";
import MoreOptions from "./more-options";
import clsx from 'clsx';
import CategoryButton from "./category-button";
import { useIsOpen } from "@/app/lib/utils/use-is-open";

export default function Filter({login}: {login: boolean }) {
  const isOpen = useIsOpen();

  return(
    <nav className={clsx("h-auto flex items-start flex-col gap-4 w-full md:w-96 p-4 mb-4 bg-gray-100", isOpen && "md:w-full")}>
      <Search />
      <MoreOptions login={login} />
      <CategoryButton />
    </nav>
  );
}