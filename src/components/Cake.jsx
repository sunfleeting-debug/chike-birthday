import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * 可交互的生日蛋糕。
 * 交互弧线：点一下点亮蜡烛 → 吹灭 → 冒烟 + 彩带 → 显示愿望。
 * phase: idle(未点) → lit(已点亮) → blown(已吹灭)
 */

const CONFETTI_COLORS = [
  "#c2452f",
  "#d9694f",
  "#b8862f",
  "#d8ab5a",
  "#4c6b78",
  "#8aa6b0",
  "#f4f1ea",
];

function Flame({ lit }) {
  return (
    <AnimatePresence>
      {lit && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -top-6 left-1/2 -translate-x-1/2 candle-glow"
        >
          <div className="animate-flicker origin-bottom w-[13px] h-[21px] rounded-[50%_50%_50%_50%/62%_62%_38%_38%] bg-[radial-gradient(circle_at_50%_68%,#fff6cf_0%,#ffbe3d_46%,#ff7a18_78%,rgba(255,90,0,0)_100%)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** 吹灭后的一缕烟 */
function Smoke({ show, delay }) {
  if (!show) return null;
  return (
    <span
      className="absolute -top-5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-ink/25 animate-float-up"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}

function Confetti({ run }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 900,
        duration: 2400 + Math.random() * 1800,
        size: 5 + Math.random() * 7,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        rot: Math.random() * 360,
        round: Math.random() > 0.6,
      })),
    [],
  );

  if (!run) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translate3d(0,-12vh,0) rotate(0deg); opacity: 0; }
          8%   { opacity: 1; }
          100% { transform: translate3d(var(--dx,0px), 110vh, 0) rotate(720deg); opacity: 0; }
        }
      `}</style>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.round ? p.size : p.size * 1.8,
            background: p.color,
            borderRadius: p.round ? "999px" : "2px",
            transform: `rotate(${p.rot}deg)`,
            ["--dx"]: `${(Math.random() - 0.5) * 220}px`,
            animation: `confettiFall ${p.duration}ms cubic-bezier(0.3,0.6,0.5,1) ${p.delay}ms forwards`,
          }}
        />
      ))}
    </div>
  );
}

export default function Cake({ hintIdle, hintLit, hintBlow, onBlown }) {
  const [phase, setPhase] = useState("idle");
  const lit = phase === "lit";

  const handleCakeClick = useCallback(() => {
    if (phase === "idle") setPhase("lit");
  }, [phase]);

  const handleBlow = useCallback(
    (e) => {
      e.stopPropagation();
      if (phase !== "lit") return;
      setPhase("blown");
      onBlown?.();
    },
    [phase, onBlown],
  );

  // 键盘可达性：回车/空格也能操作
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      if (phase === "idle") {
        setPhase("lit");
      } else if (phase === "lit") {
        setPhase("blown");
        onBlown?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, onBlown]);

  const hint = phase === "idle" ? hintIdle : phase === "lit" ? hintLit : null;

  return (
    <div className="relative flex flex-col items-center select-none">
      <Confetti run={phase === "blown"} />

      <button
        type="button"
        onClick={handleCakeClick}
        disabled={phase !== "idle"}
        aria-label={phase === "idle" ? "点亮生日蜡烛" : "生日蛋糕"}
        className={`relative group flex flex-col items-center ${
          phase === "idle" ? "cursor-pointer" : "cursor-default"
        }`}
      >
        {/* 蜡烛：数字 2 和 0 */}
        <div className="relative flex items-end gap-7 mb-[-6px] z-20">
          {["2", "0"].map((d, i) => (
            <div key={d} className="relative flex flex-col items-center">
              <Flame lit={lit} />
              <Smoke show={phase === "blown"} delay={i * 120} />
              <span
                className="font-display italic leading-none text-[4.2rem] md:text-[5rem] font-medium transition-all duration-500"
                style={
                  lit || phase === "blown"
                    ? {
                        color: "#c2452f",
                        WebkitTextStroke: "0px",
                        textShadow: lit ? "0 0 22px rgba(255,150,40,0.35)" : "none",
                      }
                    : {
                        // 未点亮：只留描边，和点亮后的实心红形成清晰的对照
                        color: "transparent",
                        WebkitTextStroke: "1.5px rgba(25,24,23,0.40)",
                      }
                }
              >
                {d}
              </span>
            </div>
          ))}
        </div>

        {/* 上层的蛋糕 */}
        <div className="relative w-[168px] h-[58px] md:w-[190px] md:h-[64px] bg-[#efdcbe] rounded-t-[12px] rounded-b-[6px] shadow-[inset_0_-7px_0_rgba(120,86,40,0.10)] z-10">
          <div className="absolute inset-x-0 top-0 h-[24px] bg-[#fffaf3] rounded-t-[12px] shadow-[0_1px_0_rgba(120,86,40,0.12)]">
            <div
              className="absolute inset-x-0 -bottom-[11px] h-[16px]"
              style={{
                backgroundImage: "radial-gradient(circle, #fffaf3 66%, transparent 68%)",
                backgroundSize: "26px 26px",
                backgroundRepeat: "repeat-x",
              }}
            />
          </div>
          {/* 一小排朱砂点，克制的中式喜气 */}
          <div className="absolute inset-x-0 top-[32px] flex justify-center gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="w-[6px] h-[6px] rounded-full bg-cinnabar/70" />
            ))}
          </div>
        </div>

        {/* 下层的蛋糕 */}
        <div className="relative w-[252px] h-[80px] md:w-[286px] md:h-[88px] bg-[#e7cda6] rounded-t-[10px] rounded-b-[16px] shadow-[inset_0_-9px_0_rgba(120,86,40,0.12),0_16px_30px_-18px_rgba(25,24,23,0.45)]">
          <div className="absolute inset-x-0 top-0 h-[26px] bg-[#fffaf3] rounded-t-[10px] shadow-[0_1px_0_rgba(120,86,40,0.12)]">
            <div
              className="absolute inset-x-0 -bottom-[12px] h-[18px]"
              style={{
                backgroundImage: "radial-gradient(circle, #fffaf3 66%, transparent 68%)",
                backgroundSize: "30px 30px",
                backgroundRepeat: "repeat-x",
              }}
            />
          </div>
          {/* 蛋糕胚的分层线 */}
          <div className="absolute inset-x-4 top-[50px] h-[1px] bg-[rgba(120,86,40,0.16)]" />
          <div className="absolute inset-x-6 top-[62px] flex justify-between">
            {Array.from({ length: 7 }).map((_, i) => (
              <span key={i} className="w-[5px] h-[5px] rounded-full bg-gold/70" />
            ))}
          </div>
        </div>

        {/* 盘子 */}
        <div className="relative mt-1.5 w-[320px] md:w-[360px] h-[16px] rounded-full bg-gradient-to-b from-[#f2ece2] to-[#ded5c6] shadow-[0_12px_20px_-12px_rgba(25,24,23,0.55)]">
          <div className="absolute inset-x-3 top-[3px] h-[4px] rounded-full bg-white/50" />
        </div>
      </button>

      {/* 提示 / 吹蜡烛按钮 */}
      <div className="h-16 mt-6 flex flex-col items-center justify-start">
        <AnimatePresence mode="wait">
          {phase === "lit" ? (
            <motion.button
              key="blow"
              type="button"
              onClick={handleBlow}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-2 rounded-full border border-cinnabar/70 text-cinnabar text-[12px] tracking-[0.2em] hover:bg-cinnabar hover:text-paper transition-colors cursor-pointer"
            >
              {hintBlow}
            </motion.button>
          ) : hint ? (
            <motion.p
              key={hint}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[12px] tracking-[0.18em] text-ink/50"
            >
              {hint}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
