import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { CMS_TAG } from "@/lib/microcms/content";

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret") ?? new URL(request.url).searchParams.get("secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  revalidateTag(CMS_TAG, "max");
  ["/ja", "/en", "/ja/menu", "/en/menu"].forEach((path) => revalidatePath(path));
  return NextResponse.json({ revalidated: true });
}
