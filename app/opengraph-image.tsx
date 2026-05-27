import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AnalyticsPro — Real-Time Analytics Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #020817 0%, #0d0f1e 60%, #0d0828 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "50px",
            left: "50px",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "50px",
            right: "50px",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(79,70,229,0.2) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "32px" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5l5-5 4 4 5-6 4 3" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: "40px", fontWeight: "800", color: "#fff" }}>
            Analytics<span style={{ color: "#a78bfa" }}>Pro</span>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: "800",
            color: "#fff",
            textAlign: "center",
            lineHeight: 1.1,
            maxWidth: "900px",
            marginBottom: "24px",
          }}
        >
          Analytics that actually grow your business
        </div>

        {/* Subtext */}
        <div style={{ color: "#64748b", fontSize: "22px", textAlign: "center", maxWidth: "700px", marginBottom: "40px" }}>
          Real-time dashboards · SEO tracking · A/B testing · Core Web Vitals
        </div>

        {/* Stats strip */}
        <div style={{
          display: "flex",
          gap: "0px",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "14px",
          overflow: "hidden",
        }}>
          {[
            ["10,000+", "Active Teams"],
            ["99.9%", "Uptime SLA"],
            ["4.9 ★", "Avg Rating"],
          ].map(([val, label]) => (
            <div key={label} style={{
              padding: "16px 36px",
              textAlign: "center",
              borderRight: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
              <div style={{ fontSize: "26px", fontWeight: "800", color: "#fff" }}>{val}</div>
              <div style={{ fontSize: "13px", color: "#475569", marginTop: "2px" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
