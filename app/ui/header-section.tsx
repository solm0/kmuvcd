import DashboardButton from './dashboard-button';

export default async function HeaderSection() {
  return (
    <section
      className="fixed w-screen h-12 flex z-20"
    >
      <div className="w-56 h-full flex items-center gap-4">
        <p className="break-keep p-4 text-sm pl-8">국민대학교 시각디자인학과</p>
      </div>
      <div className="w-36 ml-auto">
        <DashboardButton />
      </div>
    </section>
  );
}