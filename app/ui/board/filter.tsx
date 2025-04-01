'use client'

import TagSet from "./tag-set";
import { Search } from "./search";
import MoreOptions from "./more-options";

export default function Filter({login}: {login: boolean }) {
  return(
    <nav className="bg-gray-100 p-4 h-auto flex flex-col gap-4 w-96">
      <TagSet />
      <Search />
      <MoreOptions login={login} />
    </nav>
  );
}