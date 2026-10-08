import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GROUPS, MOMENTS, PHOTOS, fullSrc } from "../../data/content.js";
import { LetterSwapPingPong } from "../LetterSwap.jsx";

// 每个分组挑一张代表照
const REPRESENTATIVE = {
  river: "river-01-hero",
  high: "high-04-wheel",
  us: "us-01-bench",
};

const fade = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.09 * i, duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Moments() {
  const navigate = useNavigate();

  return (
    <main className="w-full my-auto flex flex-col items-center relative">
      <div className="w-full max-w-5xl px-5">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.h1
            variants={fade}
            custom={0}
            initial="hidden"
            animate="show"
            className="font-display italic font-medium leading-[0.9] tracking-hero text-ink"
            style={{ fontSize: "clamp(2.4rem, 6.4vw, 4.6rem)" }}
          >
            {MOMENTS.title[0]}
            <span className="pl-5 text-cinnabar">{MOMENTS.title[1]}</span>
          </motion.h1>

          <motion.p
            variants={fade}
            custom={1}
            initial="hidden"
            animate="show"
            className="text-[12.5px] text-ink/60 max-w-xs leading-[1.9] md:text-right"
          >
            {MOMENTS.lead}
          </motion.p>
        </div>

        {/* 三个分组的预览 */}
        <div className="mt-9 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-7">
          {GROUPS.map((g, i) => {
            const photo = PHOTOS.find((p) => p.slug === REPRESENTATIVE[g.key]);
            const count = PHOTOS.filter((p) => p.group === g.key).length;
            return (
              <motion.button
                key={g.key}
                variants={fade}
                custom={2 + i}
                initial="hidden"
                animate="show"
                onClick={() => navigate(`/gallery?g=${g.key}`)}
                className="group text-left cursor-pointer"
              >
                <div
                  className="relative w-full overflow-hidden rounded-[18px] bg-paper-soft shadow-[0_18px_40px_-26px_rgba(25,24,23,0.5)]"
                  style={{ aspectRatio: "4 / 3" }}
                >
                  <img
                    src={fullSrc(photo)}
                    alt={g.label}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-bounce-out group-hover:scale-[1.06]"
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-paper/85 text-[10px] font-mono tracking-widest text-ink/70">
                    {String(count).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-3.5 flex items-baseline justify-between">
                  <span className="font-display text-[19px] text-ink">
                    {g.label}
                  </span>
                  <span className="text-[10px] tracking-[0.16em] uppercase text-ink/40">
                    {g.en}
                  </span>
                </div>
                <p className="mt-1.5 text-[12px] text-ink/55 leading-relaxed">
                  {g.note}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* 全部照片入口 */}
        <motion.div
          variants={fade}
          custom={5}
          initial="hidden"
          animate="show"
          className="mt-10 md:mt-12 flex justify-center md:justify-start"
        >
          <button
            type="button"
            onClick={() => navigate("/gallery")}
            className="flex items-center gap-6 border border-ink rounded-full px-5 py-2 text-xs font-medium tracking-[0.18em] hover:bg-ink hover:text-paper transition-colors cursor-pointer"
          >
            <LetterSwapPingPong
              label="全部 21 张"
              className="text-xs font-medium tracking-[0.18em]"
            />
            <span aria-hidden>→</span>
          </button>
        </motion.div>
      </div>
    </main>
  );
}
