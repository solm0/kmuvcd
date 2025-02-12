import { Metadata } from 'next';
import { fetchCMSData } from '@/app/lib/fetchCMSData';
import { PostProps } from '@/app/lib/definitions';
import Website from '@/app/ui/cms/website';
import { ImageMedia } from '@/app/ui/cms/media';

export const metadata: Metadata = {
    title: '교수진',
};

export default async function Page() {
    const data = await fetchCMSData<PostProps>('professors?populate=thumbnail&populate=website') as PostProps[];

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className='text-2xl pb-8'>교수진</h1>
            <p>개인 홈페이지 있을 경우 카드 형태로 함께 기재</p>
            {data.map((post: PostProps) => (
                <div key={post.id} className='rounded-lg bg-gray-100 p-8 mb-4'>
                    <p>name: {post.name}</p>
                    <p>position: {post.position}</p>
                    <p>education: {post.education}</p>
                    <p>location: {post.location}</p>
                    <p>phone: {post.phone}</p>
                    <p>email: {post.email}</p>
                    {post.website && post.website?.length > 0 && (
                        <div>website:
                            {post.website?.map((website) => (
                                <Website key={website.id} website={website} />
                            ))}
                        </div>
                    )}
                    {post.thumbnail &&
                        <div>thumbnail:
                            <ImageMedia media={post.thumbnail} size='thumbnail' />
                        </div>
                    }
                </div>
            ))}
        </div>
    );
}