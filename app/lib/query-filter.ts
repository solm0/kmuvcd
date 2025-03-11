import { PostProps, UserDataProps } from "./definitions";
import Fuse from 'fuse.js'

export function queryFilter(
  data: PostProps[],
  category: string | null,
  tag: string | null,
  search: string | null,
) {

  // 카테고리 필터링
  let categoryFiltered;

  if (category === '*') {
    categoryFiltered = data;
  } else {
    categoryFiltered = data.filter((entry) => {
      return category && entry.category === category;
    })
  }

  // console.log("categoryFiltered", categoryFiltered)

  // 태그 필터링
  let tagFiltered;

  if (tag === '*') {
    tagFiltered = categoryFiltered;
  } else {
    tagFiltered = categoryFiltered.filter((entry) => {
      return tag && Array.isArray(entry.tags) && entry.tags.some(t => t.name === tag);
    })
  }

  // console.log("tagFiltered", tagFiltered)

  // 검색 필터링
  const options = {
    includeScore: true,
    threshold: 0.5,
    keys: ["name", "dynamic.text_block"] // Define searchable fields
  }

  const fuse = new Fuse(tagFiltered, options)

  let searchFiltered;

  if (search === null) {
    searchFiltered = tagFiltered;
  } else {
    searchFiltered = fuse.search(search).map(result => result.item);
  }

  // console.log("searchFiltered", searchFiltered)

  return searchFiltered;
}

export function bookmarkFilter(data: PostProps[], bookmark: string | null, user: UserDataProps) {
  let bookmarkFiltered;

  if (user) {
    const categories = ["clubs", "events", "exhibitions", "notices", "kookmins"];

    const allPostIds = categories.flatMap(
      (category) => ((user as unknown as Record<string, PostProps[]>)[category] || [])
        .map((post) => post.documentId)
    );

    if (bookmark === 'true') {
      bookmarkFiltered = data.filter((entry) => {
        return bookmark && allPostIds.includes(entry.documentId);
      })
    } else {
      bookmarkFiltered = data;
    }
  } else {
    bookmarkFiltered = data;
  }

  // console.log("bookmarkFiltered", bookmarkFiltered)
  return bookmarkFiltered;
}