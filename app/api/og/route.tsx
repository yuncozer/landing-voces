import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const base = new URL(req.url).origin;
  const logo = await fetch(new URL("/Images/Logo.png", base)).then((res) =>
    res.arrayBuffer()
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "linear-gradient(135deg, #0c1a3e 0%, #17408B 50%, #0c1a3e 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={logo as unknown as string}
          alt=""
          style={{
            width: 120,
            height: "auto",
            opacity: 0.9,
            marginBottom: 24,
          }}
        />
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#fff",
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          S.O.S Voces por Venezuela
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#F7C400",
            textAlign: "center",
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Maratón de solidaridad
        </div>
        <div
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            maxWidth: 600,
          }}
        >
          13 de Julio de 2026
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
