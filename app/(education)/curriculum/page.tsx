import { Metadata } from 'next';
import { fetchSgData } from '@/app/lib/fetchSgData';

export const metadata: Metadata = {
    title: '교육과정',
};

interface Post {
    id?: number;
    name?: string;
    content?: string;
}

export default async function Page() {
    const data = await fetchSgData<Post>('curriculum');

    if (!data) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className='text-2xl pb-8'>교육과정</h1>
                <div key={data.id} className='rounded-lg bg-gray-100 p-8'>
                    <p>name:{data.name}</p>
                    <p>content:{data.content}</p>
                </div>
        </div>
    );
}