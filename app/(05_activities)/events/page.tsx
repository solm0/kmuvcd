import { Metadata } from 'next';
import { fetchCMSData } from '@/app/components/cms/fetchCMSData';
import { PostProps } from '@/app/types';
import Website from '@/app/components/ui/website';
import Event from '@/app/components/ui/event';

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
                    <div className='rounded-lg bg-gray-200 p-4'>
                        {post.Event?.map((event) => (
                            <Event key={event.id} event={event} />
                        ))}
                    </div>
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