import 'server-only';
import { createTranslationCms } from './cms';
import { createTranslationQueue } from './queue';
import {
  buildTranslationBatches,
  isTranslationBatchWithinLimit,
  requestDeepLTranslation,
} from '../deepl-request';

export function requireSetting(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing server setting: ${name}`);
  return value;
}

export function translationDestination() {
  const origin = new URL(requireSetting('TRANSLATION_SITE_URL'));
  if (
    origin.protocol !== 'https:' ||
    origin.username ||
    origin.password ||
    origin.pathname !== '/' ||
    origin.search ||
    origin.hash
  ) {
    throw new Error('TRANSLATION_SITE_URL must be a public HTTPS origin');
  }
  return new URL('/api/translations/process', origin).toString();
}

export function translationQueue() {
  return createTranslationQueue({
    token: requireSetting('QSTASH_TOKEN'),
    baseUrl: process.env.QSTASH_URL || undefined,
    destination: translationDestination(),
    queueName:
      process.env.QSTASH_TRANSLATION_QUEUE || 'gusto-menu-translations',
  });
}

export function translationCms() {
  return createTranslationCms({
    serviceDomain: requireSetting('MICROCMS_SERVICE_DOMAIN'),
    apiKey: requireSetting('MICROCMS_TRANSLATION_API_KEY'),
  });
}

export async function translateJapanese(texts: string[]) {
  const key = requireSetting('DEEPL_API_KEY');
  const translated: string[] = [];
  for (const batch of buildTranslationBatches(texts)) {
    if (!isTranslationBatchWithinLimit(batch))
      throw new Error('Japanese text exceeds the translation request limit');
    translated.push(...(await requestDeepLTranslation(batch, key)));
  }
  return translated;
}
