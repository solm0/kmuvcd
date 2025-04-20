'use client'

import { Search } from "./search";
import MoreOptions from "./more-options";
import clsx from 'clsx';
import ViewButton from "../header/view-button";
import CategoryButton from "../header/category-button";
import { useIsOpen } from "@/app/lib/utils/use-is-open";

export default function Filter({login}: {login: boolean }) {
  const isOpen = useIsOpen();

  return(
    <nav className={clsx("h-auto flex items-start flex-col gap-4 w-full md:w-96", isOpen && "md:w-full")}>
      <ViewButton />
      <Search />
      <CategoryButton />
      <MoreOptions login={login} />
    </nav>
  );
}