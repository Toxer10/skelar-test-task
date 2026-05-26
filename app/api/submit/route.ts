import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { QUESTIONS } from "@/app/lib/quiz-config";
import type { QuizAnswers } from "@/app/lib/types";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? process.env.TELEGRAM_BOT_API_KEY;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID ?? process.env.TELEGRAM_BOT_CHAT_ID;

async function sendTelegram(text: string): Promise<void> {
  if (!BOT_TOKEN) throw new Error("TELEGRAM_BOT_TOKEN is not set");
  if (!CHAT_ID) throw new Error("TELEGRAM_CHAT_ID is not set");

  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: "HTML",
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Telegram API error ${res.status}: ${body}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, answers } = await request.json();

    const typedAnswers = (answers ?? {}) as QuizAnswers;

    const answersText = QUESTIONS.map(entry => {
      const q = typeof entry === "function" ? entry(typedAnswers) : entry;
      const raw = typedAnswers[q.id];
      if (raw === undefined) return null;

      const values = Array.isArray(raw) ? raw : [raw];
      const labels = values.map(v => q.options.find(o => o.value === v)?.label.uk ?? v);

      return `❓ ${q.question.uk}\n    ↳ ${labels.join(", ")}`;
    }).filter(Boolean).join("\n\n");

    const message = [
      `🎯 <b>Новий лід з LinguaAI</b>`,
      ``,
      `👤 <b>Ім'я:</b> ${name ?? "—"}`,
      `📧 <b>Email:</b> ${email ?? "—"}`,
      ``,
      `📋 <b>Відповіді:</b>`,
      answersText,
    ].join("\n");

    await sendTelegram(message);
    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[telegram] POST error:", msg);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function GET() {
  try {
    await sendTelegram("✅ LinguaAI bot is alive!");
    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
