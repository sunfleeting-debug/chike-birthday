/**
 * 全站内容与素材索引。
 * 想改文字、换照片顺序，只改这个文件就够了。
 */

const BASE = import.meta.env.BASE_URL || "/";

/** 拼接带 base 前缀的资源路径，保证部署到 GitHub Pages 子路径也能取到图 */
export const asset = (p) =>
  `${BASE.replace(/\/$/, "")}/${String(p).replace(/^\//, "")}`;

export const PROFILE = {
  name: "尺K",
  birthday: "2006.09.01", // 出生的那天
  celebrate: "2026.10.10", // 这份礼物送出的日子
  age: 20,
  sign: "处女座",
};

/* ------------------------------------------------------------------ */
/* 照片                                                                */
/* ------------------------------------------------------------------ */

/** 分组元信息：顺序即画廊里的展示顺序 */
export const GROUPS = [
  {
    key: "river",
    label: "江边",
    en: "Riverside",
    note: "风大，你站得挺稳。",
  },
  {
    key: "high",
    label: "高处",
    en: "Higher Up",
    note: "缆车升起来的时候，你终于舍得摘下一只耳机。",
  },
  {
    key: "us",
    label: "我们",
    en: "Us",
    note: "两个人的背影，比江面还安静。",
  },
];

/**
 * orient: "p" 竖构图 / "l" 横构图 —— 画廊用不同比例排版
 * hero: 是否适合当封面主视觉
 */
export const PHOTOS = [
  // ---- 江边 ----
  {
    slug: "river-01-hero",
    group: "river",
    orient: "p",
    hero: true,
    caption: "两手一叉站在石头上，像在巡视一片只属于你的江面。",
  },
  {
    slug: "river-02-stand",
    group: "river",
    orient: "p",
    hero: true,
    caption: "江风不小，你还是笑得挺稳。",
  },
  {
    slug: "river-03-lean",
    group: "river",
    orient: "l",
    caption: "耳机里放着什么，只有你自己知道。",
  },
  {
    slug: "river-04-lean2",
    group: "river",
    orient: "l",
    caption: "同一个姿势，再拍一张，我也没舍得删。",
  },
  {
    slug: "river-05-sit",
    group: "river",
    orient: "l",
    caption: "坐着也在忙，手机里大概是很重要的事。",
  },
  {
    slug: "river-06-hips",
    group: "river",
    orient: "p",
    caption: "叉腰的标准姿势，第一次出现。",
  },
  {
    slug: "river-07-hips2",
    group: "river",
    orient: "p",
    caption: "换个角度，还是那副很有底气的样子。",
  },
  {
    slug: "river-08-hips3",
    group: "river",
    orient: "p",
    caption: "江对面是整座城，你站在最小的一块石头上。",
  },
  {
    slug: "river-09-hips4",
    group: "river",
    orient: "p",
    caption: "这一张留白最多，最适合发呆。",
  },
  {
    slug: "river-10-selfie",
    group: "river",
    orient: "p",
    caption: "自拍第一张，表情还在酝酿。",
  },
  {
    slug: "river-11-selfie2",
    group: "river",
    orient: "p",
    caption: "自拍第二张，认真起来了。",
  },
  {
    slug: "river-12-selfie3",
    group: "river",
    orient: "p",
    caption: "第三张终于笑出来，比个手势收工。",
  },

  // ---- 高处 ----
  {
    slug: "high-01-cable",
    group: "high",
    orient: "p",
    caption: "缆车刚离地，你还没习惯这个高度。",
  },
  {
    slug: "high-02-cable2",
    group: "high",
    orient: "p",
    caption: "比个手势，自己先被逗笑。",
  },
  {
    slug: "high-03-cable3",
    group: "high",
    orient: "p",
    grayscale: true,
    caption: "这一张做成了黑白——因为笑得很干净。",
  },
  {
    slug: "high-04-wheel",
    group: "high",
    orient: "l",
    caption: "摩天轮在后面慢慢转，你在前面发呆。",
  },

  // ---- 我们 ----
  {
    slug: "us-03-koi",
    group: "us",
    orient: "p",
    caption: "锦鲤池边，你说这水比江里的清多了。",
  },
  {
    slug: "us-01-bench",
    group: "us",
    orient: "l",
    caption: "长椅上把胳膊摊开，江就整个归你了。",
  },
  {
    slug: "us-02-bench2",
    group: "us",
    orient: "l",
    caption: "那一整个下午，我们都没说什么话。",
  },
  {
    slug: "us-04-ktv",
    group: "us",
    orient: "p",
    caption: "麦克风一拿，谁也不认。",
  },
  {
    slug: "us-05-ktv2",
    group: "us",
    orient: "p",
    caption: "唱到副歌，两个人都在破音边缘。",
  },
];

export const fullSrc = (photo) => asset(`photos/full/${photo.slug}.jpg`);
export const thumbSrc = (photo) => asset(`photos/thumb/${photo.slug}.jpg`);

export const photosByGroup = (key) =>
  key === "all" ? PHOTOS : PHOTOS.filter((p) => p.group === key);

export const HERO_PHOTOS = PHOTOS.filter((p) => p.hero);

/* ------------------------------------------------------------------ */
/* 各屏文案                                                            */
/* ------------------------------------------------------------------ */

export const SCREENS = [
  { key: "cover", label: "封面", en: "Cover" },
  { key: "about", label: "关于", en: "About" },
  { key: "moments", label: "时刻", en: "Moments" },
  { key: "letter", label: "生日", en: "Birthday" },
];

/** 第二屏：关于他 */
export const ABOUT = {
  title: ["关于", "尺K"],
  en: "About",
  index: "01",
  paragraphs: [
    "认识你挺久了，久到已经想不起第一次说话是什么时候。",
    "你身上最固定的一个配件是那副耳机——从江边到缆车，从长椅到锦鲤池，走到哪都挂着，像随时在听一首别人听不到的歌。",
    "你不算话多的人，但笑起来动静不小。拍照时你最爱两个姿势：一是两手一叉站在石头上，像在巡视一片只属于你的江面；二是冲着镜头比个手势，然后自己先笑场。",
    "这些照片都是随手拍的，没有一张是摆好了等你。可翻回去看，每一张里的你都挺自在。",
    "这大概就是二十岁该有的样子。",
  ],
  facts: [
    { k: "出生", v: "2006.09.01" },
    { k: "今年", v: "二十岁" },
    { k: "标配", v: "一副耳机" },
    { k: "招牌动作", v: "两手一叉" },
  ],
};

/** 第三屏：时刻 */
export const MOMENTS = {
  title: ["这些", "时刻"],
  en: "Moments 2026",
  index: "02",
  lead: "一共 21 张。没有修过脸，只调过一点点亮度——因为本来就好看。",
};

/** 第四屏：生日信 */
export const LETTER = {
  title: ["写给", "二十岁"],
  en: "Happy 20th",
  index: "03",
  salutation: "尺K：",
  body: [
    "二十岁生日快乐。",
    "十八岁那年你以为成年是件大事，二十岁不会——它来得悄无声息，就像这些照片，一张一张地攒着，等你回头才发现已经这么多了。",
    "没什么大道理要跟你讲。就一句：往后你想去哪，都去；想做的事，趁早做。缺钱了别硬扛，缺人陪也别硬撑。",
    "江那么宽，你脚下那块石头那么小。可你每次都站得挺稳。",
    "这个网页是我一点点做的。照片是你，代码是我，算我们合了个影。",
  ],
  signature: "—— 你的兄弟",
  cakeHint: "点一下蛋糕，把蜡烛点亮。",
  goodHint: "蜡烛亮了。",
  blowHint: "深吸一口气，吹灭它。",
  wishTitle: "愿望实现了",
  wishBody: "—— 其实许愿这件事，说出来就不灵了。\n所以剩下的，等你二十岁这一年自己去看。",
};
