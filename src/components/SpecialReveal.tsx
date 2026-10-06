import { useMemo } from "react";
import { motion } from "framer-motion";

type Props = {
  src: string;
};

export function SpecialReveal({ src }: Props) {
  const particles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, index) => ({
        id: index,
        left: `${(index * 37 + 11) % 100}%`,
        top: `${(index * 53 + 7) % 100}%`,
        size: 1 + (index % 3),
        delay: (index % 8) * 0.7,
        duration: 7 + (index % 5) * 1.7,
      })),
    [],
  );

  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[95vmax] w-[95vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,168,124,0.22) 0%, rgba(201,168,124,0.06) 40%, transparent 68%)",
          }}
          initial={{ opacity: 0, scale: 0.35 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 3.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-accent"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              filter: "blur(0.6px)",
            }}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: [0, 0.75, 0], y: [26, -46] }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.figure
        className="relative aspect-[9/16] h-[min(62svh,600px)] w-auto overflow-hidden rounded-[1.4rem] ring-1 ring-cream/15 shadow-[0_70px_160px_-50px_rgba(0,0,0,1)]"
        initial={{ opacity: 0, scale: 1.16, filter: "blur(28px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 2.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src={src}
          alt="El recuerdo guardado para ti"
          draggable={false}
          className="h-full w-full select-none object-cover"
          initial={{ scale: 1.22 }}
          animate={{ scale: 1 }}
          transition={{ duration: 7, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(7,8,10,0.5)_100%)]" />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{
            background:
              "linear-gradient(120deg, transparent 30%, rgba(255,246,230,0.55) 50%, transparent 70%)",
          }}
          initial={{ x: "-120%", opacity: 0 }}
          animate={{ x: "120%", opacity: [0, 0.9, 0] }}
          transition={{ duration: 2.6, delay: 1.1, ease: "easeInOut" }}
        />
      </motion.figure>

      <motion.span
        className="mt-7 font-sans text-[0.58rem] uppercase tracking-[0.55em] text-cream/35"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
      >
        especialmente para ti
      </motion.span>
    </motion.div>
  );
}
