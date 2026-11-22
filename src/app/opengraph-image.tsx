import { ImageResponse } from "next/og";

export const alt = "Mohammed Shoaeb Malik, freelance web and AI developer in Bangalore";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Share card shown when the site is posted on WhatsApp, LinkedIn, X and others. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: "radial-gradient(circle at 75% 30%, #2a2418 0%, #070706 60%)",
          color: "#f5f0e8",
          fontFamily: "serif"
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 14, color: "#d7c7aa" }}>SHOAEB</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1.05 }}>Freelance Web &amp; AI Developer</div>
          <div style={{ fontSize: 76, lineHeight: 1.05, fontStyle: "italic", color: "#d7c7aa" }}>in Bangalore</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#a5a5a0" }}>
          <div style={{ display: "flex" }}>Mohammed Shoaeb Malik · 3× hackathon winner</div>
          <div style={{ display: "flex", color: "#d7c7aa" }}>shoaebmalik.in</div>
        </div>
      </div>
    ),
    size
  );
}
