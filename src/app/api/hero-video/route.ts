// Proxy route to serve the hero background video with cache and range support
// This improves reliability and allows us to control caching headers from our origin.

const EXTERNAL_VIDEO_MP4 =
  "https://cdn.pixabay.com/video/2022/10/24/136283-764387738_large.mp4";

// Support HEAD for preloading checks by the browser/CDN
export async function HEAD(request: Request) {
  const res = await GET(request);
  return new Response(null, { status: res.status, headers: res.headers });
}

export async function GET(request: Request) {
  try {
    // Grab Range header if present (used for seeking)
    const range = request.headers.get("range") ?? undefined;

    const upstream = await fetch(EXTERNAL_VIDEO_MP4, {
      // Forward Range requests for seeking/streaming
      headers: range ? { Range: range } : undefined,
      next: { revalidate: 60 * 60 * 24 },
    });

    // Accept normal OK and Partial Content responses
    if (!upstream.ok && upstream.status !== 206) {
      // Error: do not cache this response
      return new Response("Upstream error", {
        status: upstream.status,
        headers: {
          "cache-control": "no-store",
          vary: "range",
        },
      });
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

    // Fallback content-type if the upstream didn't send it for some reason
    if (!headers.has("content-type")) headers.set("content-type", "video/mp4");

    // Our cache policy (1 day, with SWR)
    headers.set(
      "cache-control",
      "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800"
    );

    // Always allow range responses to pass through and vary on Range
    headers.set("accept-ranges", "bytes");
    headers.set("vary", "range");

    return new Response(upstream.body, {
      status: upstream.status,
      headers,
    });
  } catch {
    // Proxy error: do not cache this response
    return new Response("Video proxy failed", {
      status: 502,
      headers: {
        "cache-control": "no-store",
        vary: "range",
      },
    });
  }
}
