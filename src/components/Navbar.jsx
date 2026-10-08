import { Link, useLocation } from "react-router-dom";
import { LetterSwapPingPong } from "./LetterSwap.jsx";
import { PROFILE } from "../data/content.js";

export default function Navbar() {
  const { pathname } = useLocation();
  const inGallery = pathname.startsWith("/gallery");

  return (
    <header className="absolute top-0 left-0 right-0 w-full flex justify-between items-start text-[11px] font-medium tracking-wider uppercase p-6 md:p-12 md:py-7 pointer-events-auto z-40">
      <div className="flex items-center gap-6">
        <div className="border border-ink/40 px-1.5 py-0.5 text-ink/60 font-mono">
          {PROFILE.birthday}
        </div>
        <div className="hidden sm:block text-ink/55 tracking-[0.2em]">
          写 给 我 兄 弟
        </div>
      </div>

      <div className="flex items-center gap-8">
        <nav className="flex items-center">
          {inGallery ? (
            <Link to="/" className="cursor-pointer">
              <LetterSwapPingPong
                label="返回"
                className="text-[11px] font-medium tracking-[0.2em]"
              />
            </Link>
          ) : (
            <Link to="/gallery" className="cursor-pointer">
              <LetterSwapPingPong
                label="照片"
                className="text-[11px] font-medium tracking-[0.2em]"
              />
            </Link>
          )}
        </nav>
        <div className="w-3.5 h-3.5 bg-cinnabar rounded-full opacity-80" />
      </div>
    </header>
  );
}
