import { Metadata } from 'next';
import { fetchCMSData } from '@/app/components/cms/fetchCMSData';
import { PostProps } from '@/app/types';
import Website from '@/app/components/ui/website';
import Event from '@/app/components/ui/event';
import MdText from '@/app/components/ui/md-text';

export const metadata: Metadata = {
    title: '공지',
};

export default async function Page() {
    const data = await fetchCMSData<PostProps>('notices?populate[content]=true&populate[website]=true&populate[Event][populate][tags]=true&populate[Event][populate][poster]=true') as PostProps[];

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className="text-2xl pb-8">공지</h1>
            <p>뉴스, 채용공고, 학과공지 등 페이지로 나눠야 하나 태그로 구분해도 되나</p>
            {data.map((post: PostProps) => (
                <div key={post.id} className="rounded-lg bg-gray-100 p-8 mb-4">
                    <p>name: {post.name}</p>
                    <p>author: {post.author}</p>
                    {post.Event && post.Event.length > 0 && (
                        <div className='rounded-lg bg-gray-200 p-4'>
                            {post.Event?.map((event) => (
                                <Event key={event.id} event={event} />
                            ))}
                        </div>
                    )}
                    <div>content:
                        <MdText markdown={post.content || " "} />
                    </div>
                    {post.website && post.website?.length > 0 && (
                        <div>website:
                            {post.website?.map((website) => (
                                <Website key={website.id} website={website} />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}