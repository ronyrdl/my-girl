import { motion } from "framer-motion";
import { finalMessage, preFinalMessage } from "../data/memories";

export function FinalMessage() {
  return (
    <motion.div
      className="flex w-full max-w-2xl flex-col items-center gap-7 px-2 text-center"
      initial={{ opacity: 0, y: 34 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span
        aria-hidden
        className="h-px w-12 bg-accent/60"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />

      <p className="font-display text-[clamp(1.05rem,3.4vw,1.6rem)] font-light italic leading-[1.6] text-cream/70 text-balance-r">
        {preFinalMessage}
      </p>

      <span
        aria-hidden
        className="font-sans text-[0.7rem] tracking-[0.6em] text-accent/60"
      >
        —
      </span>

      <p className="whitespace-pre-line font-display text-[clamp(1.5rem,5.6vw,2.6rem)] font-light leading-[1.35] tracking-[0.02em] text-cream text-balance-r">
        {finalMessage}
      </p>
    </motion.div>
  );
}
