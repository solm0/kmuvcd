import { Metadata } from 'next';
import { fetchData } from '@/app/lib/fetchData';

export const metadata: Metadata = {
    title: '이벤트',
};

interface Post {
    id?: number;
    name?: string;
    content?: string;
    link?: string;
    Event?: {
        startDate?: string;
        endDate?: string;
        location?: string;
    }[];
}

export default async function Page() {
    const data = await fetchData<Post>('events');

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className='text-2xl pb-8'>이벤트</h1>
            {data.map((post: Post) => (
                <div key={post.id} className='rounded-lg bg-gray-100 p-8'>
                    <p>name: {post.name}</p>
                    <p>startDate: {post.Event?.[0]?.startDate}</p>
                    <p>endDate: {post.Event?.[0]?.endDate || post.Event?.[0]?.startDate}</p>
                    <p>location: {post.Event?.[0]?.location}</p>
                    <p>content: {post.content}</p>
                    <p>link: {post.link}</p>
                </div>
            ))}
        </div>
    );
}