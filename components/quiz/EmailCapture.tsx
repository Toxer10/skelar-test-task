"use client";

import { useState } from "react";
import { t, UI } from "@/app/lib/i18n";
import { Lang, QuizAnswers } from "@/app/lib/types";
import { track } from "@/app/lib/analytics";

interface EmailCaptureProps {
  lang: Lang;
  answers: QuizAnswers;
  onSuccess: (name: string) => void;
}

const isValidEmail = (v: string) =>
  /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(v.trim());

export default function EmailCapture({
  lang,
  answers,
  onSuccess,
}: EmailCaptureProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const nameError = submitted && !name.trim()
    ? (lang === "uk"
        ? "Будь ласка, розкажи нам, як тебе звати"
        : "We'd love to know your name — mind sharing?")
    : null;

  const emailError = submitted
    ? !email.trim()
      ? (lang === "uk"
          ? "Нам потрібна твоя адреса, щоб надіслати доступ"
          : "We'll need your email to send you access")
      : !isValidEmail(email)
        ? (lang === "uk"
            ? "Схоже, в адресі є помилка — зазирни ще раз"
            : "Hmm, something's off — mind double-checking the email?")
        : null
    : null;

  const isValid = name.trim().length > 0 && isValidEmail(email);
  const buttonDisabled = (submitted && !isValid) || loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setSubmitted(true);
    if (!isValid) return;

    track("email_submit");
    setLoading(true);
    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), answers, lang }),
      });
    } catch {
      // non-blocking — navigate to success regardless
    }

    localStorage.setItem("lingua-name", name.trim());
    onSuccess(name.trim());
  };

  return (
    <div
      className="animate-scale-in"
      style={{ display: "flex", flexDirection: "column", gap: 24 }}
    >
      {/* Header */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{ fontSize: "2.8rem", marginBottom: 16, lineHeight: 1 }}
          className="animate-bounce-in"
        >
          🎉
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "1.4rem",
            color: "var(--text)",
            marginBottom: 8,
          }}
        >
          {t(UI.emailTitle, lang)}
        </h2>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.65 }}>
          {t(UI.emailSubtitle, lang)}
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        noValidate
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        <div className="animate-fade-in-up" style={{ animationDelay: "60ms" }}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t(UI.emailNamePlaceholder, lang)}
            className="input-field"
            style={nameError ? { borderColor: "var(--peach)", boxShadow: "0 0 0 3px rgba(252,165,165,0.2)" } : undefined}
            autoComplete="given-name"
            autoFocus
          />
          {nameError && (
            <p style={{ fontSize: "0.78rem", color: "#ef4444", marginTop: 4, paddingLeft: 4, fontWeight: 600 }}>
              {nameError}
            </p>
          )}
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "120ms" }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t(UI.emailPlaceholder, lang)}
            className="input-field"
            style={emailError ? { borderColor: "var(--peach)", boxShadow: "0 0 0 3px rgba(252,165,165,0.2)" } : undefined}
            autoComplete="email"
          />
          {emailError && (
            <p style={{ fontSize: "0.78rem", color: "#ef4444", marginTop: 4, paddingLeft: 4, fontWeight: 600 }}>
              {emailError}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={buttonDisabled}
          className="btn-primary animate-fade-in-up"
          style={{ marginTop: 8, fontSize: "1rem", padding: "15px 28px", animationDelay: "180ms" }}
        >
          {loading ? (
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", gap: 4 }}>
                <div className="typing-dot" style={{ background: "#fff" }} />
                <div className="typing-dot" style={{ background: "#fff" }} />
                <div className="typing-dot" style={{ background: "#fff" }} />
              </div>
            </span>
          ) : (
            t(UI.emailCta, lang)
          )}
        </button>
      </form>

      <p
        style={{
          textAlign: "center",
          fontSize: "0.78rem",
          color: "var(--text-light)",
          animationDelay: "240ms",
        }}
        className="animate-fade-in"
      >
        🔒 {t(UI.emailPrivacy, lang)}
      </p>
    </div>
  );
}
