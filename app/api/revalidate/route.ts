import { NextResponse } from 'next/server';
import { revalidateMenuContent } from '@/lib/microcms/revalidate';

export async function POST(request: Request) {
  const secret =
    request.headers.get('x-revalidate-secret') ??
    new URL(request.url).searchParams.get('secret');
  if (
    !process.env.REVALIDATE_SECRET ||
    secret !== process.env.REVALIDATE_SECRET
  )
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  revalidateMenuContent();
  return NextResponse.json({ revalidated: true });
}
