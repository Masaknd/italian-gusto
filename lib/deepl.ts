import { cacheLife, cacheTag } from "next/cache";
import { CMS_TAG } from "./microcms/content";

const translationTag = "gusto-menu-translations";

async function translateTexts(texts: string[]) {
  "use cache";
  cacheLife("hours");
  cacheTag(CMS_TAG, translationTag);
  if (!process.env.DEEPL_API_KEY || texts.length === 0) return texts;
  try {
    const body = new URLSearchParams({ target_lang: "EN", source_lang: "JA" });
    texts.forEach((text) => body.append("text", text));
    const response = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      headers: { Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`, "Content-Type": "application/json" },
      body,
    });
    if (!response.ok) throw new Error(`DeepL responded ${response.status}`);
    const data = (await response.json()) as { translations: { text: string }[] };
    return data.translations.map((translation) => translation.text);
  } catch (error) {
    console.error("DeepL translation request failed", error instanceof Error ? error.message : error);
    return texts;
  }
}

export async function translateManagedFields<T extends { name: string; description?: string }>(items: T[]) {
  const source = items.flatMap((item) => [item.name, ...(item.description ? [item.description] : [])]);
  const translated = await translateTexts(source);
  let index = 0;
  return items.map((item) => ({ ...item, name: translated[index++] ?? item.name, description: item.description ? translated[index++] ?? item.description : undefined }));
}
