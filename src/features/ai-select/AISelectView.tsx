"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Questionnaire } from "./Questionnaire";
import { ResultsTop5 } from "./ResultsTop5";
import { recommendDoors, type QuizAnswers, type Recommendation } from "@/services/ai-recommend.service";

type Phase = "quiz" | "analyzing" | "results";

const ANALYSIS_STEPS = [
  "Сопоставляем стиль интерьера с коллекциями…",
  "Проверяем совместимость с освещением помещения…",
  "Ранжируем модели по бюджету…",
  "Формируем объяснение подбора…",
];

export function AISelectView() {
  const [phase, setPhase] = useState<Phase>("quiz");
  const [results, setResults] = useState<Recommendation[]>([]);

  function handleComplete(answers: QuizAnswers) {
    setPhase("analyzing");
    setTimeout(() => {
      setResults(recommendDoors(answers));
      setPhase("results");
    }, 1900);
  }

  return (
    <AnimatePresence mode="wait">
      {phase === "quiz" && (
        <motion.div key="quiz" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <Questionnaire onComplete={handleComplete} />
        </motion.div>
      )}
      {phase === "analyzing" && (
        <motion.div
          key="analyzing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mx-auto flex max-w-[440px] flex-col items-center py-16 text-center"
        >
          <div className="relative mb-8 grid h-20 w-20 place-items-center rounded-full border border-line bg-white shadow-[var(--shadow-md)]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent"
            />
            <Sparkles size={24} className="text-accent-dim" />
          </div>
          <h2 className="font-display text-[20px] text-graphite">Анализируем ваш интерьер</h2>
          <div className="mt-5 flex flex-col gap-2">
            {ANALYSIS_STEPS.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0.25 }}
                animate={{ opacity: [0.25, 1, 0.25] }}
                transition={{ duration: 1.9, delay: i * 0.4, repeat: Infinity }}
                className="text-[13.5px] text-graphite-soft"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
      {phase === "results" && (
        <motion.div key="results" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <ResultsTop5 results={results} onRestart={() => setPhase("quiz")} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
