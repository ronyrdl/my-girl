import { useCallback, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Intro } from "./components/Intro";
import { Story } from "./components/Story";
import { Finale } from "./components/Finale";
import { GrainOverlay } from "./components/Atmosphere";

type Phase = "intro" | "story" | "finale";

export default function App() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [veil, setVeil] = useState(false);

  const transitionTo = useCallback((next: Phase) => {
    setVeil(true);

    window.setTimeout(() => {
      setPhase(next);

      if (next === "finale") {
        document.body.style.overflow = "hidden";
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
        document.body.style.overflow = "";
      }

      window.setTimeout(() => setVeil(false), 320);
    }, 880);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-ink">
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <Intro key="intro" onStart={() => transitionTo("story")} />
        )}
      </AnimatePresence>

      {phase === "story" && (
        <Story onStoryEnd={() => transitionTo("finale")} />
      )}

      <AnimatePresence>
        {phase === "finale" && <Finale key="finale" />}
      </AnimatePresence>

      <GrainOverlay />

      <motion.div
        aria-hidden
        className="fixed inset-0 z-[60] bg-ink"
        style={{ pointerEvents: veil ? "auto" : "none" }}
        animate={{ opacity: veil ? 1 : 0 }}
        transition={{ duration: veil ? 0.85 : 1.15, ease: [0.65, 0, 0.35, 1] }}
      />
      </div>
    </MotionConfig>
  );
}
