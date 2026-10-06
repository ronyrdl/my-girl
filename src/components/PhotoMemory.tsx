import { motion, useReducedMotion } from "framer-motion";

type Props = {
  src: string;
  alt: string;
  className?: string;
  kenBurns?: boolean;
  duration?: number;
};

export function PhotoMemory({
  src,
  alt,
  className = "",
  kenBurns = true,
  duration = 24,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={`select-none ${className}`}
      initial={kenBurns && !reduce ? { scale: 1.04, opacity: 0 } : { opacity: 0 }}
      whileInView={
        kenBurns && !reduce
          ? { scale: 1.16, opacity: 1 }
          : { scale: 1, opacity: 1 }
      }
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        opacity: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
        scale: { duration, ease: "linear" },
      }}
    />
  );
}
