import { Metadata } from 'next';
import { fetchCMSData } from '@/app/components/cms/fetchCMSData';

export const metadata: Metadata = {
    title: '교직원',
};

interface Post {
    id?: number;
    name?: string;
    description?: string;
    location?: string;
    phone?: string;
    email?: string;
}

export default async function Page() {
    const data = await fetchCMSData<Post>('staffs') as Post[];

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className="text-2xl pb-8">교직원</h1>
            {data.map((post: Post) => (
                <div key={post.id} className="rounded-lg bg-gray-100 p-8 mb-4">
                    <p>name: {post.name}</p>
                    <p>description: {post.description}</p>
                    <p>location: {post.location}</p>
                    <p>phone: {post.phone}</p>
                    <p>email: {post.email}</p>
                </div>
            ))}
        </div>
    );
}