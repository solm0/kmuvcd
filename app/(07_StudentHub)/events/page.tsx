import { Metadata } from 'next';
import { fetchCMSData } from '@/app/components/cms/fetchCMSData';
import { PostProps } from '@/app/types';
import Event from '@/app/components/ui/event';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '이벤트',
};

export default async function Page() {
    const data = await fetchCMSData<PostProps>('events?populate[Event][populate][tags]=true&populate[Event][populate][poster]=true&populate[website]=true') as PostProps[];

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <>
            <h1 className='text-2xl pb-8'>이벤트</h1>
            {data.map((post: PostProps) => (
                <Link key={post.id} href={`https://kmuvcd.vercel.app/events/${post.documentId}`}>
                    <div key={post.id} className='rounded-lg bg-gray-100 p-8 mb-4 hover:bg-gray-200'>
                        <p>name: {post.name}</p>
                        <div className='rounded-lg bg-gray-200 p-4'>
                            {post.Event?.map((event) => (
                                <Event key={event.id} event={event} />
                            ))}
                        </div>
                    </div>
                </Link>
            ))}
        </>
    );
}