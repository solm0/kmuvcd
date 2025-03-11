import { PostProps, UserDataProps } from "../lib/definitions";
import View from "./view";
import MoreOptions from "./board/more-options";
import BoardList from "./board/board-list";
import AnimatedContainer from "./board/animated-container";

export default function ListsLayout({children, posts, user}: {children: React.ReactNode; posts: PostProps[]; user: UserDataProps}) {
  return (
    <div className="flex-1 overflow-hidden">
      <View />
      <div className="w-full flex h-full">
        <div className="flex-1 overflow-x-auto p-4">
          <MoreOptions login={user ? true : false} />
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
                user={user}
              />
            </tbody>
          </table>
        </div>
        <AnimatedContainer>{children}</AnimatedContainer>
      </div>
    </div>
  );
}