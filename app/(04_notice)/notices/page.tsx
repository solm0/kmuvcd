import { Metadata } from 'next';
import { fetchData } from '@/app/lib/fetchData';
import ReactMarkdown from 'react-markdown';

export const metadata: Metadata = {
    title: '공지',
};

interface Post {
    id?: number;
    title?: string;
    author?: string;
    content?: string;
}

export default async function Page() {
    const data = await fetchData<Post>('notices');

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className="text-2xl pb-8">공지</h1>
            <p>뉴스, 채용공고, 학과공지 등 페이지로 나눠야 하나 태그로 구분해도 되나</p>
            {data.map((post: Post) => (
                <div key={post.id} className="rounded-lg bg-gray-100 p-8 mb-4">
                    <p>title: {post.title}</p>
                    <p>author: {post.author}</p>
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