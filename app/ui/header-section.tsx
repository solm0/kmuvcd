import DashboardButton from './header/dashboard-button';
import DocsButton from './header/docs-button';
import ViewButton from './header/view-button';
import CategoryButton from './header/category-button';

export default async function HeaderSection() {
  return (
    <section
      className="fixed w-screen h-16 flex z-20 p-4 gap-4"
    >
      <DocsButton />
      <ViewButton />
      <CategoryButton />
      <DashboardButton />
    </section>
  );
}