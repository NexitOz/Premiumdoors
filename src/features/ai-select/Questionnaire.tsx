"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { STYLE_OPTIONS, ROOM_OPTIONS, LIGHT_OPTIONS, COLOR_OPTIONS, BUDGET_OPTIONS } from "./questions";
import type { QuizAnswers } from "@/services/ai-recommend.service";

interface QuestionnaireProps {
  onComplete: (answers: QuizAnswers) => void;
}

type PartialAnswers = Partial<QuizAnswers>;

const TOTAL_STEPS = 5;

export function Questionnaire({ onComplete }: QuestionnaireProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<PartialAnswers>({});

  function next(patch: PartialAnswers) {
    const updated = { ...answers, ...patch };
    setAnswers(updated);
    if (step + 1 >= TOTAL_STEPS) {
      onComplete(updated as QuizAnswers);
    } else {
      setStep(step + 1);
    }
  }

  return (
    <div className="mx-auto max-w-[640px]">
      <div className="mb-8 flex items-center gap-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-graphite" : "bg-mist-3"}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.4, ease: [0.22, 0.9, 0.32, 1] }}
        >
          {step === 0 && (
            <QuestionStep
              title="Какой стиль ближе вашему интерьеру?"
              options={STYLE_OPTIONS.map((o) => ({ id: o.id, label: o.label, hint: o.hint }))}
              onSelect={(id) => next({ style: id as QuizAnswers["style"] })}
            />
          )}
          {step === 1 && (
            <QuestionStep
              title="В каком помещении устанавливаете дверь?"
              options={ROOM_OPTIONS}
              onSelect={(id) => next({ room: id as QuizAnswers["room"] })}
            />
          )}
          {step === 2 && (
            <QuestionStep
              title="Сколько естественного света в комнате?"
              options={LIGHT_OPTIONS.map((o) => ({ id: o.id, label: o.label, hint: o.hint }))}
              onSelect={(id) => next({ light: id as QuizAnswers["light"] })}
            />
          )}
          {step === 3 && (
            <QuestionStep
              title="Какая цветовая гамма вам ближе?"
              options={COLOR_OPTIONS}
              onSelect={(id) => next({ colorPref: id as QuizAnswers["colorPref"] })}
            />
          )}
          {step === 4 && (
            <QuestionStep
              title="Какой бюджет на полотно?"
              options={BUDGET_OPTIONS}
              onSelect={(id) => {
                const opt = BUDGET_OPTIONS.find((b) => b.id === id)!;
                next({ budget: opt.range });
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          className="mt-8 inline-flex items-center gap-1.5 font-sans text-[13.5px] font-semibold text-graphite-soft hover:text-graphite"
        >
          <ArrowLeft size={15} /> Назад
        </button>
      )}
    </div>
  );
}

function QuestionStep({
  title,
  options,
  onSelect,
}: {
  title: string;
  options: { id: string; label: string; hint?: string }[];
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2.5 font-mono text-[11.5px] uppercase tracking-[0.16em] text-accent-dim">
        <Sparkles size={14} /> ИИ-подбор
      </div>
      <h2 className="mb-8 font-display text-[26px] leading-snug text-graphite">{title}</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-white p-5 text-left shadow-[var(--shadow-xs)] transition-all hover:-translate-y-0.5 hover:border-graphite hover:shadow-[var(--shadow-md)]"
          >
            <div>
              <div className="font-display text-[15.5px] text-graphite">{opt.label}</div>
              {opt.hint && <div className="mt-1 text-[12.5px] text-graphite-faint">{opt.hint}</div>}
            </div>
            <ArrowRight size={16} className="shrink-0 text-graphite-faint transition-transform group-hover:translate-x-1 group-hover:text-graphite" />
          </button>
        ))}
      </div>
    </div>
  );
}
