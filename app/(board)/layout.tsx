import BoardLayout from "../ui/board-layout";

export default async function Layout({children}: {children: React.ReactNode}) {
 
  return(
    <BoardLayout>
      {children}
    </BoardLayout>
  );
}