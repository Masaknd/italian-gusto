import { cookies, draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMicroCmsClient } from '@/lib/microcms/client';

const ENDPOINTS = ['menus', 'featured-menus'] as const;
type Endpoint = (typeof ENDPOINTS)[number];

function isEndpoint(value: string | null): value is Endpoint {
  return ENDPOINTS.some((endpoint) => endpoint === value);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const id = searchParams.get('id');
  const draftKey = searchParams.get('draftKey');
  const endpoint = searchParams.get('endpoint');

  if (
    !process.env.REVALIDATE_SECRET ||
    secret !== process.env.REVALIDATE_SECRET ||
    !id ||
    !draftKey ||
    !isEndpoint(endpoint)
  ) {
    return new Response('Unauthorized', { status: 401 });
  }

  const client = getMicroCmsClient();
  if (!client) return new Response('CMS unavailable', { status: 503 });

  try {
    await client.getListDetail({
      endpoint,
      contentId: id,
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
    secure: true,
  };
  jar.set('microcms-draft-key', draftKey, preview);
  jar.set('microcms-draft-id', id, preview);
  jar.set('microcms-draft-endpoint', endpoint, preview);

  redirect(endpoint === 'featured-menus' ? '/ja' : '/ja/menu');
}
