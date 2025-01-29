import { Metadata } from 'next';
import { fetchCMSData } from '@/app/components/cms/fetchCMSData';
import { PostProps } from '@/app/types';
import Website from '@/app/components/ui/website';

export const metadata: Metadata = {
    title: '이벤트',
};

export default async function Page() {
    const data = await fetchCMSData<PostProps>('events?populate[Event][populate][tags]=true&populate[Event][populate][poster]=true&populate=website') as PostProps[];

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className='text-2xl pb-8'>이벤트</h1>
            {data.map((post: PostProps) => (
                <div key={post.id} className='rounded-lg bg-gray-100 p-8'>
                    <p>name: {post.name}</p>
                    {post.Event?.map((event) => (
                        <div key={event.id}>
                            <p>startDate: {event?.startDate}</p>
                            <p>endDate: {event?.endDate || event?.startDate}</p>
                            <p>location: {event?.location}</p>
                            <div className="flex flex-wrap gap-2 mt-2">tags:
                                {event?.tags?.map((tag) => (
                                    <span
                                        key={tag.id}
                                        className="bg-blue-300 text-blue-900 px-2 py-1 rounded-md text-sm"
                                    >
                                        {tag.tag}
                                    </span>
                                ))}
                            </div>
                            <div>poster:
                                {event.poster?.map((poster) => (
                                    <img
                                        key={poster.id}
                                        src={poster.formats?.thumbnail?.url}
                                        alt={poster.alternativeText || 'Image'}
                                        className="mt-4"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                    <p>content: {post.content}</p>
                    <div>website:
                        {post.website?.map((website) => (
                            <Website key={website.id} website={website} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}