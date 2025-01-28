import { Metadata } from 'next';
import { fetchData } from '@/app/lib/fetchData';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import React from 'react';

export const metadata: Metadata = {
    title: '전시',
};

interface Media {
    id: number;
    formats: {
        large: { url: string };
        thumbnail?: { url: string };
    };
    alternativeText?: string;
}

interface MediaAndText {
    id: number;
    upper_text?: string;
    lower_text?: string;
    media?: Media[];
}

interface Post {
    id: number;
    name: string;
    media_and_text?: MediaAndText[];
}

export default async function Page() {
    const data = await fetchData<Post>('exhibitions?populate=media_and_text.media');

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className='text-2xl pb-8'>전시</h1>
            {data.map((post: Post) => (
                <div key={post.id} className='rounded-lg bg-gray-100 p-8'>
                    <p>name: {post.name}</p>
                    <div>
                        {post.media_and_text?.map((item) => (
                            <div key={item.id}>
                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                    {item.upper_text || ''}
                                </ReactMarkdown>
                                {item.media?.map((mediaItem) => (
                                    <img
                                        key={mediaItem.id}
                                        src={mediaItem.formats.large.url}
                                        alt={mediaItem.alternativeText || 'Image'}
                                        className="mt-4"
                                    />
                                ))}
                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                    {item.lower_text || ''}
                                </ReactMarkdown>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}