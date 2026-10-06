import { Fragment } from "react";
import { motion, type Transition } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
};

export function Words({
  text,
  className,
  delay = 0,
  stagger = 0.14,
  duration = 1.3,
}: Props) {
  const transition: Transition = { ease: [0.16, 1, 0.3, 1], duration };

  return (
    <span className={className}>
      {text.split(" ").map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <motion.span
            className="inline-block will-change-[transform,filter,opacity]"
            initial={{ opacity: 0, y: "0.35em", filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ ...transition, delay: delay + index * stagger }}
          >
            {word}
          </motion.span>{" "}
        </Fragment>
      ))}
    </span>
  );
}
