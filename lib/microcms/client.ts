import { createClient } from "microcms-js-sdk";

export function getMicroCmsClient() {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;
  if (!serviceDomain || !apiKey) return null;
  return createClient({ serviceDomain, apiKey });
}
