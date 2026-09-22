const maxBodyBytes = 100 * 1024;
const maxTextsPerRequest = 50;

export function createTranslationBody(texts: string[]) {
  return JSON.stringify({ text: texts, target_lang: 'EN', source_lang: 'JA' });
}

export function buildTranslationBatches(texts: string[]) {
  const batches: string[][] = [];
  let batch: string[] = [];
  for (const value of texts) {
    const next = [...batch, value];
    const size = new TextEncoder().encode(createTranslationBody(next)).length;
    if (
      (size > maxBodyBytes || next.length > maxTextsPerRequest) &&
      batch.length
    ) {
      batches.push(batch);
      batch = [value];
    } else {
      batch = next;
    }
  }
  if (batch.length) batches.push(batch);
  return batches;
}

export function isTranslationBatchWithinLimit(texts: string[]) {
  return (
    new TextEncoder().encode(createTranslationBody(texts)).length <=
    maxBodyBytes
  );
}

export async function requestDeepLTranslation(
  texts: string[],
  apiKey: string,
  fetcher: typeof fetch = fetch,
) {
  if (!apiKey) throw new Error('DeepL API key is missing');
  const host = apiKey.endsWith(':fx') ? 'api-free.deepl.com' : 'api.deepl.com';
  const response = await fetcher(`https://${host}/v2/translate`, {
    method: 'POST',
    signal: AbortSignal.timeout(15000),
    headers: {
      Authorization: `DeepL-Auth-Key ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: createTranslationBody(texts),
  });
  if (!response.ok) throw new Error(`DeepL responded ${response.status}`);
  const data = (await response.json()) as {
    translations?: { text?: string }[];
  };
  if (
    data.translations?.length !== texts.length ||
    data.translations.some((item) => typeof item.text !== 'string')
  ) {
    throw new Error('DeepL returned an incomplete translation');
  }
  return data.translations.map((item) => item.text as string);
}
