'use client'

import BookmarkFilter from "./bookmark-filter";
import YearFilter from "./year-filter";

export default function MoreOptions({ login }: { login: boolean }) {

  return (
    <div className="h-4 text-sm flex items-center gap-4">
      <BookmarkFilter login={login} />
      <YearFilter />
    </div>
  );
}