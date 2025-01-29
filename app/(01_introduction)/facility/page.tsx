import { Metadata } from 'next';
import { fetchCMSData } from '@/app/components/cms/fetchCMSData';
import { PostProps } from '@/app/types';
import { ImageMedia } from '@/app/components/ui/media';

export const metadata: Metadata = {
    title: '시설 소개',
};

export default async function Page() {
    const data = await fetchCMSData<PostProps>('facility-overviews?populate=thumbnail') as PostProps[];

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className="text-2xl pb-8">시설 소개</h1>
            <p>&apos;로그인 후 신청하러 가기&apos; 버튼, 로그인/회원가입 페이지로 리다이렉트</p>
            {data.map((post: PostProps) => (
                <div key={post.id} className="rounded-lg bg-gray-100 p-8 mb-4">
                    <p>name: {post.name}</p>
                    {post.thumbnail && (
                        <div>thumbnail:
                            <ImageMedia media={post.thumbnail} size='thumbnail' />
                        </div>
                    )}
                    <p>room_number: {post.room_number}</p>
                </div>
            ))}
        </div>
    );
}