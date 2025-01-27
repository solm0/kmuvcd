import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '이벤트',
};

async function fetchData() {
    const res = await fetch('https://my-strapi-project-j0s0.onrender.com/api/events?populate=*', {
      cache: 'no-store', // Prevent caching during development
    });
  
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
  
    const json = await res.json();
    return json.data;
}

export default async function Page() {
    const data = await fetchData();

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

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