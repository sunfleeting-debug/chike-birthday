# -*- coding: utf-8 -*-
"""对线上的 GitHub Pages 站点做最终确认：渲染、图片解码、路由、交互。"""
import os, pathlib, sys
from playwright.sync_api import sync_playwright

EXE = next((pathlib.Path(p) for p in [
    r"C:\Users\Lenovo\AppData\Local\ms-playwright\chromium_headless_shell-1228\chrome-headless-shell-win64\chrome-headless-shell.exe",
    r"C:\Users\Lenovo\AppData\Local\ms-playwright\chromium_headless_shell-1181\chrome-headless-shell-win64\chrome-headless-shell.exe",
] if pathlib.Path(p).exists()), None)

URL = "https://sunfleeting-debug.github.io/chike-birthday/"
OUT = r"F:\MyProject\个人网站\chike-birthday\.shots"
errs, bad = [], []

with sync_playwright() as pw:
    b = pw.chromium.launch(executable_path=str(EXE) if EXE else None)
    ctx = b.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    page.on("console", lambda m: errs.append(f"[{m.type}] {m.text}") if m.type == "error" else None)
    page.on("pageerror", lambda e: errs.append("PAGEERROR: " + str(e)))
    page.on("requestfailed", lambda r: bad.append(f"{r.url} :: {r.failure}"))

    page.goto(URL, wait_until="networkidle", timeout=60000)
    page.wait_for_timeout(2500)
    print("标题:", page.title(), flush=True)
    page.screenshot(path=os.path.join(OUT, "L1-live-cover.png"))
    print("  -> L1-live-cover", flush=True)

    # 图片是否真的解码成功
    page.wait_for_timeout(500)
    imgs = page.evaluate("""() => [...document.images].map(i => ({
        src: i.currentSrc || i.src, w: i.naturalWidth, h: i.naturalHeight }))""")
    zero = [i for i in imgs if i["w"] == 0]
    print(f"页面上图片 {len(imgs)} 张，未解码 {len(zero)} 张", flush=True)
    for z in zero:
        print("   BAD:", z["src"], flush=True)

    # 进画廊
    page.goto(URL + "#/gallery", wait_until="networkidle", timeout=60000)
    page.wait_for_timeout(2500)
    page.screenshot(path=os.path.join(OUT, "L2-live-gallery.png"))
    print("  -> L2-live-gallery", flush=True)
    n = page.evaluate("() => document.querySelectorAll('figure img').length")
    print("画廊卡片数:", n, flush=True)

    # 图片解码抽检（画廊前几张）
    page.wait_for_timeout(1200)
    page.mouse.move(720, 450)
    page.mouse.wheel(0, 1200)
    page.wait_for_timeout(1800)
    imgs2 = page.evaluate("""() => [...document.querySelectorAll('figure img')].map(i => i.naturalWidth)""")
    print("画廊图片 naturalWidth:", imgs2[:12], flush=True)
    page.screenshot(path=os.path.join(OUT, "L3-live-gallery-scrolled.png"))
    print("  -> L3-live-gallery-scrolled", flush=True)

    print("\n=== console errors ===", flush=True)
    print("  none" if not errs else "\n".join("  " + e for e in errs[:15]), flush=True)
    print("=== failed requests ===", flush=True)
    print("  none" if not bad else "\n".join("  " + e for e in bad[:15]), flush=True)
    sys.stdout.flush()
    os._exit(0)
