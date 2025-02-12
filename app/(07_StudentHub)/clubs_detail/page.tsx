import { Metadata } from 'next';
import { fetchCMSData } from '@/app/lib/fetchCMSData';
import { PostProps } from '@/app/lib/definitions';
import Website from '@/app/ui/cms/website';
import MdText from '@/app/ui/cms/md-text';
import { ImageMedia } from '@/app/ui/cms/media';

export const metadata: Metadata = {
    title: '동아리 소개',
};

export default async function Page() {
    const data = await fetchCMSData<PostProps>('club-overviews?populate=website&populate=thumbnail') as PostProps[];

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className='text-2xl pb-8'>동아리 소개</h1>
            <p>&apos;로그인 후 더보기&apos; 버튼, 로그인/회원가입 페이지로 리다이렉트</p>
            {data.map((post: PostProps) => (
                <div key={post.id} className='rounded-lg bg-gray-100 p-8 mb-4'>
                    <p>name:{post.name}</p>
                    {post.thumbnail && (
                        <ImageMedia media={post.thumbnail} />
                    )}
                    <MdText markdown={post.text ?? " "} />
                    {post.website && post.website?.length > 0 && (
                        <div>website:
                            {post.website?.map((website) => (
                                <Website key={website.id} website={website} />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}