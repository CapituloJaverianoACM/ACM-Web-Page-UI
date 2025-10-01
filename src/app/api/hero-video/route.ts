// Proxy route to serve the hero background video with cache and range support
// This improves reliability and allows us to control caching headers from our origin.

import type { NextRequest } from "next/server";

const EXTERNAL_VIDEO_MP4 =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export async function GET(req: NextRequest) {
  try {
    const range = req.headers.get("range") ?? undefined;

    const upstream = await fetch(EXTERNAL_VIDEO_MP4, {
      // Forward Range requests for seeking/streaming
      headers: range ? { range } : undefined,
      // Let the CDN/browser cache it; also allow Next caching
      // Note: next.revalidate doesn't affect opaque streams, but it's fine.
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!upstream.ok && upstream.status !== 206) {
      return new Response("Upstream error", { status: upstream.status });
    }

    // Copy relevant headers through and set strong caching
    const headers = new Headers();
    const copy = [
      "content-type",
      "content-length",
      "accept-ranges",
      "content-range",
      "etag",
      "last-modified",
    ];
    for (const h of copy) {
      const v = upstream.headers.get(h);
      if (v) headers.set(h, v);
    }

    // Our cache policy (1 day, with SWR)
    headers.set(
      "cache-control",
      "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800"
    );

    // Allow range responses to pass through
    if (!headers.has("accept-ranges")) headers.set("accept-ranges", "bytes");

    return new Response(upstream.body, {
      status: upstream.status,
      headers,
    });
  } catch {
    return new Response("Video proxy failed", { status: 502 });
  }
}
