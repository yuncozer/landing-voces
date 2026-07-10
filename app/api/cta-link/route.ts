const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQa4yKfu5TfxDL3HShu4tVHdl3PYUGa6TaUxjOwOMQJbyKovP8lfDCDbYGvjkIdaAexLD790AraFpfe/pub?gid=1885587000&single=true&output=csv";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch(GOOGLE_SHEET_CSV_URL, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000)
    });
    if (!response.ok) {
      return Response.json({ url: "#" });
    }
    const csvText = await response.text();
    const lines = csvText.split(/\r?\n/);
    for (const line of lines) {
      const cleanLine = line.trim();
      if (!cleanLine) continue;
      const columns = cleanLine.split(",");
      const cellValue = columns[0] ? columns[0].replace(/"/g, "").trim() : "";
      if (cellValue) {
        return Response.json({ url: cellValue }, {
          headers: {
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=60",
          },
        });
      }
    }
    return Response.json({ url: "#" });
  } catch {
    return Response.json({ url: "#" });
  }
}
