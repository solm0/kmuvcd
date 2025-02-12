import { Metadata } from 'next';
import { fetchCMSData } from '@/app/lib/fetchCMSData';
import { PostProps } from '@/app/lib/definitions';
import MdText from '@/app/ui/cms/md-text';

export const metadata: Metadata = {
    title: '복/부전공',
};

export default async function Page() {
    const data = await fetchCMSData<PostProps>('double-major-and-minor') as PostProps;

    if (!data) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className='text-2xl pb-8'>복/부전공</h1>
                <div key={data.id} className='rounded-lg bg-gray-100 p-8'>
                    <p>name:{data.name}</p>
                    <MdText markdown={data.text ?? " "} />
                </div>
        </div>
    );
}