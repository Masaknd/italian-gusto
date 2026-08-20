import { en } from "./en";
import { ja } from "./ja";
import type { Locale } from "@/lib/i18n";

export const dictionaries = { ja, en } as const;
export function getDictionary(locale: Locale) { return dictionaries[locale]; }
export type Dictionary = typeof ja;
