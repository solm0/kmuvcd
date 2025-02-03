import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  const secret = process.env.STRAPI_SECRET;
  const headers = req.headers;

  if (headers.get('x-strapi-secret') !== secret) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { path } = await req.json();

    if (!path) {
      return NextResponse.json({ message: "Missing path" }, { status: 400 });
    }

    revalidatePath(path);

    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}