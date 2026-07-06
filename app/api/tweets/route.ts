const TWEET_IDS = [
  "2073880552487154115",
  "2074218961621721517",
  "2074194776841142592",
  "2074154171121451438"
];

function getToken(id: string): string {
  return (Number(id) / 1e15 * Math.PI).toString(36).replace(/(0+|\.)/g, "");
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const results = await Promise.allSettled(
      TWEET_IDS.map(async (id) => {
        const url = `https://cdn.syndication.twimg.com/tweet-result?id=${id}&token=${getToken(id)}&lang=en`;
        const res = await fetch(url, {
          headers: { "User-Agent": "Mozilla/5.0" },
          next: { revalidate: 3600 },
        });
        if (!res.ok) return null;
        const data = await res.json();
        if (data.__typename !== "Tweet") return null;
        return data;
      })
    );

    const tweets = results
      .filter((r) => r.status === "fulfilled" && r.value)
      .map((r) => (r as PromiseFulfilledResult<any>).value);

    return Response.json({ tweets }, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=60",
      },
    });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
