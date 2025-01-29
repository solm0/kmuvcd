import { Metadata } from 'next';
import { fetchCMSData } from '@/app/components/cms/fetchCMSData';
import ReactMarkdown from 'react-markdown';
import { PostProps } from '@/app/types';
import Website from '@/app/components/ui/website';

export const metadata: Metadata = {
    title: '공지',
};

export default async function Page() {
    const data = await fetchCMSData<PostProps>('notices?populate=website') as PostProps[];

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className="text-2xl pb-8">공지</h1>
            <p>뉴스, 채용공고, 학과공지 등 페이지로 나눠야 하나 태그로 구분해도 되나</p>
            {data.map((post: PostProps) => (
                <div key={post.id} className="rounded-lg bg-gray-100 p-8 mb-4">
                    <p>name: {post.name}</p>
                    <p>author: {post.author}</p>
                    <div>content:
                        <ReactMarkdown>
                            {post.content}
                        </ReactMarkdown>
                    </div>
                    <div>website:
                        {post.website?.map((website) => (
                            <Website key={website.id} website={website} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}