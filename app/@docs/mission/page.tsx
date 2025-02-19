import { Metadata } from 'next';
import { getCmsData } from '@/app/lib/get-cms-data';
import { PostProps } from '@/app/lib/definitions';
import MdText from '@/app/ui/cms/md-text';

export const metadata: Metadata = {
    title: '목표',
};

export default async function Page() {
    const data = await getCmsData<PostProps>('department-introduction?') as PostProps;

    if (!data) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className='pb-8'>학과 소개</h1>
                <div key={data.id}>
                    <p>title:{data.name}</p>
                    <MdText markdown={data.text ?? " "} />
                </div>
        </div>
    );
}