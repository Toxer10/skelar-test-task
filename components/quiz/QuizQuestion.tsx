"use client";

import { useState, useEffect, useRef } from "react";
import { t, UI } from "@/app/lib/i18n";
import { Lang, Reaction, QuizQuestion as QuizQuestionType } from "@/app/lib/types";
import OptionCard from "./OptionCard";

interface QuizQuestionProps {
  question: QuizQuestionType;
  lang: Lang;
  initialSelected?: string[];
  onAnswer: (values: string[]) => void;
}

export default function QuizQuestion({
  question,
  lang,
  initialSelected = [],
  onAnswer,
}: QuizQuestionProps) {
  const [selected, setSelected] = useState<string[]>(initialSelected);
  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [confirming, setConfirming] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const handleToggle = (value: string) => {
    if (question.type === "single") {
      setSelected([value]);
      setReaction(question.aiReaction ? question.aiReaction([value]) : null);
    } else {
      if (confirming) return;
      const max = question.maxSelections ?? 3;
      setSelected((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : prev.length < max
            ? [...prev, value]
            : prev,
      );
      setReaction(null);
    }
  };

  const handleContinue = () => {
    if (question.type === "multi" && question.aiReaction && !confirming) {
      setReaction(question.aiReaction(selected));
      setConfirming(true);
      timerRef.current = setTimeout(() => onAnswer(selected), 1800);
      return;
    }
    onAnswer(selected);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Question header */}
      <div className="animate-fade-in-up">
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(1.05rem, 4vw, 1.35rem)",
            lineHeight: 1.3,
            color: "var(--text)",
            marginBottom: question.subtitle ? 6 : 0,
          }}
        >
          {t(question.question, lang)}
        </h2>
        {question.subtitle && (
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
            {t(question.subtitle, lang)}
          </p>
        )}
        {question.type === "multi" && (
          <p style={{ fontSize: "0.78rem", color: "var(--text-light)", marginTop: 6 }}>
            {t(UI.selectMultiple, lang)}
            {selected.length > 0 && (
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>
                {" "}· {selected.length} {t(UI.selectedCount, lang)}
              </span>
            )}
          </p>
        )}
      </div>

      {/* Options */}
      <div className="stagger" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {question.options.map((opt) => (
          <div key={opt.id} className="animate-fade-in-up">
            <OptionCard
              emoji={opt.emoji}
              label={t(opt.label, lang)}
              selected={selected.includes(opt.value)}
              onClick={() => handleToggle(opt.value)}
            />
          </div>
        ))}
      </div>

      {/* Reaction popup */}
      {reaction && (
        <div key={selected.join(",")} className="reaction-popup animate-fade-in-up">
          <p className="reaction-message">{t(reaction.message, lang)}</p>
          {reaction.stat && (
            <p className="reaction-stat">{t(reaction.stat, lang)}</p>
          )}
        </div>
      )}

      {/* Action row */}
      <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
        <button
          onClick={handleContinue}
          disabled={selected.length === 0 || confirming}
          className="btn-primary"
          style={{ flex: 1 }}
        >
          {t(UI.continue, lang)} →
        </button>
      </div>
    </div>
  );
}
