import DashboardButton from './header/dashboard-button';
import DocsButton from './header/docs-button';
import ViewButton from './header/view-button';
import CategoryButton from './header/category-button';
import { Suspense } from 'react';

export default async function HeaderSection() {
  return (
    <section
      className="relative w-screen flex h-auto z-40 p-4"
    >
      <Suspense>
        <DocsButton />
        <div className='mt-12 md:mt-0 md:ml-56 flex flex-wrap gap-4'>
          <ViewButton />
          <CategoryButton />
        </div>
        <DashboardButton />
      </Suspense>
    </section>
  );
}