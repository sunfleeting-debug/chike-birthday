import { motion } from "framer-motion";
import { ABOUT, fullSrc, PHOTOS } from "../../data/content.js";

const portrait = PHOTOS.find((p) => p.slug === "river-02-stand");

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  return (
    <main className="w-full my-auto flex flex-col items-center relative">
      <div className="w-full max-w-5xl px-5 flex flex-col md:flex-row md:items-start gap-10 md:gap-14">
        {/* 左：标题 + 正文 */}
        <div className="flex-1">
          <motion.h1
            variants={fade}
            custom={0}
            initial="hidden"
            animate="show"
            className="font-display italic font-medium leading-[0.9] tracking-hero text-ink"
            style={{ fontSize: "clamp(2.6rem, 7vw, 5rem)" }}
          >
            {ABOUT.title[0]}
            <br />
            <span className="pl-6 md:pl-12">{ABOUT.title[1]}</span>
          </motion.h1>

          <motion.div
            variants={fade}
            custom={1}
            initial="hidden"
            animate="show"
            className="mt-8 md:mt-10 space-y-4 max-w-xl"
          >
            {ABOUT.paragraphs.map((t, i) => (
              <p
                key={i}
                className={`leading-[2] ${
                  i === 0
                    ? "text-[15px] text-ink font-medium"
                    : "text-[13.5px] text-ink/70"
                }`}
              >
                {t}
              </p>
            ))}
          </motion.div>
        </div>

        {/* 右：头像 + 词条 */}
        <motion.aside
          variants={fade}
          custom={2}
          initial="hidden"
          animate="show"
          className="shrink-0 flex flex-col items-center md:items-end gap-7"
        >
          <div className="relative w-[190px] h-[190px] md:w-[230px] md:h-[230px] rounded-full overflow-hidden border-4 border-white/70 shadow-[0_20px_50px_-24px_rgba(25,24,23,0.55)]">
            <img
              src={fullSrc(portrait)}
              alt="尺K"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <dl className="grid grid-cols-2 gap-x-10 gap-y-3 text-left">
            {ABOUT.facts.map((f) => (
              <div key={f.k}>
                <dt className="text-[10px] tracking-[0.2em] uppercase text-ink/40">
                  {f.k}
                </dt>
                <dd className="text-[13px] text-ink/85 mt-1">{f.v}</dd>
              </div>
            ))}
          </dl>

          {/* 一点小装饰：耳机线 */}
          <svg
            width="120"
            height="26"
            viewBox="0 0 120 26"
            fill="none"
            className="text-ink/25"
            aria-hidden
          >
            <path
              d="M2 4c14 0 14 18 28 18S44 4 58 4s14 18 28 18S100 4 114 4"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </motion.aside>
      </div>

      <motion.p
        variants={fade}
        custom={3}
        initial="hidden"
        animate="show"
        className="mt-10 md:mt-12 text-[10px] tracking-[0.3em] uppercase text-ink/35 font-mono"
      >
        {ABOUT.en}
      </motion.p>
    </main>
  );
}
