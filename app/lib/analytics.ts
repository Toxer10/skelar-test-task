type EventName =
  | "quiz_start"
  | "quiz_answer"
  | "quiz_back"
  | "quiz_complete"
  | "email_submit";

type EventProperties = Record<string, unknown>;

export function track(event: EventName, properties: EventProperties = {}) {
  const payload = {
    event,
    ts: new Date().toISOString(),
    ...properties,
  };

  console.log(`[Analytics] ${event}`, payload);
}
