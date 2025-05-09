import Website from "../cms/website";
import { ImageMedia } from "../cms/media";
import MdText from "../cms/md-text";
import BookmarkButton from "./bookmark-button";
import { PostProps, UserDataProps } from "../../lib/types";
import SlugPageTags from "./slug-page-tags";

export default async function SlugPage({slug, token, user, posts} : {slug: string; token?: string; user?: UserDataProps; posts: PostProps[]}) {
  
  if (!slug) {
    return <div className="w-full">Invalid URL</div>;
  }

  const post = posts?.find((p) => p.documentId === slug);

  if (!post) {
    return <div className="w-full">Post not found</div>;
  }

  return (
    <div className="p-4 h-full overflow-y-auto overflow-x-hidden">
      <div className="absolute right-0 top-4">
        {post.documentId && token && user && post.category &&
          <BookmarkButton
            postId={post.documentId}
            token={token}
            user={user}
            category={post.category}
          />
        }
      </div>
      {post.name && <p className="w-4/5">{post.name}</p>}
      
      <div className="text-sm/6 py-4">
        {post.tags &&
          <div className="flex gap-2 mb-2">
            {post.category && post.tags.map(tag => (
              <SlugPageTags key={tag.documentId} tag={tag} category={post.category} />
            ))}
          </div>
        }
        {post.author && <p>작성자: {post.author}</p>}
        {post.publishedAt && <p>작성일: {post.publishedAt?.slice(0,10)}</p>}
        {post.startDate && <p>기간: {post.startDate}{post.endDate && `-${post.endDate}`}</p>}
        {post.location && <p>장소: {post.location}</p>}
        {post.website && (post.website?.length !== 0) &&
          <div className="flex gap-2">
            링크
            {post.website?.map(website => (
              <Website key={website.id} website={website} />
            ))}
          </div>
        }
      </div>

      {post.dynamic &&
        <div>{post.dynamic?.map((item, index) => (
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