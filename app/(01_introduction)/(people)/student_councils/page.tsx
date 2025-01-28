import { Metadata } from 'next';
import { fetchCMSData } from '@/app/components/cms/fetchCMSData';

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
    const data = await fetchCMSData<Post>('student-councils') as Post[];

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className="text-2xl pb-8">학생회</h1>
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