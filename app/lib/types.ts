export type Lang = "uk" | "en";

export interface LocalizedString {
  uk: string;
  en: string;
}

export type QuestionType = "single" | "multi";

export interface QuizOption {
  id: string;
  emoji: string;
  label: LocalizedString;
  value: string;
}

export interface Reaction {
  message: LocalizedString;
  stat?: LocalizedString;
}

export interface QuizQuestion {
  id: number;
  type: QuestionType;
  maxSelections?: number;
  question: LocalizedString;
  subtitle?: LocalizedString;
  options: QuizOption[];
  aiReaction?: (selectedValues: string[]) => Reaction;
}

export interface QuizAnswers {
  [questionId: number]: string | string[];
}

export type QuizEntry = QuizQuestion | ((answers: QuizAnswers) => QuizQuestion);

export type QuizStep =
  | { kind: "intro" }
  | { kind: "question"; index: number }
  | { kind: "analysis" }
  | { kind: "email" };

export interface QuizState {
  step: QuizStep;
  answers: QuizAnswers;
  lang: Lang;
  aiMessage: LocalizedString | null;
}
