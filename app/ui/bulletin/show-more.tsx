'use client'

import { useState } from "react"
import { PostProps } from "@/app/lib/types"

export default function ShowMore({
  allPosts,
  batchSize = 20,
  children,
}: {
  allPosts: PostProps[],
  batchSize?: number,
  children: (visiblePosts: PostProps[]) => React.ReactNode
}) {
  const [visibleCount, setVisibleCount] = useState(batchSize);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + batchSize);
  };

  const visiblePosts = allPosts.slice(0, visibleCount);

  return (
    <div className="overflow-auto">
      {children(visiblePosts)}

      {visibleCount < allPosts.length && (
        <button
          onClick={handleShowMore}
        >
          {<span>{`${visibleCount}/${allPosts.length} `}</span>}
          <span className="transition-colors px-3 py-1 rounded-full border bg-gray-50 border-gray-300 hover:bg-gray-100 hover:text-gray-600">더 보기</span>
        </button>
      )}
    </div>
  )
}