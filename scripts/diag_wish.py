# -*- coding: utf-8 -*-
"""定点排查：吹灭蜡烛后，许愿浮层到底有没有挂上 DOM。"""
import os, pathlib, sys, json
from playwright.sync_api import sync_playwright

EXE = next((pathlib.Path(p) for p in [
    r"C:\Users\Lenovo\AppData\Local\ms-playwright\chromium_headless_shell-1228\chrome-headless-shell-win64\chrome-headless-shell.exe",
    r"C:\Users\Lenovo\AppData\Local\ms-playwright\chromium_headless_shell-1181\chrome-headless-shell-win64\chrome-headless-shell.exe",
] if pathlib.Path(p).exists()), None)

errs = []
with sync_playwright() as pw:
    b = pw.chromium.launch(executable_path=str(EXE) if EXE else None)
    ctx = b.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    page.on("console", lambda m: errs.append(f"[{m.type}] {m.text}"))
    page.on("pageerror", lambda e: errs.append("PAGEERROR: " + str(e)))

    page.goto("http://localhost:4173/", wait_until="networkidle")
    page.wait_for_timeout(1500)
    for _ in range(3):
        page.mouse.move(720, 450)
        page.mouse.wheel(0, 220)
        page.wait_for_timeout(1150)

    print("--- 到第 4 屏 ---", flush=True)
    print("有'点亮生日蜡烛'按钮:", page.get_by_role("button", name="点亮生日蜡烛").count(), flush=True)

    page.get_by_role("button", name="点亮生日蜡烛").click()
    page.wait_for_timeout(900)
    print("有'吹灭'按钮:", page.get_by_role("button", name="深吸一口气，吹灭它。").count(), flush=True)

    page.get_by_role("button", name="深吸一口气，吹灭它。").click()
    for t in (500, 1000, 1500, 2200, 3000):
        page.wait_for_timeout(t if t == 500 else (t - 500 if t <= 1000 else 0))
    # 逐时刻取样
    page.wait_for_timeout(0)
    for ms in (300, 700, 1100, 1600, 2400):
        page.wait_for_timeout(ms if ms == 300 else 0)
        has = page.evaluate("() => document.body.innerText.includes('愿望实现了')")
        n = page.evaluate("() => document.querySelectorAll('div.fixed').length")
        print(f"t≈{ms}ms  含'愿望实现了': {has}   fixed 元素数: {n}", flush=True)
        if ms != 300:
            page.wait_for_timeout(400)

    page.wait_for_timeout(800)
    print("最终 innerText 片段:", flush=True)
    print(page.evaluate("() => document.body.innerText.slice(0,400)"), flush=True)
    print("fixed 层 z-index:", page.evaluate(
        "() => [...document.querySelectorAll('div.fixed')].map(e=>({c:e.className.slice(0,60), z:getComputedStyle(e).zIndex, op:getComputedStyle(e).opacity}))"
    ), flush=True)

    print("\n--- console ---", flush=True)
    for e in errs[:25]:
        print("  ", e, flush=True)
    sys.stdout.flush()
    os._exit(0)
