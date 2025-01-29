import { Metadata } from 'next';
import { fetchCMSData } from '@/app/components/cms/fetchCMSData';
import { PostProps } from '@/app/types';

export const metadata: Metadata = {
    title: '대학원',
};

export default async function Page() {
    const data = await fetchCMSData<PostProps>('graduate-schools?populate=website') as PostProps[];

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className="text-2xl pb-8">대학원</h1>
            {data.map((post: PostProps) => (
                <div key={post.id} className="rounded-lg bg-gray-100 p-8 mb-4">
                    <p>name: {post.name}</p>
                    <p>description: {post.description}</p>
                    <p>content: {post.content}</p>
                    <div>website:
                        {post.website?.map((website) => (
                            <a
                                key={website.id}
                                href={website.url}
                                target='_blank'
                                rel='noopener noreferrer'
                                className="text-blue-600 underline"
                            >
                                {website.name}
                            </a>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}