export default async function Layout({children}: {children: React.ReactNode}) {
  
  return (
    <div className="w-full flex p-4 h-full gap-4">
      <div className="flex-1 overflow-x-auto">
        lists layout
      </div>
      <div className="w-auto overflow-x-auto">
        {children}
      </div>
    </div>
  );
}