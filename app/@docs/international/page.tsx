import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '국제교류',
};

export default async function Page() {
    return (
        <h1 className='pb-8'>국제교류</h1>
    );
}