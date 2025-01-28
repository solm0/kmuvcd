import { Metadata } from 'next';
import { fetchCMSData } from '@/app/components/cms/fetchCMSData';
import ReactMarkdown from 'react-markdown';

export const metadata: Metadata = {
    title: '학과 소개',
};

interface Post {
    id?: number;
    title?: string;
    content?: string;
}

export default async function Page() {
    const data = await fetchCMSData<Post>('department-introduction') as Post;

    if (!data) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className='text-2xl pb-8'>학과 소개</h1>
                <div key={data.id} className='rounded-lg bg-gray-100 p-8'>
                    <p>title:{data.title}</p>
                    <div>content:
                        <ReactMarkdown className="prose">
                            {data.content}
                        </ReactMarkdown>
                    </div>
                </div>
        </div>
    );
}