"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lang } from "@/app/lib/types";
import { UI, t } from "@/app/lib/i18n";

export default function LandingPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("uk");
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("lingua-lang") as Lang | null;
    if (saved === "uk" || saved === "en") setLang(saved);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("lingua-theme", next ? "dark" : "light");
  };

  const toggleLang = () => {
    const next: Lang = lang === "uk" ? "en" : "uk";
    setLang(next);
    localStorage.setItem("lingua-lang", next);
  };

  const handleStart = () => {
    localStorage.setItem("lingua-lang", lang);
    router.push("/quiz");
  };

  if (!mounted) return null;

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          zIndex: 10,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #60a5fa, var(--primary))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            🌍
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "1.1rem",
              color: "var(--text)",
            }}
          >
            LinguaAI
          </span>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={toggleLang}
            className="btn-ghost"
            aria-label="Switch language"
            style={{ fontSize: "0.85rem", fontWeight: 700 }}
          >
            {lang === "uk" ? "🇺🇦 UA" : "🇬🇧 EN"}
          </button>
          <button
            onClick={toggleTheme}
            className="btn-ghost"
            aria-label="Toggle theme"
            style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              border: "1.5px solid var(--border)",
            }}
          >
            {t(dark ? UI.themeLight : UI.themeDark, lang)}
          </button>
        </div>
      </div>

      {/* Hero */}
      <div
        style={{
          maxWidth: 520,
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        {/* ── Section 1: main message ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            width: "100%",
            paddingBottom: 36,
          }}
        >
          {/* Badge */}
          <div className="badge badge-lavender animate-fade-in-down">
            {t(UI.landingBadge, lang)}
          </div>

          {/* Title */}
          <h1
            className="animate-fade-in-up"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(2rem, 6vw, 3rem)",
              lineHeight: 1.15,
              color: "var(--text)",
              whiteSpace: "pre-line",
              animationDelay: "60ms",
            }}
          >
            {t(UI.landingTitle, lang)}
          </h1>

          {/* Subtitle */}
          <p
            className="animate-fade-in-up"
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.65,
              color: "var(--text-muted)",
              maxWidth: 420,
              animationDelay: "120ms",
            }}
          >
            {t(UI.landingSubtitle, lang)}
          </p>

          {/* CTA Button */}
          <button
            onClick={handleStart}
            className="btn-primary animate-fade-in-up"
            style={{
              fontSize: "1.05rem",
              padding: "16px 36px",
              animationDelay: "180ms",
            }}
          >
            {t(UI.landingCta, lang)}
          </button>
        </div>

        {/* Divider */}
        <div
          className="animate-fade-in"
          style={{
            width: "100%",
            height: 1,
            background: "var(--border)",
            animationDelay: "260ms",
          }}
        />

        {/* ── Section 2: trust signals ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            width: "100%",
            paddingTop: 28,
          }}
        >
          {/* Social proof */}
          <div
            className="animate-fade-in"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              animationDelay: "300ms",
            }}
          >
            <div style={{ display: "flex" }}>
              {[
                { initials: "OB", bg: "#dbeafe", color: "#1e40af" },
                { initials: "MK", bg: "#dcfce7", color: "#166534" },
                { initials: "SL", bg: "#fce7f3", color: "#9d174d" },
                { initials: "AD", bg: "#fef3c7", color: "#92400e" },
              ].map(({ initials, bg, color }, i) => (
                <div
                  key={i}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: bg,
                    border: "2px solid var(--bg)",
                    marginLeft: i === 0 ? 0 : -10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 800,
                    color: color,
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.01em",
                    flexShrink: 0,
                  }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <span
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--text-muted)",
              }}
            >
              {t(UI.landingNote, lang)}
            </span>
          </div>

          {/* Feature pills */}
          <div
            className="animate-fade-in"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              justifyContent: "center",
              animationDelay: "360ms",
            }}
          >
            {[
              { uk: "✅ Без страху помилок", en: "✅ No fear of mistakes" },
              { uk: "⚡ 5 хвилин на день", en: "⚡ 5 minutes a day" },
              { uk: "🎯 Персональний план", en: "🎯 Personal plan" },
            ].map((pill, i) => (
              <span
                key={i}
                style={{
                  padding: "6px 14px",
                  borderRadius: "var(--radius-pill)",
                  background: "var(--bg-card)",
                  border: "1.5px solid var(--border)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                }}
              >
                {t(pill, lang)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
