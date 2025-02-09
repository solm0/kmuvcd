
import { fetchCMSData } from '@/app/components/cms/fetchCMSData';
import { PostProps } from '@/app/types';
import Calendar from '@/app/components/ui/calendar-entry';
import { ImageMedia } from '@/app/components/ui/media';
import Website from '@/app/components/ui/website';

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
  const post = await fetchCMSData<PostProps>(`events/${slug}?populate[calendars][populate][0]=tags&populate[website]=true&populate[poster]=true`) as PostProps;

  return (
    <div>
      <h1 className='text-2xl pb-8'>{post.name}</h1>
      <div key={post.id} className='rounded-lg bg-gray-100 p-8 mb-4'>
          <div className='rounded-lg bg-gray-200 p-4'>
              {post.calendars?.map((calendar) => (
                  <Calendar key={calendar.id} calendar={calendar} />
              ))}
          </div>
          <p>text: {post.text}</p>
          {post.poster && 
              <div>poster:
                  <ImageMedia key={post.poster.id} media={post.poster} size='small' />
              </div>
          }
          <div>website:
              {post.website?.map((website) => (
                  <Website key={website.id} website={website} />
              ))}
          </div>
      </div>
    </div>
  );
}