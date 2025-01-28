import { Metadata } from 'next';
import { fetchSgData } from '@/app/lib/fetchSgData';
import { fetchData } from '@/app/lib/fetchData';

export const metadata: Metadata = {
    title: '교육과정',
};

interface Post {
    id?: number;
    name?: string;
    content?: string;
    
    credits?: number;
    subject?: string;
    format?: string;
    description?: string;
    mandatory?: boolean;
    grade?: number;
}

export default async function Page() {
    const data_1 = await fetchSgData<Post>('curriculum');

    if (!data_1) {
        return <p>No data available or failed to load.</p>;
    }

    const data_2 = await fetchData<Post>('courses');

    if (!data_2) {
        return <p>No data available or failed to load.</p>;
    }

    
    return (
        <div>
            <h1 className='text-2xl pb-8'>교육과정</h1>
            <div key={data_1.id} className='rounded-lg bg-gray-100 p-8'>
                <p>name:{data_1.name}</p>
                <p>content:{data_1.content}</p>
            </div>
            <h1 className='text-2l pb-8'>교과목</h1>
            {data_2.map((post: Post) => (
                <div key={post.id} className='rounded-lg bg-gray-100 p-8 mb-4'>
                    <p>name: {post.name}</p>
                    <p>credits: {post.credits}</p>
                    <p>subject: {post.subject}</p>
                    <p>format: {post.format}</p>
                    <p>description: {post.description}</p>
                    <p>mandatory: {post.mandatory}</p>
                    <p>grade: {post.grade}</p>
                </div>
            ))}
        </div>
    );
}