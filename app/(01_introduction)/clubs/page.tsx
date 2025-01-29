import { Metadata } from 'next';
import { fetchCMSData } from '@/app/components/cms/fetchCMSData';
import { PostProps } from '@/app/types';

export const metadata: Metadata = {
    title: '동아리',
};

export default async function Page() {
    const data = await fetchCMSData<PostProps>('club-overviews') as PostProps[];

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className='text-2xl pb-8'>동아리 소개</h1>
            <p>&apos;로그인 후 더보기&apos; 버튼, 로그인/회원가입 페이지로 리다이렉트</p>
            {data.map((post: PostProps) => (
                <div key={post.id} className='rounded-lg bg-gray-100 p-8'>
                    <p>name:{post.name}</p>
                    <p>description: {post.description}</p>
                    <p>content:{post.content}</p>
                </div>
            ))}
        </div>
    );
}