import { cookies, draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { getMicroCmsClient } from '@/lib/microcms/client';
import { isCmsEndpoint } from '@/lib/microcms/content';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const contentId = searchParams.get('contentId') ?? searchParams.get('id');
  const draftKey = searchParams.get('draftKey');
  const endpoint = searchParams.get('endpoint') ?? undefined;

  if (
    !process.env.REVALIDATE_SECRET ||
    secret !== process.env.REVALIDATE_SECRET ||
    !contentId ||
    !draftKey ||
    !isCmsEndpoint(endpoint)
  ) {
    return new Response('Unauthorized', { status: 401 });
  }

  const client = getMicroCmsClient();
  if (!client) return new Response('CMS unavailable', { status: 503 });

  try {
    await client.getListDetail({
      endpoint,
      contentId,
      queries: { draftKey, fields: 'id' },
    });
  } catch {
    return new Response('Invalid draft', { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  const jar = await cookies();
  const preview = {
    httpOnly: true,
    sameSite: 'lax' as const,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  };
  jar.set('microcms-draft-key', draftKey, preview);
  jar.set('microcms-draft-id', contentId, preview);
  jar.set('microcms-draft-endpoint', endpoint, preview);

  redirect(endpoint === 'featured-menus' ? '/ja' : '/ja/menu');
}

export async function POST(request: Request) {
  const draft = await draftMode();
  draft.disable();

  const jar = await cookies();
  jar.delete('microcms-draft-key');
  jar.delete('microcms-draft-id');
  jar.delete('microcms-draft-endpoint');

  const requestUrl = new URL(request.url);
  const referer = request.headers.get('referer');
  let destination = new URL('/ja', requestUrl);

  if (referer && URL.canParse(referer)) {
    const refererUrl = new URL(referer);
    if (refererUrl.origin === requestUrl.origin) destination = refererUrl;
  }

  return NextResponse.redirect(destination, 303);
}
