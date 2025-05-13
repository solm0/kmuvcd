'use client'

import { PostProps, UserDataProps } from "@/app/lib/types";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ListsLayout from "./lists-layout";
import GalleryLayout from "./gallery-layout";
import { queryFilter, bookmarkFilter, yearFilter } from "@/app/lib/utils/query-filter";
import { useEffect } from "react";
import ShowMore from "../show-more";

export function filter(posts: PostProps[], user: UserDataProps, searchParams: URLSearchParams) {
  const tag = searchParams.getAll('tag');
  const search = searchParams.get('search');
  const bookmark = searchParams.get('bookmark');
  const year = searchParams.get('year');
  const filteredEntries = queryFilter(posts, tag, search);
  const bookmarkEntries = bookmarkFilter(filteredEntries, bookmark, user);
  const finalEntries = yearFilter(bookmarkEntries, year);
  return finalEntries;
}

export default function WhatLayout({children, posts, user}: {children: React.ReactNode; posts: PostProps[]; user: UserDataProps;}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const view = searchParams.get("view");

  useEffect(() => {
    if (!view) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("view", 'lists');
      newParams.set("year", '2025');
      router.push(`${pathname}?${newParams.toString()}`);
    }
  }, []);

  // calendar data
  // const calendarPosts = posts
  //   .filter(post => post.startDate !== null)
  //   .map(post => ({
  //     ...post,
  //     endDate: post.endDate ?? post.startDate,
  //   }))

  // const filteredCalendarPosts = filter(calendarPosts, user, searchParams);

  // lists data
  const filteredListsPosts = filter(posts, user, searchParams);

  // gallery data
  const galleryPosts = posts
    .filter(post => post.dynamic?.some(item => "image_block" in item))
    .map((post) => ({
      ...post,
      thumbnail: post.dynamic?.find(item => "image_block" in item)?.image_block?.[0],
    }))
  
  const filteredGalleryPosts = filter(galleryPosts, user, searchParams);

  // 파라미터의 view에 따라 어떤 레이아웃 렌더링할지 정함
  switch (view) {
    case "lists":
      return (
        <ShowMore allPosts={filteredListsPosts}>
          {(visiblePosts) => (
            <ListsLayout posts={visiblePosts} length={filteredListsPosts.length} user={user}>{children}</ListsLayout>
          )}
        </ShowMore>
      )
    case "gallery":
      return (
        <ShowMore allPosts={filteredGalleryPosts}>
          {(visiblePosts) => (
            <GalleryLayout posts={visiblePosts} length={filteredGalleryPosts.length} user={user}>{children}</GalleryLayout>
          )}
        </ShowMore>
      )
  }
}