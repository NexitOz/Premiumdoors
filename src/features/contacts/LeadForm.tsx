"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { leadSchema, type LeadFormValues } from "@/lib/validations/lead";
import { submitLead } from "@/services/lead.service";
import { cn } from "@/lib/utils";

export function LeadForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", phone: "", email: "", message: "", consent: undefined },
  });

  async function onSubmit(values: LeadFormValues) {
    await submitLead(values);
    setStatus("success");
    reset();
    setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <div className="rounded-3xl border border-line bg-white p-7 shadow-[var(--shadow-md)] md:p-9">
      <h3 className="font-display text-[20px] text-graphite">Оставить заявку на замер</h3>
      <p className="mt-2 text-[14px] text-graphite-soft">Ответим в течение рабочего дня, замер — бесплатно.</p>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-8 flex flex-col items-center gap-3 rounded-2xl bg-mist py-12 text-center"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-graphite text-white">
              <Check size={20} />
            </span>
            <p className="font-display text-[16px] text-graphite">Заявка отправлена</p>
            <p className="max-w-[280px] text-[13.5px] text-graphite-soft">Свяжемся с вами в ближайшее время.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col gap-4"
            noValidate
          >
            <Field label="Имя" error={errors.name?.message}>
              <input {...register("name")} className={inputClass(!!errors.name)} placeholder="Как к вам обращаться" />
            </Field>
            <Field label="Телефон" error={errors.phone?.message}>
              <input {...register("phone")} className={inputClass(!!errors.phone)} placeholder="+7 (___) ___-__-__" />
            </Field>
            <Field label="Email (необязательно)" error={errors.email?.message}>
              <input {...register("email")} className={inputClass(!!errors.email)} placeholder="mail@example.com" />
            </Field>
            <Field label="Комментарий" error={errors.message?.message}>
              <textarea
                {...register("message")}
                rows={3}
                className={cn(inputClass(!!errors.message), "resize-none")}
                placeholder="Какая модель интересует, размеры проёма…"
              />
            </Field>

            <label className="flex items-start gap-2.5 text-[12.5px] leading-snug text-graphite-soft">
              <input type="checkbox" {...register("consent")} className="mt-0.5 h-4 w-4 shrink-0 accent-graphite" />
              Согласен на обработку персональных данных в соответствии с политикой конфиденциальности
            </label>
            {errors.consent && <p className="-mt-2 text-[12px] text-red-600">{errors.consent.message}</p>}

            <Button type="submit" size="lg" disabled={isSubmitting} className="mt-2 w-full">
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Отправляем…
                </>
              ) : (
                "Отправить заявку"
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-mist px-4 py-3 text-[14px] text-graphite placeholder:text-graphite-faint transition-colors focus:outline-none",
    hasError ? "border-red-400" : "border-line focus:border-graphite"
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.12em] text-graphite-faint">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-[12px] text-red-600">{error}</p>}
    </div>
  );
}
