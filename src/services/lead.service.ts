import type { LeadFormValues } from "@/lib/validations/lead";

/**
 * Frontend-only stub: validates and "submits" a lead locally.
 * Swap the body for a real API/CRM/Telegram-bot call before going to production.
 */
export async function submitLead(values: LeadFormValues): Promise<{ ok: true }> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.info("[lead:submit]", values);
  }
  return { ok: true };
}
