import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

type Props = {
  src: string;
  alt: string;
  poster?: string;
  className?: string;
  duration?: number;
};

export function VideoMemory({
  src,
  alt,
  poster,
  className = "",
  duration = 2,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { amount: 0.3, once: false });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView) {
      const playing = video.play();
      if (playing && typeof playing.catch === "function") {
        playing.catch(() => undefined);
      }
    } else {
      video.pause();
    }
  }, [inView]);

  return (
    <motion.div
      ref={wrapRef}
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        disablePictureInPicture
        aria-label={alt}
        className={`object-cover ${className}`}
        onLoadedData={(event) => {
          if (!inView) event.currentTarget.pause();
        }}
      />
    </motion.div>
  );
}
