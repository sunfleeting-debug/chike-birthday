# -*- coding: utf-8 -*-
"""线上验收：翻页、蛋糕交互、画廊筛选、图片解码、控制台报错。"""
import os, re, pathlib, sys
from playwright.sync_api import sync_playwright

EXE = next((pathlib.Path(p) for p in [
    r"C:\Users\Lenovo\AppData\Local\ms-playwright\chromium_headless_shell-1228\chrome-headless-shell-win64\chrome-headless-shell.exe",
    r"C:\Users\Lenovo\AppData\Local\ms-playwright\chromium_headless_shell-1181\chrome-headless-shell-win64\chrome-headless-shell.exe",
] if pathlib.Path(p).exists()), None)

URL = "https://sunfleeting-debug.github.io/chike-birthday/"
OUT = r"F:\MyProject\个人网站\chike-birthday\.shots"
errs, failed = [], []
checks = []


def ck(name, ok, extra=""):
    checks.append((name, ok))
    print(f"  [{'OK ' if ok else 'FAIL'}] {name} {extra}", flush=True)


with sync_playwright() as pw:
    b = pw.chromium.launch(executable_path=str(EXE) if EXE else None)
    ctx = b.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    page.set_default_timeout(20000)
    page.on("console", lambda m: errs.append(f"[{m.type}] {m.text}") if m.type == "error" else None)
    page.on("pageerror", lambda e: errs.append("PAGEERROR: " + str(e)))
    page.on("requestfailed", lambda r: failed.append(r.url))

    page.goto(URL, wait_until="networkidle", timeout=60000)
    page.wait_for_timeout(2200)
    ck("标题正确", page.title() == "尺K · 生日快乐", f"→ {page.title()}")
    ck("封面渲染出名字", page.get_by_text("生日快乐").count() > 0)

    # 翻到第 4 屏（生日）
    for _ in range(3):
        page.mouse.move(720, 450)
        page.mouse.wheel(0, 220)
        page.wait_for_timeout(1200)
    ck("翻页到生日屏", page.get_by_role("button", name="点亮生日蜡烛").count() == 1)

    # 点亮 → 吹灭 → 许愿
    page.get_by_role("button", name="点亮生日蜡烛").click()
    page.wait_for_timeout(900)
    ck("蜡烛点亮（出现吹灭按钮）", page.get_by_role("button", name="深吸一口气，吹灭它。").count() == 1)
    page.screenshot(path=os.path.join(OUT, "F1-live-lit.png"))

    page.get_by_role("button", name="深吸一口气，吹灭它。").click()
    page.wait_for_timeout(500)
    page.screenshot(path=os.path.join(OUT, "F2-live-confetti.png"))
    page.wait_for_timeout(1500)
    ck("许愿浮层出现", page.evaluate("() => document.body.innerText.includes('愿望实现了')"))
    page.screenshot(path=os.path.join(OUT, "F3-live-wish.png"))
    page.mouse.click(720, 450)      # 点一下关掉浮层
    page.wait_for_timeout(900)
    ck("浮层可关闭", not page.evaluate("() => document.body.innerText.includes('愿望实现了')"))

    # 画廊：逐个分组筛一遍
    page.goto(URL + "#/gallery", wait_until="networkidle", timeout=60000)
    page.wait_for_timeout(1800)
    total_cards = page.evaluate("() => document.querySelectorAll('figure img').length")
    ck("画廊全部 21 张", total_cards == 21, f"→ {total_cards}")
    page.screenshot(path=os.path.join(OUT, "F4-live-gallery.png"))

    for label, expect in [("江边", 12), ("高处", 4), ("我们", 5)]:
        page.get_by_role("button", name=re.compile("^" + label)).click()
        page.wait_for_timeout(1100)
        n = page.evaluate("() => document.querySelectorAll('figure img').length")
        ck(f"筛选「{label}」={expect}", n == expect, f"→ {n}")

    # 把所有懒加载图滚一遍，再统计解码失败的
    page.get_by_role("button", name=re.compile("^全部")).click()
    page.wait_for_timeout(1000)
    h = page.evaluate("() => { const e=document.querySelector('.no-scrollbar'); return e?e.scrollHeight:0 }")
    step = 700
    for y in range(0, int(h) + step, step):
        page.evaluate("(y)=>{const e=document.querySelector('.no-scrollbar'); if(e) e.scrollTop=y}", y)
        page.wait_for_timeout(420)
    zero = page.evaluate("""() => [...document.querySelectorAll('figure img')]
        .filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src)""")
    ck("21 张图全部解码成功", len(zero) == 0, f"未解码 {len(zero)} 张")

    ctx.close()

    # 移动端
    m = b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2,
                      is_mobile=True, has_touch=True)
    mp = m.new_page()
    mp.set_default_timeout(20000)
    mp.on("pageerror", lambda e: errs.append("MOBILE PAGEERROR: " + str(e)))
    mp.goto(URL, wait_until="networkidle", timeout=60000)
    mp.wait_for_timeout(1800)
    secs = mp.evaluate("() => document.querySelectorAll('section').length")
    ck("移动端 4 屏都在", secs == 4, f"→ {secs}")
    mp.evaluate("() => window.scrollTo(0, document.body.scrollHeight)")
    mp.wait_for_timeout(900)
    mp.screenshot(path=os.path.join(OUT, "F5-live-mobile-footer.png"))
    m.close()

print("\n=== 汇总 ===", flush=True)
passed = sum(1 for _, ok in checks if ok)
print(f"通过 {passed}/{len(checks)} 项断言", flush=True)
print("控制台报错:", "无" if not errs else errs[:10], flush=True)
print("请求失败:", "无" if not failed else failed[:10], flush=True)
sys.stdout.flush()
os._exit(0 if passed == len(checks) and not errs and not failed else 1)
