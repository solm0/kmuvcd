import { Metadata } from 'next';
import { fetchCMSData } from '@/app/components/cms/fetchCMSData';
import { PostProps } from '@/app/types';

export const metadata: Metadata = {
    title: '교수진',
};

export default async function Page() {
    const data = await fetchCMSData<PostProps>('professors?populate=photo') as PostProps[];

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
                    <div>photo:
                        {post.photo ?
                            <img
                                key={post.photo?.id}
                                src={post.photo?.formats?.thumbnail?.url}
                                alt={post.photo?.alternativeText || 'Image'}
                                className="mt-4"
                            />
                            : ' null'
                        }
                    </div>
                </div>
            ))}
        </div>
    );
}