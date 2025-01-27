import { Metadata } from 'next';
import { fetchData } from '@/app/lib/fetchData';

export const metadata: Metadata = {
    title: '대학원',
};

interface Post {
    id?: number;
    name?: string;
    description?: {children?: { text?: string}[] }[];
    content?: string;
    website?: string;
}

export default async function Page() {
    const data = await fetchData<Post>('graduate-schools');

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className="text-2xl pb-8">대학원</h1>
            {data.map((post: Post) => (
                <div key={post.id} className="rounded-lg bg-gray-100 p-8 mb-4">
                    <p>name: {post.name}</p>
                    <div>description: 
                        {post.description?.map((block, idx) => (
                            <p key={idx}>{block.children?.map((child, idx) => (
                                <span key={idx}>{child.text}</span>
                            ))}</p>
                        ))}
                    </div>
                    <p>content: {post.content}</p>
                    <p>website: <a href={post.website} target="_blank" rel="noopener noreferrer">{post.website}</a></p>
                </div>
            ))}
        </div>
    );
}