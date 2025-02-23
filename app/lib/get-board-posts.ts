import { getCmsData } from "./get-cms-data";
import { PostProps } from "./definitions";

export async function getBoardPosts() {
  const [notices, events, exhibitions, clubs] = await Promise.all([
    getCmsData('notices?populate[calendars][populate]=tags&populate[website]=true&populate[dynamic][on][dynamic.image-block][populate]=*&populate[dynamic][on][dynamic.text-block][populate]=*'),
    getCmsData('events?populate[calendars][populate]=tags&populate[website]=true&populate[dynamic][on][dynamic.image-block][populate]=*&populate[dynamic][on][dynamic.text-block][populate]=*'),
    getCmsData('exhibitions?populate[calendars][populate]=tags&populate[website]=true&populate[dynamic][on][dynamic.image-block][populate]=*&populate[dynamic][on][dynamic.text-block][populate]=*'),
    getCmsData('clubs?populate[calendars][populate]=tags&populate[website]=true&populate[dynamic][on][dynamic.image-block][populate]=*&populate[dynamic][on][dynamic.text-block][populate]=*'),
  ]);
  
  const posts = [...(notices as PostProps[]), ...(events as PostProps[]), ...(exhibitions as PostProps[]), ...(clubs as PostProps[])];

  // console.log("Fetched posts:", posts[0]);
  
  return posts.length > 0 ? posts : [];
}
