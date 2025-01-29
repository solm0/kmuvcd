import { Metadata } from 'next';
import { fetchCMSData } from '@/app/components/cms/fetchCMSData';
import { PostProps } from '@/app/types';

export const metadata: Metadata = {
    title: '교육과정',
};

export default async function Page() {
    const data_1 = await fetchCMSData<PostProps>('curriculum?populate=content') as PostProps;
    const data_2 = await fetchCMSData<PostProps[]>('courses?populate=content') as PostProps[];

    if (!data_1) {
        return <p>No data available or failed to load.</p>;
    }
    if (!data_2 || data_2.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className='text-2xl pb-8'>교육과정</h1>
            <p>커리큘럼 표에 hover, click하면 교과목 상세 페이지(설명, 결과물과 강의평(로그인 유저가 직접 올리기 가능)) 나옴, 이것도 뷰를 여러개 둬서 subject, format, mandatory, grade로 필터링해볼 수 있게 할까..?</p>
            <div key={data_1.id} className='rounded-lg bg-gray-100 p-8'>
                <p>name:{data_1.name}</p>
                <p>content:{data_1.content}</p>
            </div>
            <h1 className='text-2l pb-8'>교과목</h1>
            {data_2.map((post: PostProps) => (
                <div key={post.id} className='rounded-lg bg-gray-100 p-8 mb-4'>
                    <p>name: {post.name}</p>
                    <p>credits: {post.credits}</p>
                    <p>subject: {post.subject}</p>
                    <p>format: {post.format}</p>
                    <p>mandatory: {post.mandatory}</p>
                    <p>grade: {post.grade}</p>
                </div>
            ))}
        </div>
    );
}