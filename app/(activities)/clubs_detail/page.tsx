import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '동아리',
};

async function fetchData() {
    const res = await fetch('https://my-strapi-project-j0s0.onrender.com/api/clubs', {
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
    }

    return (
        <div>
            <h1 className='text-2xl pb-8'>동아리</h1>
            {data.map((post: Post) => (
                <div key={post.id} className='rounded-lg bg-gray-100 p-8'>
                    <p>name:{post.name}</p>
                    <p>content:{post.content}</p>
                </div>
            ))}
        </div>
    );
}