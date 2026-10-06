import { Fragment } from "react";
import { motion } from "framer-motion";
import { AmbientGlow } from "./Atmosphere";
import { introButton, introText } from "../data/memories";

export function Intro({ onStart }: { onStart: () => void }) {
  return (
    <motion.section
      className="fixed inset-0 z-30 flex flex-col items-center justify-center overflow-hidden bg-ink px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: "blur(14px)" }}
      transition={{ duration: 1.15, ease: [0.65, 0, 0.35, 1] }}
    >
      <AmbientGlow className="soft-breathe opacity-60" />

      <div className="relative flex flex-col items-center">
        <motion.div
          aria-hidden
          className="mb-10 h-px w-10 bg-accent/70"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />

        <h1 className="text-center font-display text-[clamp(2rem,8vw,3.6rem)] font-light italic leading-[1.15] tracking-[0.01em] text-cream">
          {introText.split(" ").map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: "0.4em", filter: "blur(14px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 1.5,
                  delay: 0.7 + index * 0.34,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>{" "}
            </Fragment>
          ))}
        </h1>

        <motion.p
          className="mt-6 text-center font-sans text-[0.62rem] uppercase tracking-[0.52em] text-cream/35"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 2.1 }}
        >
          tómate tu tiempo
        </motion.p>

        <motion.button
          type="button"
          onClick={onStart}
          className="group relative mt-14 rounded-full border border-cream/20 px-11 py-3.5 font-sans text-[0.68rem] uppercase tracking-[0.42em] text-cream/75 backdrop-blur-sm transition-all duration-700 hover:border-accent/70 hover:bg-cream/[0.06] hover:text-cream focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-accent/70"
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative z-10">{introButton}</span>
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-accent/10 opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100"
          />
        </motion.button>
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-8 left-1/2 h-24 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cream/25 to-transparent"
        initial={{ opacity: 0, scaleY: 0.4 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.8, delay: 3.4 }}
      />
    </motion.section>
  );
}
