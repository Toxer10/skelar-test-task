"use client";

interface StepCounterProps {
  current: number;
  total: number;
}

export default function StepCounter({ current, total }: StepCounterProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ display: "flex", gap: 3, flex: 1 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 6,
              borderRadius: 99,
              background: i < current ? "var(--primary)" : "var(--border)",
              transition: "background 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        ))}
      </div>
      <span
        style={{
          fontSize: "0.72rem",
          fontWeight: 700,
          color: "var(--text-muted)",
          whiteSpace: "nowrap",
          letterSpacing: "0.04em",
        }}
      >
        <span style={{ color: "var(--primary)", fontWeight: 800 }}>{current}</span>
        {" / "}
        {total}
      </span>
    </div>
  );
}
