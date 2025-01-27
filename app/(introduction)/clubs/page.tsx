import { Metadata } from 'next';
import { fetchData } from '@/app/lib/fetchData';

export const metadata: Metadata = {
    title: '동아리',
};

interface Post {
    id?: number;
    name?: string;
    description?: string;
    content?: string;
}

export default async function Page() {
    const data = await fetchData<Post>('club-overviews');

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className='text-2xl pb-8'>동아리 소개</h1>
            <p>로그인 후 클릭해 상세 페이지로 이동 가능</p>
            {data.map((post: Post) => (
                <div key={post.id} className='rounded-lg bg-gray-100 p-8'>
                    <p>name:{post.name}</p>
                    <p>description: {post.description}</p>
                    <p>content:{post.content}</p>
                </div>
            ))}
        </div>
    );
}