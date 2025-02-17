import { Metadata } from 'next';
import { getCmsData } from '@/app/lib/get-cms-data';
import { PostProps } from '@/app/lib/definitions';
import { ImageMedia } from '@/app/ui/cms/media';
import MdText from '@/app/ui/cms/md-text';

export const metadata: Metadata = {
    title: '시설 소개',
};

export default async function Page() {
    const data = await getCmsData<PostProps>('facility-overviews?populate=thumbnail&populate=photo') as PostProps[];

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
                    <p>room_number: {post.room_number}</p>
                    <MdText markdown={post.text ?? " "} />
                    <div>photo:
                        {post.photo?.map((photo) => (
                            <ImageMedia key={photo.id} media={photo} size='medium' />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}