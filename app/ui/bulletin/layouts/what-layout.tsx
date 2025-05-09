'use client'

import { PostProps, UserDataProps } from "@/app/lib/types";
import { useSearchParams } from "next/navigation";
import CalendarLayout from "./calendar-layout";
import ListsLayout from "./lists-layout";
import GalleryLayout from "./gallery-layout";
import { useState, useEffect } from "react";
import { queryFilter, bookmarkFilter } from "@/app/lib/utils/query-filter";

export function filter(posts: PostProps[], user: UserDataProps, searchParams: URLSearchParams) {
  const tag = searchParams.getAll('tag');
  const search = searchParams.get('search');
  const bookmark = searchParams.get('bookmark');
  const filteredEntries = queryFilter(posts, tag, search);
  const bookmarkEntries = bookmarkFilter(filteredEntries, bookmark, user);
  return bookmarkEntries;
}

export default function WhatLayout({children, posts, user}: {children: React.ReactNode; posts: PostProps[]; user: UserDataProps;}) {
  const searchParams = useSearchParams();
  const [layout, setLayout] = useState("calendar");

  useEffect(() => {
    const view = searchParams.get("view");

    if (view) {
      setLayout(view);
    }
  }, [searchParams]);

  // calendar data

  // posts를 startDate가 있는것만 filter
  const c_filteredPosts = posts
    .filter(post => post.startDate !== null)

  // 누락된 endDate 채우기, 시간순 sort
  const calendarPosts = c_filteredPosts
    .map(post => ({
      ...post,
      endDate: post.endDate ?? post.startDate,
    }))
    .sort(function(a: PostProps, b: PostProps) {
      return (
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime() ||
        new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
      );
  });

  const filteredCalendarPosts = filter(calendarPosts, user, searchParams);

  // lists data

  // publishedAt 정렬.
  const listsPosts = posts
    .sort((a: PostProps, b: PostProps) => {
      return (
        new Date(a.publishedAt ?? "9999-12-31T23:59:59Z").getTime() - new Date(b.publishedAt ?? "9999-12-31T23:59:59Z").getTime() ||
        new Date(a.startDate)?.getTime() - new Date(b.startDate)?.getTime() ||
        new Date(a.endDate)?.getTime() - new Date(b.endDate)?.getTime()
      )
    }) 

  const filteredListsPosts = filter(listsPosts, user, searchParams);

  // gallery data

  // dynamic zone -> image_block이 있는것만 filter
  const g_filteredPosts = posts
    .filter(post => post.dynamic?.some(item => "image_block" in item));

  // image_block을 thumbnail로.
  const thumbnailPosts = g_filteredPosts
    .map((post) => ({
      ...post,
      thumbnail: post.dynamic?.find(item => "image_block" in item)?.image_block?.[0],
    }))

  // publishedAt sort
  const galleryPosts = thumbnailPosts
    .sort((a: PostProps, b: PostProps) => {
      return (
        new Date(a.publishedAt ?? "9999-12-31T23:59:59Z").getTime() - new Date(b.publishedAt ?? "9999-12-31T23:59:59Z").getTime() ||
        new Date(a.startDate)?.getTime() - new Date(b.startDate)?.getTime() ||
        new Date(a.endDate)?.getTime() - new Date(b.endDate)?.getTime()
      );
    });

  const filteredGalleryPosts = filter(galleryPosts, user, searchParams);

  // 파라미터의 view에 따라 어떤 레이아웃 렌더링할지 정함
  switch (layout) {
    case "calendar":
      return <CalendarLayout posts={calendarPosts} filteredPosts={filteredCalendarPosts} user={user}>{children}</CalendarLayout>;
    case "lists":
      return <ListsLayout posts={filteredListsPosts} user={user}>{children}</ListsLayout>;
    case "gallery":
      return <GalleryLayout posts={filteredGalleryPosts} user={user}>{children}</GalleryLayout>;
  }
}