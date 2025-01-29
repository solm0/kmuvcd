import { Metadata } from 'next';
import { fetchCMSData } from '@/app/components/cms/fetchCMSData';
import { PostProps } from '@/app/types';

export const metadata: Metadata = {
    title: '학과 소개',
};

export default async function Page() {
    const data = await fetchCMSData<PostProps>('department-introduction?populate=content') as PostProps;

    if (!data) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className='text-2xl pb-8'>학과 소개</h1>
                <div key={data.id} className='rounded-lg bg-gray-100 p-8'>
                    <p>title:{data.name}</p>

                </div>
        </div>
    );
}