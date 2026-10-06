import { motion } from "framer-motion";
import { Words } from "./Words";

type Props = {
  text: string;
  tone?: "quiet" | "large";
};

export function Transition({ text, tone = "large" }: Props) {
  const isLarge = tone === "large";

  return (
    <section
      className="relative flex min-h-[92svh] w-full items-center justify-center overflow-hidden px-6 py-32"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,124,0.09) 0%, transparent 60%)",
        }}
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative flex max-w-4xl flex-col items-center gap-8 text-center">
        <motion.span
          aria-hidden
          className="h-px w-8 bg-accent/60"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />

        <p
          className={
            isLarge
              ? "font-display text-[clamp(1.55rem,5.4vw,3.2rem)] font-light italic leading-[1.28] text-cream/90 text-balance-r"
              : "font-display text-[clamp(1.1rem,3.4vw,1.7rem)] font-light italic leading-[1.6] text-cream/55 text-balance-r"
          }
        >
          <Words text={text} stagger={isLarge ? 0.16 : 0.12} duration={1.5} />
        </p>

        <motion.span
          aria-hidden
          className="h-px w-8 bg-accent/40"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </section>
  );
}
