'use client'

// searchParam으로 '보기', '카테고리', '검색' 쿼리파라미터 set
// useState로 뷰 바꾸기, 새로운 창 여닫기

// nested route? 참고.

// 뷰 바꾸기: 그거에 따라 아래에 렌더할 컴포넌트가 바뀜. 'Calendar', 'Lists', 'Images'
// 카테고리: prop으로 보내주면 컴포넌트가 그거 가지고 필터링한 data만 렌더함.

// 모든 텍스트 콘텐츠는 docs처럼 서버에서 fetch하고 서버에서 렌더함.

// 이것도 view-change -> {Calendar,Lists,Images} -> 
// 아니 prop으로 보내기엔 너무 멀어...
// 각 컴포넌트마다 말단에 데이터를 맵핑할거아냐? 그 데이터에 documentId가 있을거아냐?
// 그걸로 url을 만들거아냐? <Link>할거잖아? 그럼 저기 (events)에 있는 폴더마다
// [slug]만들어서 페이지만들어두고.
// 그 페이지가 {children}으로 오겠지.

export default function ViewChange({children}: {children: React.ReactNode}) {
  return(
    <div>
      <div className="bg-gray-200 h-12 p-4 flex items-center border-b border-gray-400 gap-4">
        <label>보기: </label>
        <button className="hover:text-gray-500">캘린더</button>
        <button className="hover:text-gray-500">리스트</button>
        <button className="hover:text-gray-500">이미지</button>
      </div>
      <div className="bg-gray-200 h-12 p-4 flex items-center border-b border-gray-400 gap-4">
        <label>카테고리: </label>
        <button className="hover:text-gray-500">전시</button>
        <button className="hover:text-gray-500">활동</button>
        <button className="hover:text-gray-500">이벤트</button>
        <button className="hover:text-gray-500">학사공지</button>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}