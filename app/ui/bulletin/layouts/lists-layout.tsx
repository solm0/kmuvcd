import { PostProps, UserDataProps } from "../../../lib/types";
import Filter from "../filter/filter";
import BoardList from "../lists/board-list";
import DetailWindow from "../detail-window";
import clsx from 'clsx';
import { useIsOpen } from "@/app/lib/utils/use-is-open";

export default function ListsLayout({children, posts, user}: {children: React.ReactNode; posts: PostProps[]; user: UserDataProps}) {
  const isOpen = useIsOpen();

  return (
    <div className={clsx("flex-1 overflow-hidden flex flex-col")}>
      <Filter login={user ? true : false} />
      <div className={clsx(
        "w-full md:w-1/2 h-full overflow-x-auto pr-4",
        isOpen && '!w-full'
      )}>
        <div className="w-full overflow-x-auto text-sm text-slate-600 pb-4">{`필터링 결과 ${posts.length}건`}</div>
        <table className="text-left w-full text-sm">
          <thead>
            <tr className="h-12">
              <th className="w-28">태그</th>
              <th>제목</th>
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