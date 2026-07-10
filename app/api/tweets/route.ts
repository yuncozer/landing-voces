const TWEET_IDS = [
  "2073880552487154115",
  "2074218961621721517",
  "2074194776841142592",
  "2074154171121451438"
];

const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQa4yKfu5TfxDL3HShu4tVHdl3PYUGa6TaUxjOwOMQJbyKovP8lfDCDbYGvjkIdaAexLD790AraFpfe/pub?gid=0&single=true&output=csv";

/**
 * Generates a verification token for twimg syndication API.
 * @param id The tweet ID.
 * @returns The token string.
 */
function getToken(id: string): string {
  return (Number(id) / 1e15 * Math.PI).toString(36).replace(/(0+|\.)/g, "");
}

/**
 * Fetches tweet IDs from a public Google Sheet CSV.
 * @returns A promise resolving to an array of tweet IDs.
 */
async function fetchDynamicTweetIds(): Promise<string[]> {
  if (!GOOGLE_SHEET_CSV_URL || GOOGLE_SHEET_CSV_URL.startsWith("YOUR_")) {
    return TWEET_IDS;
  }
  try {
    const response = await fetch(GOOGLE_SHEET_CSV_URL, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000)
    });
    if (!response.ok) {
      return TWEET_IDS;
    }
    const csvText = await response.text();
    const lines = csvText.split(/\r?\n/);
    const ids: string[] = [];
    for (const line of lines) {
      const cleanLine = line.trim();
      if (!cleanLine) {
        continue;
      }
      const columns = cleanLine.split(",");
      const cellValue = columns[0] ? columns[0].replace(/"/g, "").trim() : "";
      if (!cellValue) {
        continue;
      }
      const match = cellValue.match(/\/status\/(\d+)/);
      if (match && match[1]) {
        ids.push(match[1]);
      } else if (/^\d+$/.test(cellValue)) {
        ids.push(cellValue);
      }
    }
    if (ids.length > 0) {
      return ids.slice(0, 8);
    }
  } catch (err) {
    console.error("Fetch Google Sheet error:", err);
    return TWEET_IDS;
  }
  return TWEET_IDS;
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET route handler to retrieve tweets.
 * @returns A response containing the list of fetched tweets.
 */
export async function GET() {
  try {
    const ids = await fetchDynamicTweetIds();
    const results = await Promise.allSettled(
      ids.map(async (id) => {
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
