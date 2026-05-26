"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { track } from "@/app/lib/analytics";
import { QUESTIONS } from "@/app/lib/quiz-config";
import { t, UI } from "@/app/lib/i18n";
import { Lang, QuizAnswers, QuizQuestion as QuizQuestionType, QuizStep } from "@/app/lib/types";

function resolveQuestion(index: number, answers: QuizAnswers): QuizQuestionType {
  const entry = QUESTIONS[index];
  return typeof entry === "function" ? entry(answers) : entry;
}
import StepCounter from "./ConfidenceBar";
import QuizQuestion from "./QuizQuestion";
import AnalysisScreen from "./AnalysisScreen";
import EmailCapture from "./EmailCapture";

interface QuizShellProps {
  initialLang: Lang;
  initialDark: boolean;
}

export default function QuizShell({ initialLang, initialDark }: QuizShellProps) {
  const router = useRouter();

  const [lang, setLang] = useState<Lang>(initialLang);
  const [dark, setDark] = useState(initialDark);
  const [step, setStep] = useState<QuizStep>({ kind: "question", index: 0 });
  const [answers, setAnswers] = useState<QuizAnswers>({});

  useEffect(() => {
    track("quiz_start", { lang: initialLang });
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

  const handleBack = () => {
    if (step.kind !== "question" || step.index === 0) return;
    const currentQ = resolveQuestion(step.index, answers);
    track("quiz_back", { questionId: currentQ.id, stepIndex: step.index + 1 });
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQ.id];
      return next;
    });
    setStep({ kind: "question", index: step.index - 1 });
  };

  const handleAnswer = (values: string[]) => {
    const q = resolveQuestion((step as { kind: "question"; index: number }).index, answers);
    const stored = q.type === "single" ? values[0] : values;
    setAnswers((prev) => ({ ...prev, [q.id]: stored }));

    track("quiz_answer", {
      questionId: q.id,
      stepIndex: (step as { kind: "question"; index: number }).index + 1,
      type: q.type,
      value: stored,
    });

    const nextIndex = (step as { kind: "question"; index: number }).index + 1;
    if (nextIndex < QUESTIONS.length) {
      setStep({ kind: "question", index: nextIndex });
    } else {
      track("quiz_complete");
      setStep({ kind: "analysis" });
    }
  };

  const handleAnalysisDone = () => {
    setStep({ kind: "email" });
  };

  const handleEmailSuccess = (name: string) => {
    router.push(`/success?name=${encodeURIComponent(name)}&lang=${lang}`);
  };


  const currentIndex = step.kind === "question" ? step.index : -1;
  const currentQ = currentIndex >= 0 ? resolveQuestion(currentIndex, answers) : null;

  const storedAnswer = currentQ ? answers[currentQ.id] : undefined;
  const initialSelected = storedAnswer
    ? Array.isArray(storedAnswer)
      ? storedAnswer
      : [storedAnswer]
    : [];

  const canGoBack = step.kind === "question" && step.index > 0;

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
          zIndex: 20,
          background: "var(--bg)",
          borderBottom: "1px solid var(--border)",
          padding: "10px 16px",
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            maxWidth: 560,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {/* Nav row */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {canGoBack ? (
              <button
                onClick={handleBack}
                className="btn-ghost"
                style={{ padding: "6px 10px", fontSize: "0.85rem" }}
                aria-label="Back"
              >
                ← {t(UI.back, lang)}
              </button>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--lavender), var(--primary))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                  }}
                >
                  🧠
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "1rem",
                    color: "var(--text)",
                  }}
                >
                  LinguaAI
                </span>
              </div>
            )}

            <div style={{ flex: 1 }} />

            <button
              onClick={toggleLang}
              className="btn-ghost"
              aria-label="Switch language"
              style={{ fontSize: "0.82rem", fontWeight: 700, padding: "6px 10px" }}
            >
              {lang === "uk" ? "🇺🇦 UA" : "🇬🇧 EN"}
            </button>
            <button
              onClick={toggleTheme}
              className="btn-ghost"
              aria-label="Toggle theme"
              style={{ fontSize: "1rem", padding: "6px 10px" }}
            >
              {dark ? "☀️" : "🌙"}
            </button>
          </div>

          <StepCounter
            current={step.kind === "question" ? step.index + 1 : QUESTIONS.length}
            total={QUESTIONS.length}
          />
        </div>
      </div>

      {/* Main content */}
      <main className="quiz-main">
        <div className="card quiz-card-body">
          {step.kind === "question" && currentQ && (
            <QuizQuestion
              key={currentQ.id}
              question={currentQ}
              lang={lang}
              initialSelected={initialSelected}
              onAnswer={handleAnswer}
            />
          )}

          {step.kind === "analysis" && (
            <AnalysisScreen lang={lang} onComplete={handleAnalysisDone} />
          )}

          {step.kind === "email" && (
            <EmailCapture
              lang={lang}
              answers={answers}
              onSuccess={handleEmailSuccess}
            />
          )}
        </div>
      </main>
    </div>
  );
}
