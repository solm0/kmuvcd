import { Metadata } from 'next';
import { fetchCMSData } from '@/app/components/cms/fetchCMSData';
import ReactMarkdown from 'react-markdown';
import { PostProps } from '@/app/types';

export const metadata: Metadata = {
    title: '졸업요건',
};

export default async function Page() {
    const data = await fetchCMSData<PostProps>('graduation-requirement') as PostProps;

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