"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Lang } from "@/app/lib/types";
import { t, UI } from "@/app/lib/i18n";

function SuccessContent() {
  const params = useSearchParams();
  const lang = (params.get("lang") as Lang) ?? "uk";
  const nameFromUrl = params.get("name") ?? "";

  const [name, setName] = useState(nameFromUrl);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("lingua-name");
    if (stored && !nameFromUrl) setName(stored);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const greeting = name
    ? lang === "uk" ? `${name}, твій план готовий!` : `${name}, your plan is ready!`
    : lang === "uk" ? "Твій план готовий!" : "Your plan is ready!";

  const whatNext = lang === "uk"
    ? [
        { icon: "🧠", title: "Персональний AI-наставник", desc: "Налаштований під твій стиль, цілі та рівень" },
        { icon: "💬", title: "Перша розмова вже чекає", desc: "Тема підібрана на основі твоїх відповідей" },
        { icon: "📈", title: "Твій рівень буде оцінено", desc: "Зважаючи на твої відповіді ми оцінимо рівень і складемо план" },
      ]
    : [
        { icon: "🧠", title: "Personal AI tutor", desc: "Tuned to your style, goals and level" },
        { icon: "💬", title: "First conversation is ready", desc: "Topic chosen based on your answers" },
        { icon: "📈", title: "Your level will be assessed", desc: "Based on your answers we'll assess your level and build a plan" },
      ];

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        fontFamily: "var(--font-body)",
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          textAlign: "center",
        }}
      >
        {/* Badge */}
        <div className="animate-bounce-in">
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "linear-gradient(135deg, var(--lavender-soft), var(--mint-soft))",
              border: "1.5px solid var(--lavender)",
              borderRadius: "var(--radius-pill)",
              padding: "8px 20px",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "0.9rem",
              color: "var(--primary)",
              letterSpacing: "0.01em",
            }}
          >
            ✦ {lang === "uk" ? "Аналіз завершено" : "Analysis complete"}
          </span>
        </div>

        {/* Heading */}
        <div className="animate-fade-in-up" style={{ animationDelay: "60ms" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(1.5rem, 5vw, 2rem)",
              lineHeight: 1.25,
              color: "var(--text)",
              marginBottom: 10,
            }}
          >
            {greeting}
          </h1>
          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "var(--text-muted)",
              maxWidth: 380,
              margin: "0 auto",
            }}
          >
            {t(UI.successSubtitle, lang)}
          </p>
        </div>

        {/* What's next cards */}
        <div
          className="animate-fade-in-up"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            animationDelay: "120ms",
          }}
        >
          {whatNext.map(({ icon, title, desc }) => (
            <div
              key={title}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                background: "var(--bg-card)",
                border: "1.5px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                padding: "14px 18px",
                textAlign: "left",
              }}
            >
              <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{icon}</span>
              <div>
                <p style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--text)", marginBottom: 2 }}>
                  {title}
                </p>
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          className="btn-primary animate-fade-in-up"
          style={{ fontSize: "1rem", padding: "14px 36px", width: "100%", animationDelay: "200ms" }}
          onClick={() => {}}
        >
          {t(UI.successCta, lang)}
        </button>

        {/* Note */}
        <p
          className="animate-fade-in"
          style={{
            fontSize: "0.78rem",
            color: "var(--text-light)",
            animationDelay: "260ms",
          }}
        >
          {t(UI.successNote, lang)}
        </p>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
