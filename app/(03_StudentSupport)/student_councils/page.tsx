import { Metadata } from 'next';
import { fetchCMSData } from '@/app/lib/fetchCMSData';
import { PostProps } from '@/app/lib/definitions';
import MdText from '@/app/ui/cms/md-text';

export const metadata: Metadata = {
    title: '학생회',
};

export default async function Page() {
    const data = await fetchCMSData<PostProps>('student-councils') as PostProps[];

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className="text-2xl pb-8">학생회</h1>
            {data.map((post: PostProps) => (
                <div key={post.id} className="rounded-lg bg-gray-100 p-8 mb-4">
                    <p>name: {post.name}</p>
                    <p>semester: {post.semester}</p>
                    <MdText markdown={post.text ?? " "} />
                </div>
            ))}
        </div>
    );
}