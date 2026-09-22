import 'server-only';
import { revalidatePath, revalidateTag } from 'next/cache';
import { CMS_TAG } from './content';

export function revalidateMenuContent() {
  // A publication/unpublication must not serve an outdated approval or availability state.
  revalidateTag(CMS_TAG, { expire: 0 });
  for (const path of ['/ja', '/en', '/ja/menu', '/en/menu'])
    revalidatePath(path);
}
