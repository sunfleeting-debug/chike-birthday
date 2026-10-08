# -*- coding: utf-8 -*-
"""
处理 郭子/ 里的 21 张原图：
  1. EXIF 方向矫正
  2. 输出网页用大图（长边 1600px, q=80）与小缩略图（长边 640px, q=76）
  3. 按场景语义重命名，便于内容编排
输出：public/photos/full/*.jpg、public/photos/thumb/*.jpg
"""
import os
from PIL import Image, ImageOps

SRC = r"F:\MyProject\个人网站\郭子"
ROOT = r"F:\MyProject\个人网站\chike-birthday"
FULL = os.path.join(ROOT, "public", "photos", "full")
THUMB = os.path.join(ROOT, "public", "photos", "thumb")
os.makedirs(FULL, exist_ok=True)
os.makedirs(THUMB, exist_ok=True)

# 原文件名 -> 语义名
# 分组：river 江边 / high 高处 / us 我们
MAPPING = {
    "6fc2eaf6b500086ffeaa2a41f3fe583e.jpg": ("river-01-hero", "river"),   # 大礁石抱臂，开阔江面（主视觉）
    "0d37c6c87e810db9105de351dcfe792e.jpg": ("river-02-stand", "river"),  # 礁石上抱臂微笑
    "02933a494418a59915bff4a53f866f2a.jpg": ("river-03-lean", "river"),   # 倚栏侧望，耳机
    "2185dd01d7fd60d2747fdb5c9283e257.jpg": ("river-04-lean2", "river"),   # 倚栏侧望（另一帧）
    "3195b61680075a7093c778bbc5cf78f1.jpg": ("river-05-sit", "river"),    # 坐礁石看手机
    "698583398593c516fad6a671ea503619.jpg": ("river-06-hips", "river"),   # 叉腰看江
    "731889306f35fa26a31f01814b9d2222.jpg": ("river-07-hips2", "river"),  # 叉腰（另一帧）
    "f5810442a854da21e3d8841baf43aa8a.jpg": ("river-08-hips3", "river"),  # 叉腰（远处）
    "7dabd6f290c855aa753b709b17c0f195.jpg": ("river-09-hips4", "river"),  # 叉腰（另一帧）
    "315d6cee3fcbd64e6d10ad7b0200d7b9.jpg": ("river-10-selfie", "river"),  # 江边自拍
    "39bd31cfe2a005c2ac7d6616fc211e02.jpg": ("river-11-selfie2", "river"),  # 江边自拍（另一帧）
    "6d16520a09248af0d5d0330b1e94b342.jpg": ("river-12-selfie3", "river"),  # 自拍比手势
    "757aee6cfb6771aa3dbda0d1bd991919.jpg": ("us-01-bench", "us"),          # 长椅背影望江
    "abdde4ec72376ca8ed7e808ebcc2163f.jpg": ("us-02-bench2", "us"),         # 长椅背影（宽幅）
    "b9a7616397d5b7c1531230c68e694dc8.jpg": ("us-03-koi", "us"),            # 木窗锦鲤前
    "9b74759e9df369599d16d52f12f69568.jpg": ("high-01-cable", "high"),      # 缆车自拍
    "d92c54aa3510e16dc6969f1f6b667734.jpg": ("high-02-cable2", "high"),     # 缆车比手势大笑
    "f045ad4fba6fbb88eb0216808e9282d0.jpg": ("high-03-cable3", "high"),     # 缆车黑白大笑
    "e470340a91068c4611c9a4992ca2afe8.jpg": ("high-04-wheel", "high"),      # 托腮，摩天轮
    "26b2c50eaae857496608c46259b3b880.jpg": ("us-04-ktv", "us"),            # KTV 合影
    "b3e2461138291caafff8b82774fcb308.jpg": ("us-05-ktv2", "us"),           # KTV 合影（另一帧）
}

MAX_FULL = 1600
MAX_THUMB = 640

rows = []
for fn, (slug, group) in MAPPING.items():
    src = os.path.join(SRC, fn)
    if not os.path.exists(src):
        print("[MISS]", fn)
        continue
    im = Image.open(src)
    im = ImageOps.exif_transpose(im)          # 方向矫正
    if im.mode != "RGB":
        im = im.convert("RGB")
    w, h = im.size

    # 大图
    big = im.copy()
    big.thumbnail((MAX_FULL, MAX_FULL), Image.LANCZOS)
    big.save(os.path.join(FULL, slug + ".jpg"), "JPEG",
             quality=80, optimize=True, progressive=True)

    # 缩略图
    sm = im.copy()
    sm.thumbnail((MAX_THUMB, MAX_THUMB), Image.LANCZOS)
    sm.save(os.path.join(THUMB, slug + ".jpg"), "JPEG",
            quality=76, optimize=True, progressive=True)

    rows.append((slug, group, w, h,
                 os.path.getsize(os.path.join(FULL, slug + ".jpg")),
                 os.path.getsize(os.path.join(THUMB, slug + ".jpg"))))

rows.sort()
print(f"{'slug':<22}{'group':<8}{'orig':<12}{'full(KB)':>10}{'thumb(KB)':>10}")
for slug, g, w, h, fb, tb in rows:
    print(f"{slug:<22}{g:<8}{str(w)+'x'+str(h):<12}{fb/1024:>10.0f}{tb/1024:>10.0f}")
print("total full MB:", round(sum(r[4] for r in rows)/1024/1024, 2))
print("count:", len(rows))
