import { getCmsData } from '@/app/lib/api/get-cms-data';
import { PostProps } from '@/app/lib/types';
import MdText from '@/app/ui/cms/md-text';
import Website from '@/app/ui/cms/website';
import CopyURLButton from './copy-url-button';
import ProfessorTable from './professor-table';
import CourseTable from './course-table';
import Map from './map';

const Head = ({id, text}: {id: string, text: string}) => {
    return (
        <h2 className='text-xl font-bold py-4 mb-4 flex items-center gap-2 pl-4' id={id}>
            {text}
            <CopyURLButton url={id} />
        </h2>
    );
};

const Body = ({children}: {children: React.ReactNode}) => {
    return (
        <div className='pl-4 pb-4'>
            {children}
        </div>
    )
}

export default async function DocPage() {
  const data0101 = await getCmsData<PostProps>('department-introduction?') as PostProps;
  const data0201 = await getCmsData<PostProps>('professors?populate=thumbnail&populate=website') as PostProps[];
  const data0202 = await getCmsData<PostProps>('curriculum') as PostProps;
  const data0203 = await getCmsData<PostProps>('courses?pagination[pageSize]=50') as PostProps[];
  const data0204 = await getCmsData<PostProps>('graduate-schools?populate=website') as PostProps[];
  // const data0205 = await getCmsData<PostProps[]>('') as PostProps[];
  const data0301 = await getCmsData<PostProps>('student-councils') as PostProps[];
  const data0302 = await getCmsData<PostProps>('staffs') as PostProps[];
//   const data0303 = await getCmsData<PostProps>('facility-overviews?populate=thumbnail&populate=photo') as PostProps[];
  const data0401 = await getCmsData<PostProps>('graduation-requirement') as PostProps;
  const data0402 = await getCmsData<PostProps>('double-major-and-minor') as PostProps;

    return (
        <div className='w-full break-keep'>
            <Head id='mission' text='학과 소개' />
            <Body>
                <MdText markdown={data0101.text ?? " "} />
            </Body>
            <hr className='border-bottom border-slate-500' />

            <Head id='professors' text='교수진' />
            <Body>
                <ProfessorTable data={data0201} />
            </Body>
            <hr className='border-bottom border-slate-500' />

            <Head id='curriculum' text='커리큘럼' />
            <Body>
                <MdText markdown={data0202.text ?? " "} />
                <CourseTable data={data0203} />
            </Body>
            <hr className='border-bottom border-slate-500' />

            <Head id='grad_schools' text='대학원' />
            <Body>
                <div className='flex flex-col gap-2 md:flex-row w-full'>
                    {data0204.map((post: PostProps) => (
                        <div key={post.documentId} className="w-full md:w-1/3">
                            <p>{post.name}</p>
                            <MdText markdown={post.text ?? " "} />
                            {post.website && post.website?.length > 0 && (
                                <div>
                                    {post.website?.map((website) => (
                                        <Website key={website.id} website={website} />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Body>
            <hr className='border-bottom border-slate-500' />

            <Head id='international' text='국제교류' />
            <Body>
                <MdText markdown='국제교류 정보.' />
            </Body>
            <hr className='border-bottom border-slate-500' />

            <Head id='student_councils' text='학생회'/>
            <Body>
                {data0301.map((post: PostProps) => (
                    <div key={post.documentId}>
                        <p className='font-bold'>{post.name} {post.semester}</p>
                        <MdText markdown={post.text ?? " "} />
                    </div>
                ))}
                <button className='bg-gray-100 px-2 py-1 hover:shadow-lg'>이전 학기 보기</button>
            </Body>
            <hr className='border-bottom border-slate-500' />

            <Head id='staffs' text='교직원' />
            <Body>
                {data0302.map((post: PostProps) => (
                    <div key={post.documentId} className="bg-gray-100 p-8 mb-4">
                        <p>name: {post.name}</p>
                        <p>location: {post.location}</p>
                        <p>phone: {post.phone}</p>
                        <p>email: {post.email}</p>
                        <MdText markdown={post.text ?? " "} />
                    </div>
                ))}
            </Body>
            <hr className='border-bottom border-slate-500' />

            <Head id='facility' text='시설' />
            <Body>
                <Map />
            </Body>
            <hr className='border-bottom border-slate-500' />

            <Head id='graduation' text='졸업 요건' />
            <Body>
                <MdText markdown={data0401.text ?? " "} />
            </Body>
            <hr className='border-bottom border-slate-500' />

            <Head id='major' text='복수/부전공' />
            <Body>
                <MdText markdown={data0402.text ?? " "} />
            </Body>
            <hr className='border-bottom border-slate-500' />
        </div>
    );
}