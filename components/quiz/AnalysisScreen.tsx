"use client";

import { useEffect, useState } from "react";
import { t, UI } from "@/app/lib/i18n";
import { Lang } from "@/app/lib/types";

interface AnalysisScreenProps {
  lang: Lang;
  onComplete: () => void;
}

export default function AnalysisScreen({ lang, onComplete }: AnalysisScreenProps) {
  const steps = UI.analysisSteps;
  const [completedCount, setCompletedCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    steps.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setCompletedCount(i + 1);
        }, (i + 1) * 900),
      );
    });

    timers.push(
      setTimeout(
        () => {
          setDone(true);
        },
        steps.length * 900 + 300,
      ),
    );

    timers.push(
      setTimeout(
        () => {
          onComplete();
        },
        steps.length * 900 + 1400,
      ),
    );

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="animate-fade-in-up"
      style={{ display: "flex", flexDirection: "column", gap: 28, alignItems: "center" }}
    >
      {/* Animated brain */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--lavender), var(--primary))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2.5rem",
          boxShadow: "0 0 40px rgba(124,58,237,0.3)",
        }}
        className="animate-pulse-soft"
      >
        🧠
      </div>

      {/* Title */}
      <div style={{ textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "1.35rem",
            color: "var(--text)",
            marginBottom: 8,
            transition: "all 0.4s ease",
          }}
        >
          {done ? t(UI.analysisDone, lang) : t(UI.analysisTitle, lang)}
        </h2>
        {!done && (
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
            {t(UI.analysisSubtitle, lang)}
          </p>
        )}
      </div>

      {/* Steps */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
        {steps.map((step, i) => {
          const isComplete = completedCount > i;
          const isActive = completedCount === i;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "11px 16px",
                borderRadius: "var(--radius-sm)",
                background: isComplete ? "var(--mint-soft)" : "var(--bg-card)",
                border: `1.5px solid ${isComplete ? "var(--mint)" : "var(--border)"}`,
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                opacity: completedCount >= i ? 1 : 0.35,
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {isComplete ? (
                  <span
                    style={{ color: "var(--mint)", fontWeight: 800, fontSize: "0.95rem" }}
                  >
                    ✓
                  </span>
                ) : isActive ? (
                  <div style={{ display: "flex", gap: 3 }}>
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                ) : (
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--border)",
                    }}
                  />
                )}
              </div>
              <span
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: isComplete ? "var(--text)" : "var(--text-muted)",
                  transition: "color 0.4s ease",
                }}
              >
                {t(step, lang)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
