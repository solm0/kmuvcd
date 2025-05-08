import { getCmsData } from "./get-cms-data";
import { PostProps } from "../types";

export async function getBoardPosts() {
  const [notices, events, exhibitions, clubs, kookmins] = await Promise.all([
    getCmsData('notices?populate[website]=true&populate[dynamic][on][dynamic.image-block][populate]=*&populate[dynamic][on][dynamic.text-block][populate]=*&populate[users]=true&populate[tags]=true'),
    getCmsData('events?populate[website]=true&populate[dynamic][on][dynamic.image-block][populate]=*&populate[dynamic][on][dynamic.text-block][populate]=*&populate[users]=true&populate[tags]=true'),
    getCmsData('exhibitions?populate[website]=true&populate[dynamic][on][dynamic.image-block][populate]=*&populate[dynamic][on][dynamic.text-block][populate]=*&populate[users]=true&populate[tags]=true'),
    getCmsData('clubs?populate[website]=true&populate[dynamic][on][dynamic.image-block][populate]=*&populate[dynamic][on][dynamic.text-block][populate]=*&populate[users]=true&populate[tags]=true'),
    getCmsData('kookmins?populate[users]=true&populate[tags]=true&pagination[pageSize]=300'),
  ]);
  
  const posts = [...(notices as PostProps[]), ...(events as PostProps[]), ...(exhibitions as PostProps[]), ...(clubs as PostProps[]), ...(kookmins as PostProps[])];

  // console.log("Fetched posts:", posts[0]);
  
  return posts.length > 0 ? posts : [];
}
