import { Metadata } from 'next';
import { fetchData } from '@/app/lib/fetchData';

export const metadata: Metadata = {
    title: '학생회',
};

interface Post {
    id?: number;
    name?: string;
    semester?: number;
    description?: string;
}

export default async function Page() {
    const data = await fetchData<Post>('student-councils');

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className="text-2xl pb-8">교직원</h1>
            {data.map((post: Post) => (
                <div key={post.id} className="rounded-lg bg-gray-100 p-8 mb-4">
                    <p>name: {post.name}</p>
                    <p>semester: {post.semester}</p>
                    <p>description: {post.description}</p>
                </div>
            ))}
        </div>
    );
}