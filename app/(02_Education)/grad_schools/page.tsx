import { Metadata } from 'next';
import { fetchCMSData } from '@/app/lib/fetchCMSData';
import { PostProps } from '@/app/lib/definitions';
import Website from '@/app/ui/cms/website';
import MdText from '@/app/ui/cms/md-text';

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