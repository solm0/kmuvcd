import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '국제교류',
};

export default async function Page() {
    return (
        <h1 className='text-2xl pb-8'>국제교류</h1>
    );
}