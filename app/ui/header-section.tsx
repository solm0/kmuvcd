import DashboardButton from './header/dashboard-button';
import DocsButton from './header/docs-button';
import ViewButton from './header/view-button';
import CategoryButton from './header/category-button';
import { Suspense } from 'react';

export default async function HeaderSection() {
  return (
    <section
      className="fixed w-screen h-16 flex z-20 p-4 gap-4"
    >
      <Suspense>
        <DocsButton />
        <ViewButton />
        <CategoryButton />
        <DashboardButton />
      </Suspense>
    </section>
  );
}