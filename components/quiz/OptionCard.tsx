"use client";

interface OptionCardProps {
  emoji: string;
  label: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  variant?: "radio" | "checkbox";
}

export default function OptionCard({
  emoji,
  label,
  selected,
  onClick,
  disabled,
  variant = "checkbox",
}: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`option-card${selected ? " selected" : ""}`}
      style={{ width: "100%", textAlign: "left", cursor: disabled ? "default" : "pointer" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {variant === "radio" && (
          <div
            className={`option-radio${selected ? " option-radio--selected" : ""}`}
            style={{ flexShrink: 0 }}
          />
        )}
        <span style={{ fontSize: "1.35rem", lineHeight: 1, flexShrink: 0 }}>
          {emoji}
        </span>
        <span
          style={{
            flex: 1,
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "0.95rem",
            color: "var(--text)",
            lineHeight: 1.4,
          }}
        >
          {label}
        </span>
        {variant === "checkbox" && selected && (
          <div
            className="option-check"
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              color: "#fff",
              fontSize: "0.7rem",
              fontWeight: 800,
            }}
          >
            ✓
          </div>
        )}
      </div>
    </button>
  );
}
