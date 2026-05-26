"use client";

import { useEffect, useState } from "react";
import { Lang } from "@/app/lib/types";
import QuizShell from "@/components/quiz/QuizShell";

export default function QuizPage() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<Lang>("uk");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("lingua-lang") as Lang | null;
    if (savedLang === "uk" || savedLang === "en") setLang(savedLang);
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <QuizShell initialLang={lang} initialDark={dark} />;
}
