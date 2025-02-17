import { Metadata } from 'next';
import { getCmsData } from '@/app/lib/get-cms-data';
import { PostProps } from '@/app/lib/definitions';
import Content from '@/app/ui/cms/content';

export const metadata: Metadata = {
    title: '전시',
};

export default async function Page() {
    const data = await getCmsData<PostProps>('exhibitions?populate[content][populate]=*') as PostProps[];

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className='text-2xl pb-8'>전시</h1>
            <p>과제전/동아리/조형전/개인전 등 태그 부여 후 필터링 기능 제공</p>
            {data.map((post: PostProps) => (
                <div key={post.id} className='rounded-lg bg-gray-100 p-8'>
                    <p>name: {post.name}</p>
                    <Content content={post.content ?? []} />
                </div>
            ))}
        </div>
    );
}