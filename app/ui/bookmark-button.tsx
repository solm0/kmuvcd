'use client'

import { useState, useEffect } from "react";
import { PostProps, UserDataProps } from "@/app/lib/definitions";
import { BookmarkIcon as BookmarkOutlineIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";
import { addBookmark, removeBookmark } from "../lib/updateBookmark";

export default function BookmarkButton ({ postId, token, user, category }: { postId: string; token: string; user: UserDataProps, category: string} ) {
  const [userData, setUserData] = useState<UserDataProps | null>(user);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // clubs, events, exhibitions, notices, kookmins를 다 map해서 documentId를 빼낸다.
  useEffect(() => {
    if (userData) {
      const categories = ["clubs", "events", "exhibitions", "notices", "kookmins"];
      const allPostIds = categories.flatMap(
        (category) => ((userData as unknown as Record<string, PostProps[]>)[category] || [])
          .map((post) => post.documentId)
      );
      setIsBookmarked(allPostIds.includes(postId));
    }
  }, [userData, postId]);

  const handleAddBookmark = async () => {
    if (userData?.id && postId) {
      try {
        setIsBookmarked(true);
  
        const result = await addBookmark(userData?.documentId, postId, token, category);
        console.log("Bookmark added:", result);
  
        setUserData((prev) =>
          prev
            ? {
                ...prev,
                [category]: [
                  ...((prev as unknown as Record<string, PostProps[]>)[category] || []),
                  { documentId: postId, publishedAt: "" } as PostProps,
                ],
              }
            : prev
        );
      } catch (error) {
        console.log("Error adding bookmark:", error);
      }
    }
  };

  const handleRemoveBookmark = async () => {
    if (userData?.id && postId) {
      try {
        setIsBookmarked(false);
  
        const result = await removeBookmark(userData?.documentId, postId, token, category);
        console.log("Bookmark deleted:", result);
  
        setUserData((prev) =>
          prev
            ? {
                ...prev,
                [category]: (prev as unknown as Record<string, PostProps[]>)[category]?.filter((post) => post.documentId !== postId) || [],
              }
            : prev
        );
      } catch (error) {
        console.log("Error deleting bookmark:", error);
      }
    }
  };

  return (
    <div>
      {isBookmarked ? 
        <button onClick={handleRemoveBookmark}>
          <BookmarkSolidIcon className="w-6 h-6 text-gray-400 hover:text-gray-500" />
        </button>
      : 
        <button onClick={handleAddBookmark}>
          <BookmarkOutlineIcon className="w-6 h-6 text-gray-500 hover:text-gray-600" />
        </button>
      }
    </div>
  )
}
