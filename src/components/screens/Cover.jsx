import { motion } from "framer-motion";
import { LetterSwapPingPong } from "../LetterSwap.jsx";
import { useNavigate } from "react-router-dom";
import { PROFILE } from "../../data/content.js";

const rise = {
  hidden: { opacity: 0, y: 34 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 * i, duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Cover() {
  const navigate = useNavigate();

  return (
    <main className="w-full my-auto flex flex-col items-center relative">
      <div className="relative max-w-5xl w-full px-5">
        {/* 第一行：名字 */}
        <motion.div
          variants={rise}
          custom={0}
          initial="hidden"
          animate="show"
          className="font-display italic font-medium leading-[0.82] tracking-hero text-left text-ink"
          style={{ fontSize: "clamp(3.6rem, 13vw, 11rem)" }}
        >
          {PROFILE.name}
        </motion.div>

        {/* 右上角注脚 */}
        <motion.div
          variants={rise}
          custom={1}
          initial="hidden"
          animate="show"
          className="absolute right-5 md:right-16 top-0 text-[10px] tracking-[0.24em] uppercase text-ink/55 leading-relaxed text-right"
        >
          出生于
          <br />
          <span className="font-mono text-ink/75">{PROFILE.birthday}</span>
        </motion.div>

        {/* 第二行：生日快乐 */}
        <motion.div
          variants={rise}
          custom={2}
          initial="hidden"
          animate="show"
          className="font-display font-medium leading-[0.9] tracking-hero text-right md:pr-14 mt-2 md:mt-3 text-cinnabar"
          style={{ fontSize: "clamp(2.5rem, 8.6vw, 7.4rem)" }}
        >
          生日快乐
        </motion.div>
      </div>

      {/* 一行说明 + 按钮 */}
      <motion.div
        variants={rise}
        custom={3}
        initial="hidden"
        animate="show"
        className="w-full max-w-3xl mt-12 md:mt-16 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-7 px-6"
      >
        <p className="text-xs sm:text-sm text-ink/70 max-w-sm leading-[1.9]">
          二十岁。这份礼物没有包装纸，
          <br className="hidden sm:block" />
          代码和照片都是现做的，你收一下。
        </p>

        <button
          type="button"
          onClick={() => navigate("/gallery")}
          className="flex items-center gap-6 border border-ink rounded-full px-5 py-2 text-xs uppercase font-medium tracking-[0.18em] hover:bg-ink hover:text-paper transition-colors cursor-pointer"
        >
          <LetterSwapPingPong
            label="看照片"
            className="text-xs font-medium tracking-[0.18em]"
          />
          <span aria-hidden>↗</span>
        </button>
      </motion.div>

      <motion.p
        variants={rise}
        custom={4}
        initial="hidden"
        animate="show"
        className="mt-10 text-[10px] tracking-[0.3em] text-ink/40 font-mono"
      >
        {PROFILE.celebrate}
      </motion.p>
    </main>
  );
}
