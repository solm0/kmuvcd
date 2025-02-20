import { Metadata } from 'next';
import { getCmsData } from '@/app/lib/get-cms-data';
import { PostProps } from '@/app/lib/definitions';
import MdText from '@/app/ui/cms/md-text';

export const metadata: Metadata = {
    title: '학부 커리큘럼',
};

export default async function Page() {
    const data_1 = await getCmsData<PostProps>('curriculum') as PostProps;
    const data_2 = await getCmsData<PostProps[]>('courses?pagination[pageSize]=50') as PostProps[];

    if (!data_1) {
        return <p>No data available or failed to load.</p>;
    }
    if (!data_2 || data_2.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className='pb-8'>학부 커리큘럼</h1>
            <p>커리큘럼 표에 hover, click하면 교과목 상세 페이지(설명, 결과물과 강의평(로그인 유저가 직접 올리기 가능)) 나옴, 이것도 뷰를 두개(표 모드, 리스트 모드) 둬서 리스트 모드에서는 subject, format, mandatory, grade로 필터링해볼 수 있게 할까..?</p>
            <div key={data_1.id} className='rounded-lg bg-gray-100 p-8'>
                <p>name:{data_1.name}</p>
                <MdText markdown={data_1.text ?? " "} />
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
                    <MdText markdown={post.text ?? " "} />
                </div>
            ))}
        </div>
    );
}