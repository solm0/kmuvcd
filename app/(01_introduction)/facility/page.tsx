import { Metadata } from 'next';
import { fetchCMSData } from '@/app/components/cms/fetchCMSData';

export const metadata: Metadata = {
    title: '시설 소개',
};

interface Post {
    id?: number;
    name?: string;
    room_number?: string;
    description?: string;
    content?: string;
    photo?: {
        formats?:{
            thumbnail?: {url:string},
        },
        id?:number,
        alternativeText?: string,
    }[];
}

export default async function Page() {
    const data = await fetchCMSData<Post>('facility-overviews?populate=photo') as Post[];

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className="text-2xl pb-8">시설 소개</h1>
            <p>&apos;로그인 후 신청하러 가기&apos; 버튼, 로그인/회원가입 페이지로 리다이렉트</p>
            {data.map((post: Post) => (
                <div key={post.id} className="rounded-lg bg-gray-100 p-8 mb-4">
                    <p>name: {post.name}</p>
                    <p>room_number: {post.room_number}</p>
                    <p>description: {post.description}</p>
                    <p>content: {post.content}</p>
                    <div>photo:
                        {post.photo && post.photo.length > 0 ? (
                            post.photo.map((photo) => (
                                <img
                                    key={photo.id}
                                    src={photo.formats?.thumbnail?.url}
                                    alt={photo.alternativeText || 'Image'}
                                    className="mt-4"
                                />
                            ))
                        ) : (
                            <p>No photos available</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}