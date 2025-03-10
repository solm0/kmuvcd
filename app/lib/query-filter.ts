import { PostProps } from "./definitions";

export default function queryFilter(
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
  let searchFiltered;

  if (search === null) {
    searchFiltered = tagFiltered;
  } else {
    searchFiltered = tagFiltered.filter((entry) => {
      return search && entry.name?.includes(search) || entry.dynamic?.some(item => item.text_block?.includes(search));
    })
  }

  return searchFiltered;
}