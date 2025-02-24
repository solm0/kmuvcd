import { PostProps } from "./definitions";

export default function queryFilter(data: PostProps[], category: string | null, tag: string | null) {

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
  return tagFiltered;
}