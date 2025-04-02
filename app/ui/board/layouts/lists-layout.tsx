import { PostProps, UserDataProps } from "../../../lib/types";
import Filter from "../filter";
import BoardList from "../lists/board-list";
import DetailWindow from "../detail-window";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import clsx from 'clsx';

export default function ListsLayout({children, posts, user}: {children: React.ReactNode; posts: PostProps[]; user: UserDataProps}) {
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("expand") === "true") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
      // console.log('closed', isOpen)
    }
  }, [searchParams]);

  return (
    <div className={clsx("flex-1 overflow-hidden flex flex-col md:flex-row", isOpen && "md:flex-col")}>
      <Filter login={user ? true : false} />
      <div className="w-full h-full overflow-x-auto p-4">
        <div className="w-full overflow-x-auto text-sm">{`필터링 결과 ${posts.length}건`}</div>
        <table className="table-auto text-left w-full text-sm">
          <thead>
            <tr className="h-12">
              <th>제목</th>
              <th>카테고리</th>
              <th>작성자</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            <BoardList
              data={posts}
            />
          </tbody>
        </table>
      </div>
      <DetailWindow>{children}</DetailWindow>
    </div>
  );
}