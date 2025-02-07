
import { fetchCMSData } from '@/app/components/cms/fetchCMSData';
import { PostProps } from '@/app/types';
import Website from '@/app/components/ui/website';
import Event from '@/app/components/ui/event';
import MdText from '@/app/components/ui/md-text';

export async function generateStaticParams() {
  const posts = await fetchCMSData('events');

  if (!Array.isArray(posts)) {
    console.error('fetchCMSData did not return an array:', posts);
    return [];
  }

  return posts.map((post) => ({
    slug: post.documentId,
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  // Await the Promise before accessing `slug`
  const { slug } = await params;

  // Use the `slug` as you normally would
  const post = await fetchCMSData<PostProps>(`events/${slug}?populate[Event][populate][tags]=true&populate[Event][populate][poster]=true&populate[website]=true`) as PostProps;

  return (
    <div>
      <h1 className='text-2xl pb-8'>{post.name}</h1>
      <div className='rounded-lg bg-gray-100 p-4'>
        {post.Event?.map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </div>
      <MdText markdown={post.text ?? " "} />
      {post.website && post.website?.length > 0 && (
        <div>website:
          {post.website?.map((website) => (
            <Website key={website.id} website={website} />
          ))}
        </div>
      )}
    </div>
  );
}