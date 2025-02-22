import SlugPage from "@/app/ui/slug-page"

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <SlugPage slug={slug} />
}