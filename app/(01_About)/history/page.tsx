import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '역사',
};

export default async function Page() {
    return (
        <h1 className='pb-8'>시각디자인학과의 역사</h1>
    );
}