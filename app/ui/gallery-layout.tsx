import { PostProps, UserDataProps } from "../lib/definitions";
import View from "./view";
import MoreOptions from "./board/more-options";
import BoardImage from "./board/board-image";
import AnimatedContainer from "./board/animated-container";

export default function GalleryLayout({children, posts, user}: {children: React.ReactNode; posts: PostProps[]; user: UserDataProps}) {
  return (
    <div className="flex-1 overflow-hidden">
      <View />
      <div className="w-full flex h-full">
        <div className="flex-1 overflow-x-auto p-4">
          <MoreOptions login={user ? true : false} />
          <BoardImage
            data={posts}
            user={user}
          />
        </div>
        <AnimatedContainer>{children}</AnimatedContainer>
      </div>
    </div>
  );
}