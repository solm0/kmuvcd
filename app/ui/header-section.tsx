import DashboardButton from './header/dashboard-button';
import DocsButton from './header/docs-button';
import { Suspense } from 'react';

export default function HeaderSection() {
  return (
    <section
      className="relative w-screen flex h-16 z-40 p-4"
    >
      <Suspense>
        <DocsButton />
        <DashboardButton />
      </Suspense>
    </section>
  );
}