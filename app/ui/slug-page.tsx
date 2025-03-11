import Website from "./cms/website";
import { ImageMedia } from "./cms/media";
import MdText from "./cms/md-text";
import BookmarkButton from "./bookmark-button";
import { PostProps, UserDataProps } from "../lib/definitions";

export default async function SlugPage({slug, token, user, posts} : {slug: string; token?: string; user: UserDataProps; posts: PostProps[]}) {
  
  if (!slug) {
    return <div className="w-full">Invalid URL</div>;
  }

  const post = posts?.find((p) => p.documentId === slug);

  // console.log(post)

  if (!post) {
    return <div className="w-full">Post not found</div>;
  }

  return (
    <div className="p-4 h-full overflow-y-auto overflow-x-hidden">
      <div className="relative h-0 left-[calc(100%-1.5rem)]">
        {post.documentId && token && user && post.category && <BookmarkButton postId={post.documentId} token={token} user={user} category={post.category} />}
      </div>
      <p>제목: {post.name}</p>
      <p>작성자: {post.author}</p>
      <p>작성일: {post.publishedAt?.slice(0,10)}</p>
      <p>카테고리: {post.category}</p>
      {post.startDate && <p>기간: {post.startDate}{post.endDate && `-${post.endDate}`}</p>}
      {post.location && <p>장소: {post.location}</p>}
      {post.tags && <div className="flex gap-2">태그: {post.tags.map(tag => (<div key={tag.documentId} className="bg-gray-200 text-gray-900 px-2 text-sm py-1 rounded-lg">{tag.name}</div>))}</div>}
      {post.website &&
        <div>웹사이트: {post.website?.map(website => (
          <Website key={website.id} website={website} />
        ))}
        </div>
      }
      {post.dynamic &&
        <div>내용: {post.dynamic?.map((item, index) => (
          <div key={`${item.id}-${index}`}>
            <div className="flex items-start w-full overflow-x-auto">
              {item.image_block && item.image_block.map((img, index) => (
                <ImageMedia key={`${img.id}-${index}`} media={img} size="medium" />
              ))}
            </div>
            {item.text_block && <MdText markdown={item.text_block} />}
          </div>
        ))}
        </div>
      }
    </div>
  );
}