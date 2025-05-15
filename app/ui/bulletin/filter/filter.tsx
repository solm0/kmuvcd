'use client'

import ViewButton from "./view-button";
import { Search } from "./search";
import MoreOptions from "./more-options";
import CategoryButton from "./category-button";

export default function Filter({login}: {login: boolean }) {
  return(
    <div className="flex flex-col gap-4 items-start bg-white">
    <ViewButton />
    <nav className="h-auto flex items-start flex-col gap-4 w-full p-4 bg-gray-100">
      <Search />
      <MoreOptions login={login} />
      <CategoryButton />
    </nav>
    </div>
  );
}