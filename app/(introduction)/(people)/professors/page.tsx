import { Metadata } from 'next';
import { fetchData } from '@/app/lib/fetchData';

export const metadata: Metadata = {
    title: '교수진',
};

interface Post {
    id?: number;
    name?: string;
    title?: string;
    education?: string;
    location?: string;
    phone?: string;
    email?: string;
    position?: string;
    photo?: {
        formats?:{
            thumbnail?: {url:string},
        },
        id?:number,
        alternativeText?: string,
    }
}

export default async function Page() {
    const data = await fetchData<Post>('professors?populate=photo');

    if (!data || data.length === 0) {
        return <p>No data available or failed to load.</p>;
    }

    return (
        <div>
            <h1 className='text-2xl pb-8'>교수진</h1>
            {data.map((post: Post) => (
                <div key={post.id} className='rounded-lg bg-gray-100 p-8 mb-4'>
                    <p>name: {post.name}</p>
                    <p>title: {post.title}</p>
                    <p>education: {post.education}</p>
                    <p>location: {post.location}</p>
                    <p>phone: {post.phone}</p>
                    <p>email: {post.email}</p>
                    <p>position: {post.position}</p>
                    <div>photo:
                        {post.photo ?
                            <img
                                key={post.photo?.id}
                                src={post.photo?.formats?.thumbnail?.url}
                                alt={post.photo?.alternativeText || 'Image'}
                                className="mt-4"
                            />
                            : ' null'
                        }
                    </div>
                </div>
            ))}
        </div>
    );
}