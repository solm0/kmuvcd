import { getBoardPosts } from "../lib/get-board-posts";
import Website from "./cms/website";
import { ImageMedia } from "./cms/media";
import MdText from "./cms/md-text";
import CalendarEntry from "./calendar-entry";
import { getAuthToken } from "../lib/services/get-token";
import { getUserMe } from "../lib/services/get-user-me";

const posts = await getBoardPosts();

export async function generateStaticParams() {
  console.log("Generated Static Params:", posts);

  if (!posts) {
    console.error('No posts found');
    return [];
  }

  return posts.map((post) => ({
    slug: post.documentId,
  }));
}

export default async function SlugPage({slug} : {slug: string}) {
  
  if (!slug) {
    return <div className="w-full">Invalid URL</div>;
  }

  const token = await getAuthToken();
  const user = await getUserMe(true);

  const post = posts?.find((p) => p.documentId === slug);

  if (!post) {
    return <div className="w-full">Post not found</div>;
  }

  return (
    <div className="w-96 p-4">
      <p>name: {post.name}</p>
      <p>documentId: {post.documentId}</p>
      <p>author: {post.author}</p>
      <p>category: {post.category}</p>
      {post.calendars &&
        <div>calendars:
          <CalendarEntry
            data={post.calendars}
            token={token ?? undefined}
            user={user?.data}
          />
        </div>
      }
      {post.website && 
        <div>website: {post.website?.map((website) => (
          <Website key={website.id} website={website} />
        ))}
        </div>
      }
      {post.dynamic &&
        <div>dynamic: {post.dynamic?.map((item, index) => (
          <div key={index}>
            <div className="flex items-start w-full overflow-y-auto">
              {item.image_block && item.image_block.map((img) => (
                <ImageMedia key={img.id} media={img} size="medium" />
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