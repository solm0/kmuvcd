import { PostProps, UserDataProps } from "./definitions";

export default function bookmarkFilter(data: PostProps[], bookmark: string | null, user: UserDataProps) {
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
  }

  // console.log("bookmarkFiltered", bookmarkFiltered)
  return bookmarkFiltered;
}