'use client'

import Categories from "@/app/ui/board/categories";
import { Search } from "./search";

export default function Filter() {
  return(
    <nav className="h-auto">
      <Categories />
      <Search />
    </nav>
  );
}