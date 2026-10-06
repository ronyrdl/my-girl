import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
} from "framer-motion";
import { interludes, memories } from "../data/memories";
import { Memory } from "./Memory";
import { Transition } from "./Transition";

type Props = {
  onStoryEnd: () => void;
};

const pad = (id: number) => String(id).padStart(2, "0");

export function Story({ onStoryEnd }: Props) {
  const { scrollYProgress } = useScroll();
  const endRef = useRef<HTMLDivElement>(null);
  const endInView = useInView(endRef, { amount: 0.6, once: true });
  const [active, setActive] = useState(1);
  const fired = useRef(false);

  const handleActive = useCallback((id: number) => {
    setActive(id);
  }, []);

  useEffect(() => {
    if (endInView && !fired.current) {
      fired.current = true;
      const timer = window.setTimeout(onStoryEnd, 650);
      return () => window.clearTimeout(timer);
    }
  }, [endInView, onStoryEnd]);

  return (
    <motion.div
      className="relative w-full bg-ink"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
    >
      <motion.div
        aria-hidden
        className="fixed left-0 top-0 z-40 h-px w-full origin-left bg-accent/50"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="pointer-events-none fixed bottom-6 right-5 z-40 flex items-baseline gap-1.5 font-sans text-[0.6rem] uppercase tracking-[0.35em] text-cream/35 md:right-8">
        <AnimatePresence mode="wait">
          <motion.span
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5 }}
            className="text-accent/80"
          >
            {pad(active)}
          </motion.span>
        </AnimatePresence>
        <span className="text-cream/20">/ 12</span>
      </div>

      {interludes
        .filter((item) => item.after === 0)
        .map((item) => (
          <Transition key={`phrase-${item.after}`} text={item.text} tone={item.tone} />
        ))}

      {memories.map((memory) => (
        <div key={memory.id}>
          <Memory memory={memory} onActive={handleActive} />
          {interludes
            .filter((item) => item.after === memory.id)
            .map((item) => (
              <Transition
                key={`phrase-${item.after}`}
                text={item.text}
                tone={item.tone}
              />
            ))}
        </div>
      ))}

      <section
        aria-hidden
        className="relative flex h-[70svh] items-center justify-center"
      >
        <motion.p
          className="font-display text-[clamp(1rem,3vw,1.35rem)] font-light italic tracking-[0.4em] text-cream/25"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
        >
          fin.
        </motion.p>
      </section>
      <div ref={endRef} className="h-[60svh]" aria-hidden />
    </motion.div>
  );
}
