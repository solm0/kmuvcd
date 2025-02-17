import { fetchCMSData } from '@/app/lib/fetchCMSData';
import { PostProps } from '@/app/lib/definitions';
import CalendarEntry from '@/app/ui/calendar-entry';
import { ImageMedia } from '@/app/ui/cms/media';
import Website from '@/app/ui/cms/website';
import { getAuthToken } from '@/app/lib/services/get-token';
import { getUserMe } from '@/app/lib/services/get-user-me';

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

  const token = await getAuthToken();
  const user = await getUserMe(true);

  return (
    <div>
      <h1 className='text-2xl pb-8'>{post.name}</h1>
      <div key={post.id} className='rounded-lg bg-gray-100 p-8 mb-4'>
          <div>
              {post.calendars?.map((calendar) => (
                  <CalendarEntry
                    key={calendar.id}
                    data={calendar}
                    token={token ?? undefined}
                    user={user?.data}
                  />
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