import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { Memory as MemoryData } from "../data/memories";
import { PhotoMemory } from "./PhotoMemory";
import { VideoMemory } from "./VideoMemory";
import { AmbientGlow } from "./Atmosphere";

type Props = {
  memory: MemoryData;
  onActive?: (id: number) => void;
};

const pad = (id: number) => String(id).padStart(2, "0");

export function Memory({ memory, onActive }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(sectionRef, { amount: 0.45, once: false });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxRange = memory.layout === "full" ? "4%" : "1.8%";
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [reduce ? "0%" : `-${parallaxRange}`, reduce ? "0%" : parallaxRange],
  );

  useEffect(() => {
    if (inView) onActive?.(memory.id);
  }, [inView, memory.id, onActive]);

  const label = memory.text || `Recuerdo ${memory.id}`;

  const isFull = memory.layout === "full";
  const poster = `/media/posters/${memory.id}.jpg`;
  const mediaClass = isFull
    ? "h-full w-full object-cover md:w-auto md:max-w-full"
    : "h-full w-full object-cover";

  const media =
    memory.type === "image" ? (
      <PhotoMemory src={memory.src} alt={label} className={mediaClass} />
    ) : (
      <VideoMemory
        src={memory.src}
        alt={label}
        poster={poster}
        className={mediaClass}
      />
    );

  const number = (
    <span className="font-sans text-[0.6rem] uppercase tracking-[0.45em] text-accent/70">
      {pad(memory.id)}
    </span>
  );

  const caption = memory.text ? (
    <motion.div
      className="flex flex-col gap-4"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <span aria-hidden className="h-px w-8 bg-accent/60" />
      <p className="max-w-[30ch] font-display text-[clamp(1.05rem,3.4vw,1.45rem)] font-light italic leading-[1.5] text-cream/75">
        {memory.text}
      </p>
    </motion.div>
  ) : null;

  if (memory.layout === "full") {
    return (
      <section
        ref={sectionRef}
        className="relative h-[100svh] min-h-[540px] w-full overflow-hidden"
      >
        <motion.div
          style={{ y }}
          className="absolute inset-[-6%] will-change-transform"
        >
          <div className="relative h-full w-full overflow-hidden">
            <div aria-hidden className="absolute inset-0 hidden md:block">
              <img
                src={memory.type === "image" ? memory.src : poster}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full scale-110 object-cover opacity-60 blur-2xl"
              />
            </div>
            <div className="relative flex h-full w-full items-center justify-center">
              {media}
            </div>
          </div>
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_36%,rgba(7,8,10,0.7)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/75 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-5 px-6">
          {caption}
          {number}
        </div>
      </section>
    );
  }

  if (memory.layout === "cinema") {
    return (
      <section
        ref={sectionRef}
        className="relative flex h-[100svh] min-h-[540px] w-full flex-col items-center justify-center overflow-hidden bg-ink"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-ink to-transparent" />
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[14svh] h-px w-[min(88vw,860px)] -translate-x-1/2 bg-cream/10"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-[14svh] left-1/2 h-px w-[min(88vw,860px)] -translate-x-1/2 bg-cream/10"
        />
        <motion.div
          style={{ y }}
          className="relative aspect-[9/16] h-[min(70svh,680px)] w-auto overflow-hidden ring-1 ring-cream/10 will-change-transform"
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {media}
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_40px_rgba(7,8,10,0.55)]" />
        </motion.div>
        <div className="pointer-events-none absolute bottom-[7svh] left-1/2 -translate-x-1/2">
          {number}
        </div>
      </section>
    );
  }

  if (memory.layout === "hero") {
    return (
      <section
        ref={sectionRef}
        className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-6 py-24"
      >
        <AmbientGlow
          className="soft-breathe opacity-50"
          color="rgba(201,168,124,0.13)"
        />
        <div className="relative flex flex-col items-center gap-9">
          <motion.div
            style={{ y }}
            className="relative aspect-[9/16] h-[min(74svh,700px)] w-auto overflow-hidden rounded-[1.9rem] ring-1 ring-cream/12 shadow-[0_60px_140px_-45px_rgba(0,0,0,1)] will-change-transform"
            initial={{ opacity: 0, scale: 1.06, filter: "blur(16px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          >
            {media}
          </motion.div>
          <div className="flex flex-col items-center gap-4 text-center">
            {number}
            {caption}
          </div>
        </div>
      </section>
    );
  }

  const isRight = memory.layout === "offset-right";

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden px-6 py-24 md:px-[7vw]"
    >
      <div
        className={`mx-auto flex w-full max-w-6xl flex-col items-center gap-12 md:flex-row md:items-center md:gap-20 ${
          isRight ? "md:flex-row-reverse" : ""
        }`}
      >
        <motion.div
          style={{ y }}
          className="relative aspect-[9/16] h-[min(62svh,560px)] w-auto shrink-0 overflow-hidden rounded-[1.5rem] ring-1 ring-cream/10 shadow-[0_45px_110px_-40px_rgba(0,0,0,0.95)] will-change-transform"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {media}
        </motion.div>

        <motion.div
          className={`flex w-full flex-col gap-6 md:w-[46%] ${
            isRight ? "md:items-start" : "md:items-end"
          }`}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className={`flex flex-col gap-5 ${
              isRight ? "items-start text-left" : "items-end text-right"
            }`}
          >
            {number}
            {caption}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
