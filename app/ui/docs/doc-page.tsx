import { getCmsData } from '@/app/lib/get-cms-data';
import { PostProps } from '@/app/lib/definitions';
import MdText from '@/app/ui/cms/md-text';
import Website from '@/app/ui/cms/website';
import { ImageMedia } from '@/app/ui/cms/media';

export default async function DocPage() {
  const data0101 = await getCmsData<PostProps>('department-introduction?') as PostProps;
  const data0201 = await getCmsData<PostProps>('professors?populate=thumbnail&populate=website') as PostProps[];
  const data0202 = await getCmsData<PostProps>('curriculum') as PostProps;
  const data0203 = await getCmsData<PostProps>('courses?pagination[pageSize]=50') as PostProps[];
  const data0204 = await getCmsData<PostProps>('graduate-schools?populate=website') as PostProps[];
  // const data0205 = await getCmsData<PostProps[]>('') as PostProps[];
  const data0301 = await getCmsData<PostProps>('student-councils') as PostProps[];
  const data0302 = await getCmsData<PostProps>('staffs') as PostProps[];
  const data0303 = await getCmsData<PostProps>('facility-overviews?populate=thumbnail&populate=photo') as PostProps[];
  const data0401 = await getCmsData<PostProps>('graduation-requirement') as PostProps;
  const data0402 = await getCmsData<PostProps>('double-major-and-minor') as PostProps;


    return (
      <div>
        <h2 className='pb-8' id='mission'>학과 소개</h2>
        <div key={data0101.documentId}>
            <p>title:{data0101.name}</p>
            <MdText markdown={data0101.text ?? " "} />
        </div>

        <h2 className='pb-8' id='professors'>교수진</h2>
          <p>개인 홈페이지 있을 경우 카드 형태로 함께 기재</p>
          {data0201.map((post: PostProps) => (
              <div key={post.documentId} className='rounded-lg bg-gray-100 p-8 mb-4'>
                  <p>name: {post.name}</p>
                  <p>position: {post.position}</p>
                  <p>education: {post.education}</p>
                  <p>location: {post.location}</p>
                  <p>phone: {post.phone}</p>
                  <p>email: {post.email}</p>
                  {post.website && post.website?.length > 0 && (
                      <div>website:
                          {post.website?.map((website) => (
                              <Website key={website.id} website={website} />
                          ))}
                      </div>
                  )}
                  {post.thumbnail &&
                      <div>thumbnail:
                          <ImageMedia media={post.thumbnail} size='thumbnail' />
                      </div>
                  }
              </div>
          ))}

        <h2 className='pb-8' id='curriculum'>학부 커리큘럼</h2>
          <p>커리큘럼 표에 hover, click하면 교과목 상세 페이지(설명, 결과물과 강의평(로그인 유저가 직접 올리기 가능)) 나옴, 이것도 뷰를 두개(표 모드, 리스트 모드) 둬서 리스트 모드에서는 subject, format, mandatory, grade로 필터링해볼 수 있게 할까..?</p>
          <div key={data0202.id} className='rounded-lg bg-gray-100 p-8'>
          <p>name:{data0202.name}</p>
          <MdText markdown={data0202.text ?? " "} />
        </div>

        <h3 className='pb-8'>교과목</h3>
        {data0203.map((post: PostProps) => (
            <div key={post.documentId} className='rounded-lg bg-gray-100 p-8 mb-4'>
                <p>name: {post.name}</p>
                <p>credits: {post.credits}</p>
                <p>subject: {post.subject}</p>
                <p>format: {post.format}</p>
                <p>mandatory: {post.mandatory}</p>
                <p>grade: {post.grade}</p>
                <MdText markdown={post.text ?? " "} />
            </div>
        ))}

        <h2 className="pb-8" id='grad_schools'>대학원</h2>
        {data0204.map((post: PostProps) => (
            <div key={post.documentId} className="rounded-lg bg-gray-100 p-8 mb-4">
                <p>name: {post.name}</p>
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

        <h2 className='pb-8' id='international'>국제교류</h2>

        <h2 className="pb-8" id='student_councils'>학생회</h2>
        {data0301.map((post: PostProps) => (
            <div key={post.documentId} className="rounded-lg bg-gray-100 p-8 mb-4">
                <p>name: {post.name}</p>
                <p>semester: {post.semester}</p>
                <MdText markdown={post.text ?? " "} />
            </div>
        ))}

        <h2 className="pb-8" id='staffs'>교직원</h2>
        {data0302.map((post: PostProps) => (
            <div key={post.documentId} className="rounded-lg bg-gray-100 p-8 mb-4">
                <p>name: {post.name}</p>
                <p>location: {post.location}</p>
                <p>phone: {post.phone}</p>
                <p>email: {post.email}</p>
                <MdText markdown={post.text ?? " "} />
            </div>
        ))}

        <h2 className="pb-8" id='facility'>시설 소개</h2>
        <p>&apos;로그인 후 신청하러 가기&apos; 버튼, 로그인/회원가입 페이지로 리다이렉트</p>
        {data0303.map((post: PostProps) => (
            <div key={post.documentId} className="rounded-lg bg-gray-100 p-8 mb-4">
                <p>name: {post.name}</p>
                <p>room_number: {post.room_number}</p>
                <MdText markdown={post.text ?? " "} />
                <div>photo:
                    {post.photo?.map((photo) => (
                        <ImageMedia key={photo.id} media={photo} size='medium' />
                    ))}
                </div>
            </div>
        ))}

        <h2 className='pb-8' id='graduation'>졸업요건</h2>
        <div key={data0401.documentId} className='rounded-lg bg-gray-100 p-8'>
            <p>name:{data0401.name}</p>
            <MdText markdown={data0401.text ?? " "} />
        </div>

        <h2 className='pb-8' id='major'>복/부전공</h2>
        <div key={data0402.documentId} className='rounded-lg bg-gray-100 p-8'>
            <p>name:{data0402.name}</p>
            <MdText markdown={data0402.text ?? " "} />
        </div>
      </div>
    );
}