import { Metadata } from 'next';
import { getCmsData } from '@/app/lib/get-cms-data';
import { PostProps } from '@/app/lib/definitions';
import CalendarEntry from '@/app/ui/calendar-entry';
import { getAuthToken } from '@/app/lib/services/get-token';
import { getUserMe } from '@/app/lib/services/get-user-me';

export const metadata: Metadata = {
    title: '이벤트',
};

export default async function Page() {
    const data = await getCmsData<PostProps>('events?populate[calendars][populate][0]=tags&populate[website]=true&populate[poster]=true') as PostProps[];

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    const token = await getAuthToken();
    const user = await getUserMe(true);

    return (
        <>
            <h1 className='pb-8'>이벤트</h1>
            {data.map((post: PostProps) => (
                <div key={post.id} >
                    {post.calendars?.map((calendar) => (
                        <CalendarEntry
                            key={calendar.id}
                            data={calendar}
                            token={token ?? undefined}
                            user={user?.data}
                            href={`/events/${post.documentId}`}
                        />
                    ))}
                </div>
            ))}
        </>
    );
}