import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LETTER, PROFILE } from "../../data/content.js";
import Cake from "../Cake.jsx";

const fade = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Letter() {
  const [wishOpen, setWishOpen] = useState(false);

  return (
    <main className="w-full my-auto flex flex-col items-center relative">
      <div className="w-full max-w-5xl px-5 flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">
        {/* 左：信 */}
        <div className="flex-1 min-w-0">
          <motion.h1
            variants={fade}
            custom={0}
            initial="hidden"
            animate="show"
            className="font-display italic font-medium leading-[0.95] tracking-hero text-ink"
            style={{ fontSize: "clamp(2.1rem, 5.4vw, 3.9rem)" }}
          >
            {LETTER.title[0]}
            <span className="text-cinnabar">{LETTER.title[1]}</span>
          </motion.h1>

          <motion.div
            variants={fade}
            custom={1}
            initial="hidden"
            animate="show"
            className="mt-7 md:mt-9 max-w-xl"
          >
            <p className="font-hand text-[17px] text-ink mb-3">
              {LETTER.salutation}
            </p>
            <div className="space-y-3.5">
              {LETTER.body.map((t, i) => (
                <p
                  key={i}
                  className={`leading-[2.05] ${
                    i === 0
                      ? "text-[16px] font-medium text-ink"
                      : "text-[13.5px] text-ink/75"
                  }`}
                >
                  {t}
                </p>
              ))}
            </div>
            <p className="font-hand text-[16px] text-ink/80 mt-6 text-right pr-2">
              {LETTER.signature}
            </p>
          </motion.div>
        </div>

        {/* 右：蛋糕 */}
        <motion.aside
          variants={fade}
          custom={2}
          initial="hidden"
          animate="show"
          className="shrink-0 flex flex-col items-center w-full md:w-[380px] pt-2"
        >
          <Cake
            hintIdle={LETTER.cakeHint}
            hintLit={LETTER.goodHint}
            hintBlow={LETTER.blowHint}
            onBlown={() => {
              window.setTimeout(() => setWishOpen(true), 900);
            }}
          />
        </motion.aside>
      </div>

      {/* 吹灭之后：全屏浮层，不挤压原布局 */}
      <AnimatePresence>
        {wishOpen && (
          <motion.div
            key="wish"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => setWishOpen(false)}
            className="fixed inset-0 z-[68] flex items-center justify-center px-6 bg-paper/55 backdrop-blur-[2px] cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md text-center bg-paper/95 border border-ink/10 rounded-[24px] px-8 py-10 shadow-[0_36px_90px_-34px_rgba(25,24,23,0.55)]"
            >
              <p className="font-display text-[30px] md:text-[36px] text-cinnabar tracking-title leading-tight">
                {LETTER.wishTitle}
              </p>
              <p className="mt-4 text-[13px] text-ink/70 leading-[2.1] whitespace-pre-line">
                {LETTER.wishBody}
              </p>
              <p className="mt-7 text-[10px] tracking-[0.3em] uppercase text-ink/35 font-mono">
                {PROFILE.celebrate}
              </p>
              <p className="mt-4 text-[10px] tracking-[0.2em] text-ink/30">
                点一下，接着看信
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
