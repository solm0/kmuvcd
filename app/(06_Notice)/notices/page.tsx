import { Metadata } from 'next';
import { fetchCMSData } from '@/app/lib/fetchCMSData';
import { PostProps } from '@/app/lib/definitions';
import Website from '@/app/ui/cms/website';
import Calendar from '@/app/ui/calendar-entry';
import MdText from '@/app/ui/cms/md-text';
import { ImageMedia } from '@/app/ui/cms/media';
import { getAuthToken } from '@/app/lib/services/get-token';
import { getUserMe } from '@/app/lib/services/get-user-me';

export const metadata: Metadata = {
    title: '공지',
};

export default async function Page() {
    const data = await fetchCMSData<PostProps>('notices?populate[media]=true&populate[website]=true&populate[Event][populate][tags]=true&populate[Event][populate][poster]=true') as PostProps[];

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    const token = await getAuthToken();
    const user = await getUserMe(true);

    return (
        <div>
            <h1 className="text-2xl pb-8">공지</h1>
            <p>뉴스, 채용공고, 학과공지 등 페이지로 나눠야 하나 태그로 구분해도 되나</p>
            {data.map((post: PostProps) => (
                <div key={post.id} className="rounded-lg bg-gray-100 p-8 mb-4">
                    <p>name: {post.name}</p>
                    <p>author: {post.author}</p>
                    {post.calendars && post.calendars?.length > 0 && (
                        <div className='rounded-lg bg-gray-200 p-4'>
                            {post.calendars?.map((calendar) => (
                                 <Calendar
                                    key={calendar.id}
                                    calendar={calendar}
                                    token={token ?? undefined}
                                    user={user?.data}
                                />
                            ))}
                        </div>
                    )}
                    <div>media:
                        {post.media?.map((media) => (
                            <ImageMedia key={media.id} media={media} size='medium' />
                        ))}
                    </div>
                    <MdText markdown={post.text ?? " "} />
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