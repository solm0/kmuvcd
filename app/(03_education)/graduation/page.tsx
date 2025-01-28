import { Metadata } from 'next';
import { fetchCMSData } from '@/app/components/cms/fetchCMSData';
import ReactMarkdown from 'react-markdown';

export const metadata: Metadata = {
    title: '졸업요건',
};

interface Post {
    id?: number;
    name?: string;
    content?: string;
}

export default async function Page() {
    const data = await fetchCMSData<Post>('graduation-requirement') as Post;

    if (!data) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className='text-2xl pb-8'>졸업요건</h1>
                <div key={data.id} className='rounded-lg bg-gray-100 p-8'>
                    <p>name:{data.name}</p>
                    <div>content:
                        <ReactMarkdown className="prose">
                            {data.content}
                        </ReactMarkdown>
                    </div>
                </div>
        </div>
    );
}