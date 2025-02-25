import SlugPage from "@/app/ui/slug-page";
import { Suspense } from "react";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <Suspense key='images' fallback={<div className="w-full">Loading post...</div>}>
      <SlugPage slug={slug} />
    </Suspense>
  )
}