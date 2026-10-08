/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // 纸张底 —— 温润的米白，像一封手写信
        paper: "#f4f1ea",
        "paper-soft": "#ebe7dd",
        "paper-cool": "#eef1ef",
        "paper-warm": "#f6efe3",
        // 墨色
        ink: "#191817",
        "ink-dim": "#6f6960",
        "ink-soft": "#9a938a",
        line: "rgba(25,24,23,0.10)",
        "line-strong": "rgba(25,24,23,0.20)",
        // 朱砂红 —— 生日的主角
        cinnabar: "#c2452f",
        "cinnabar-soft": "#d9694f",
        // 金 —— 点缀
        gold: "#b8862f",
        "gold-soft": "#d8ab5a",
        // 江水青灰 —— 呼应照片里的江河
        river: "#4c6b78",
        "river-soft": "#8aa6b0",
      },
      fontFamily: {
        // 大的展示字：中文用宋体，拉丁用衬线，克制而好看
        display: [
          '"Songti SC"',
          '"STSong"',
          '"Noto Serif SC"',
          '"Source Han Serif SC"',
          '"SimSun"',
          "Georgia",
          '"Times New Roman"',
          "serif",
        ],
        sans: [
          "Inter",
          '"Helvetica Neue"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          "system-ui",
          "sans-serif",
        ],
        mono: [
          '"JetBrains Mono"',
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
        // 手写感 —— 用于署名与便签
        hand: [
          '"Kaiti SC"',
          '"STKaiti"',
          '"KaiTi"',
          '"Songti SC"',
          "serif",
        ],
      },
      maxWidth: {
        container: "1200px",
      },
      borderRadius: {
        "4xl": "18px",
      },
      letterSpacing: {
        hero: "-0.04em",
        title: "-0.03em",
        subhead: "-0.02em",
      },
      transitionTimingFunction: {
        "bounce-out": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { transform: "scaleY(1) rotate(-1deg)", opacity: "0.95" },
          "25%": { transform: "scaleY(1.08) rotate(1.5deg)", opacity: "1" },
          "50%": { transform: "scaleY(0.94) rotate(-1.5deg)", opacity: "0.9" },
          "75%": { transform: "scaleY(1.05) rotate(1deg)", opacity: "1" },
        },
        floatUp: {
          "0%": { transform: "translateY(0) scale(0.6)", opacity: "0" },
          "30%": { opacity: "1" },
          "100%": { transform: "translateY(-220px) scale(1)", opacity: "0" },
        },
      },
      animation: {
        flicker: "flicker 2.4s ease-in-out infinite",
        "float-up": "floatUp 2.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
