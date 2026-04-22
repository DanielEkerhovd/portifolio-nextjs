import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-sanity-webhook-secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  revalidateTag("sanity", "seconds");

  return Response.json({ revalidated: true, now: Date.now() });
}
