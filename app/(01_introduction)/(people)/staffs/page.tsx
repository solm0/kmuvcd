import { Metadata } from 'next';
import { fetchCMSData } from '@/app/components/cms/fetchCMSData';
import { PostProps } from '@/app/types';
import MdText from '@/app/components/ui/md-text';

export const metadata: Metadata = {
    title: '교직원',
};

export default async function Page() {
    const data = await fetchCMSData<PostProps>('staffs') as PostProps[];

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className="text-2xl pb-8">교직원</h1>
            {data.map((post: PostProps) => (
                <div key={post.id} className="rounded-lg bg-gray-100 p-8 mb-4">
                    <p>name: {post.name}</p>
                    <p>location: {post.location}</p>
                    <p>phone: {post.phone}</p>
                    <p>email: {post.email}</p>
                    <MdText markdown={post.text ?? " "} />
                </div>
            ))}
        </div>
    );
}