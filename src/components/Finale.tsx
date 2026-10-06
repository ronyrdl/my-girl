import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  interludeLine,
  specialLine1,
  specialLine2,
  specialSrc,
} from "../data/memories";
import { SpecialReveal } from "./SpecialReveal";
import { FinalMessage } from "./FinalMessage";

const schedule = [
  { at: 1300, step: 1 },
  { at: 4900, step: 2 },
  { at: 7700, step: 3 },
  { at: 10900, step: 4 },
  { at: 14400, step: 5 },
] as const;

const lines: Record<number, string> = {
  1: interludeLine,
  2: specialLine1,
  3: specialLine2,
};

export function Finale() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = schedule.map(({ at, step: next }) =>
      window.setTimeout(() => setStep(next), at),
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const showLines = step >= 1 && step <= 3;

  return (
    <motion.div
      className="fixed inset-0 z-[45] overflow-x-hidden overflow-y-auto bg-ink"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.3, ease: "easeOut" }}
    >
      <div className="flex min-h-full flex-col items-center justify-center gap-14 px-6 py-24">
        <div className="flex min-h-[22svh] w-full items-center justify-center">
          <AnimatePresence mode="wait">
            {showLines && (
              <motion.p
                key={step}
                className="max-w-[18ch] text-center font-display text-[clamp(1.5rem,5.6vw,3rem)] font-light italic leading-[1.3] text-cream/90 text-balance-r"
                initial={{ opacity: 0, y: 22, filter: "blur(16px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, filter: "blur(16px)" }}
                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {lines[step]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {step >= 4 && <SpecialReveal key="reveal" src={specialSrc} />}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 5 && <FinalMessage key="message" />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
