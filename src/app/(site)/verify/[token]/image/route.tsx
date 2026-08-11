import { ImageResponse } from "next/og";
import { verifyCertificate } from "@/server/services/certificates";

export const dynamic = "force-dynamic";

/**
 * A shareable PNG of the certificate — the dark card and nothing else — so a
 * learner can post their achievement. Rendered with next/og (Satori), which
 * only understands flexbox and inline styles, hence the explicit display:flex
 * on every multi-child node.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const result = await verifyCertificate(token);
  if (result.status !== "valid") {
    return new Response("Certificate not found", { status: 404 });
  }
  const cert = result.certificate;

  const origin = new URL(request.url).origin;
  const [playfair, inter, interSemi] = await Promise.all([
    fetch(new URL("/fonts/PlayfairDisplay-700.woff", origin)).then((r) =>
      r.arrayBuffer(),
    ),
    fetch(new URL("/fonts/Inter-400.woff", origin)).then((r) => r.arrayBuffer()),
    fetch(new URL("/fonts/Inter-600.woff", origin)).then((r) => r.arrayBuffer()),
  ]);

  const issued = new Date(cert.issuedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "48px",
          backgroundColor: "#0b0b0d",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px",
            borderRadius: "28px",
            border: "2px solid #3a3320",
            backgroundColor: "#100e08",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              borderRadius: "999px",
              border: "3px solid #c9a227",
            }}
          >
            <div
              style={{
                fontSize: "40px",
                color: "#c9a227",
                fontFamily: "Playfair",
              }}
            >
              M
            </div>
          </div>

          <div
            style={{
              marginTop: "30px",
              fontSize: "20px",
              letterSpacing: "5px",
              color: "#c9a227",
              fontWeight: 600,
            }}
          >
            MABY ACADEMY CERTIFIES
          </div>

          <div
            style={{
              marginTop: "26px",
              fontSize: "70px",
              color: "#f5f3ee",
              fontFamily: "Playfair",
              textAlign: "center",
            }}
          >
            {cert.user.name}
          </div>

          <div style={{ marginTop: "20px", fontSize: "24px", color: "#a6a29a" }}>
            has successfully completed
          </div>

          <div
            style={{
              marginTop: "14px",
              fontSize: "34px",
              color: "#e0b53a",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            {cert.course.title}
          </div>

          {cert.finalScore != null && (
            <div
              style={{ marginTop: "16px", fontSize: "22px", color: "#a6a29a" }}
            >
              Final score {cert.finalScore}%
            </div>
          )}

          <div
            style={{
              marginTop: "52px",
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontFamily: "Playfair",
                  fontSize: "30px",
                  color: "#f5f3ee",
                }}
              >
                Maby
              </div>
              <div
                style={{
                  marginTop: "6px",
                  fontSize: "14px",
                  letterSpacing: "2px",
                  color: "#8a867e",
                }}
              >
                FOUNDER, MABY ACADEMY
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <div style={{ fontSize: "20px", color: "#f5f3ee" }}>{issued}</div>
              <div
                style={{
                  marginTop: "6px",
                  fontSize: "14px",
                  letterSpacing: "1px",
                  color: "#8a867e",
                }}
              >
                NO. {cert.serial}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 800,
      fonts: [
        { name: "Playfair", data: playfair, weight: 700, style: "normal" },
        { name: "Inter", data: inter, weight: 400, style: "normal" },
        { name: "Inter", data: interSemi, weight: 600, style: "normal" },
      ],
    },
  );
}
