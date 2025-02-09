import { Metadata } from 'next';
import { fetchCMSData } from '@/app/components/cms/fetchCMSData';
import { PostProps } from '@/app/types';
import Calendar from '@/app/components/ui/calendar-entry';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '이벤트',
};

export default async function Page() {
    const data = await fetchCMSData<PostProps>('events?populate[calendars][populate][0]=tags&populate[website]=true&populate[poster]=true') as PostProps[];

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <>
            <h1 className='text-2xl pb-8'>이벤트</h1>
            {data.map((post: PostProps) => (
                <Link key={post.id} href={`https://kmuvcd.vercel.app/events/${post.documentId}`}>
                    <div className='rounded-lg bg-gray-100 p-4 hover:bg-gray-200'>
                        {post.calendars?.map((calendar) => (
                            <Calendar key={calendar.id} calendar={calendar} />
                        ))}
                    </div>
                </Link>
            ))}
        </>
    );
}