import { Metadata } from 'next';
import { fetchSgData } from '@/app/lib/fetchSgData';

export const metadata: Metadata = {
    title: '복/부전공',
};

interface Post {
    id?: number;
    name?: string;
    content?: string;
}

export default async function Page() {
    const data = await fetchSgData<Post>('double-major-and-minor');

    if (!data) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className='text-2xl pb-8'>복/부전공</h1>
                <div key={data.id} className='rounded-lg bg-gray-100 p-8'>
                    <p>name:{data.name}</p>
                    <p>content:{data.content}</p>
                </div>
        </div>
    );
}