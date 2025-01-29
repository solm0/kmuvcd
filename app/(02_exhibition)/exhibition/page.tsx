import { Metadata } from 'next';
import { fetchCMSData } from '@/app/components/cms/fetchCMSData';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import React from 'react';
import { PostProps } from '@/app/types';

export const metadata: Metadata = {
    title: '전시',
};

export default async function Page() {
    const data = await fetchCMSData<PostProps>('exhibitions?populate=media_and_text.media') as PostProps[];

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className='text-2xl pb-8'>전시</h1>
            <p>과제전/동아리/조형전/개인전 등 태그 부여 후 필터링 기능 제공</p>
            {data.map((post: PostProps) => (
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
                                        src={mediaItem.formats?.large?.url}
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