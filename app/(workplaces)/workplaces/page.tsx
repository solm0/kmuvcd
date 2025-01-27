import { Metadata } from 'next';
import { fetchData } from '@/app/lib/fetchData';
import ReactMarkdown from 'react-markdown';

export const metadata: Metadata = {
    title: '공간',
};

interface Post {
    id?: number;
    name?: string;
    content?: string;
}

export default async function Page() {
    const data = await fetchData<Post>('facilities');

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className="text-2xl pb-8">공간</h1>
            {data.map((post: Post) => (
                <div key={post.id} className="rounded-lg bg-gray-100 p-8 mb-4">
                    <p>title: {post.name}</p>
                    <div>content:
                        <ReactMarkdown>
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </div>
            ))}
        </div>
    );
}