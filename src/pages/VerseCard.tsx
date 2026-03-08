import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, RotateCcw, Type, Palette } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import FloatingParticles from "@/components/FloatingParticles";
import verses, { Verse } from "@/data/verses";
import html2canvas from "html2canvas";

/* ─── Style presets ─── */
const CARD_STYLES = [
  {
    id: "golden-light",
    nameZh: "金色聖光",
    nameEn: "Golden Light",
    bg: "linear-gradient(145deg, #2c1810 0%, #4a2c17 40%, #6b3a1f 100%)",
    textColor: "#f5e6c8",
    refColor: "#d4a44a",
    accent: "#d4a44a",
  },
  {
    id: "morning-sky",
    nameZh: "晨曦微光",
    nameEn: "Morning Sky",
    bg: "linear-gradient(145deg, #1a1a3e 0%, #2d3a6e 40%, #4a6fa5 100%)",
    textColor: "#e8eaf6",
    refColor: "#90caf9",
    accent: "#64b5f6",
  },
  {
    id: "olive-garden",
    nameZh: "橄欖園",
    nameEn: "Olive Garden",
    bg: "linear-gradient(145deg, #1b2e1b 0%, #2e4a2e 40%, #4a6b4a 100%)",
    textColor: "#e8f5e9",
    refColor: "#a5d6a7",
    accent: "#81c784",
  },
  {
    id: "pure-white",
    nameZh: "素白簡約",
    nameEn: "Pure White",
    bg: "linear-gradient(145deg, #faf8f5 0%, #f5f0e8 40%, #ede4d4 100%)",
    textColor: "#2c2418",
    refColor: "#8b6914",
    accent: "#c49a2a",
  },
  {
    id: "midnight",
    nameZh: "深夜禱告",
    nameEn: "Midnight Prayer",
    bg: "linear-gradient(145deg, #0d0d1a 0%, #1a1a2e 40%, #252540 100%)",
    textColor: "#d4d4e8",
    refColor: "#9e8fdf",
    accent: "#7c6bc4",
  },
  {
    id: "rose-dawn",
    nameZh: "玫瑰晨光",
    nameEn: "Rose Dawn",
    bg: "linear-gradient(145deg, #3a1a2a 0%, #5c2a3e 40%, #8c4a5e 100%)",
    textColor: "#fce4ec",
    refColor: "#f48fb1",
    accent: "#ec407a",
  },
];

const FONT_OPTIONS = [
  { id: "serif", nameZh: "襯線體", nameEn: "Serif", family: "'Noto Serif TC', 'Crimson Text', serif" },
  { id: "sans", nameZh: "黑體", nameEn: "Sans", family: "'Noto Sans TC', sans-serif" },
];

const VerseCard = () => {
  const { lang } = useLang();
  const cardRef = useRef<HTMLDivElement>(null);

  // State
  const [selectedVerseIdx, setSelectedVerseIdx] = useState(0);
  const [customMode, setCustomMode] = useState(false);
  const [customText, setCustomText] = useState("");
  const [customRef, setCustomRef] = useState("");
  const [styleIdx, setStyleIdx] = useState(0);
  const [fontIdx, setFontIdx] = useState(0);
  const [showBilingual, setShowBilingual] = useState(true);
  const [downloading, setDownloading] = useState(false);

  const style = CARD_STYLES[styleIdx];
  const font = FONT_OPTIONS[fontIdx];
  const verse: Verse = verses[selectedVerseIdx];

  const primaryText = customMode
    ? customText || (lang === "zh" ? "請輸入經文…" : "Enter verse text…")
    : lang === "zh" ? verse.zh : verse.en;

  const secondaryText = customMode
    ? ""
    : lang === "zh" ? verse.en : verse.zh;

  const refText = customMode
    ? customRef || (lang === "zh" ? "出處" : "Reference")
    : lang === "zh" ? verse.refZh : verse.refEn;

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        backgroundColor: null,
        useCORS: true,
      });
      const link = document.createElement("a");
      link.download = `verse-card-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LanguageToggle />

      {/* Header */}
      <header className="relative z-10 px-6 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === "zh" ? "返回首頁" : "Back to Home"}
        </Link>
      </header>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mt-8 mb-6 px-6"
      >
        <h1 className="font-serif-display text-3xl md:text-4xl font-bold text-foreground">
          🖼️ {lang === "zh" ? "金句圖產生器" : "Verse Card Generator"}
        </h1>
        <p className="text-muted-foreground text-sm mt-2">
          {lang === "zh"
            ? "選擇經文與風格，製作精美分享圖片"
            : "Choose a verse & style to create shareable images"}
        </p>
      </motion.div>

      {/* Main content */}
      <main className="flex-1 px-4 md:px-8 pb-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ─── Left: Controls ─── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Verse Source Toggle */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Type className="w-4 h-4 text-gold-warm" />
                <h2 className="font-serif-display text-lg font-semibold text-foreground">
                  {lang === "zh" ? "選擇經文" : "Choose Verse"}
                </h2>
              </div>

              {/* Toggle custom/preset */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setCustomMode(false)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    !customMode
                      ? "bg-gold-warm text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {lang === "zh" ? "內建經文" : "Preset Verses"}
                </button>
                <button
                  onClick={() => setCustomMode(true)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    customMode
                      ? "bg-gold-warm text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {lang === "zh" ? "自訂經文" : "Custom Text"}
                </button>
              </div>

              {customMode ? (
                <div className="space-y-3">
                  <textarea
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder={lang === "zh" ? "輸入經文內容…" : "Enter verse text…"}
                    className="w-full bg-background border border-border rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground resize-none h-24 focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <input
                    value={customRef}
                    onChange={(e) => setCustomRef(e.target.value)}
                    placeholder={lang === "zh" ? "出處（如：詩篇 23:1）" : "Reference (e.g. Psalm 23:1)"}
                    className="w-full bg-background border border-border rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              ) : (
                <>
                  <select
                    value={selectedVerseIdx}
                    onChange={(e) => setSelectedVerseIdx(Number(e.target.value))}
                    className="w-full bg-background border border-border rounded-lg p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {verses.map((v, i) => (
                      <option key={i} value={i}>
                        {lang === "zh" ? v.refZh : v.refEn} — {lang === "zh" ? v.zh.slice(0, 20) : v.en.slice(0, 30)}…
                      </option>
                    ))}
                  </select>
                  <label className="flex items-center gap-2 mt-3 text-sm text-muted-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showBilingual}
                      onChange={(e) => setShowBilingual(e.target.checked)}
                      className="accent-[hsl(var(--gold-warm))] w-4 h-4"
                    />
                    {lang === "zh" ? "顯示雙語" : "Show bilingual"}
                  </label>
                </>
              )}
            </div>

            {/* Style Selection */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-4 h-4 text-gold-warm" />
                <h2 className="font-serif-display text-lg font-semibold text-foreground">
                  {lang === "zh" ? "選擇風格" : "Choose Style"}
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {CARD_STYLES.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setStyleIdx(i)}
                    className={`relative rounded-xl overflow-hidden aspect-[4/3] transition-all ${
                      styleIdx === i
                        ? "ring-2 ring-gold-warm ring-offset-2 ring-offset-background scale-105"
                        : "hover:scale-102 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <div
                      className="absolute inset-0"
                      style={{ background: s.bg }}
                    />
                    <div className="relative z-10 flex items-end p-2">
                      <span
                        className="text-[10px] font-medium leading-tight"
                        style={{ color: s.textColor }}
                      >
                        {lang === "zh" ? s.nameZh : s.nameEn}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Font Selection */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h2 className="font-serif-display text-lg font-semibold text-foreground mb-3">
                {lang === "zh" ? "字體" : "Font"}
              </h2>
              <div className="flex gap-3">
                {FONT_OPTIONS.map((f, i) => (
                  <button
                    key={f.id}
                    onClick={() => setFontIdx(i)}
                    className={`flex-1 py-3 rounded-lg text-sm transition-all ${
                      fontIdx === i
                        ? "bg-gold-warm text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                    style={{ fontFamily: f.family }}
                  >
                    {lang === "zh" ? f.nameZh : f.nameEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gold-warm text-primary-foreground text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                {downloading
                  ? lang === "zh" ? "產生中…" : "Generating…"
                  : lang === "zh" ? "下載圖片" : "Download Image"}
              </button>
              <button
                onClick={() => {
                  setSelectedVerseIdx(Math.floor(Math.random() * verses.length));
                  setCustomMode(false);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:border-gold/40 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                {lang === "zh" ? "隨機" : "Random"}
              </button>
            </div>
          </motion.div>

          {/* ─── Right: Preview ─── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <p className="text-muted-foreground text-xs mb-3 tracking-widest uppercase">
              {lang === "zh" ? "預覽" : "Preview"}
            </p>

            {/* Card Preview */}
            <div className="relative w-full max-w-md">
              {/* Glow */}
              <div
                className="absolute -inset-4 rounded-3xl blur-2xl opacity-20"
                style={{ background: style.bg }}
              />

              {/* The actual card to export */}
              <div
                ref={cardRef}
                className="relative w-full rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  background: style.bg,
                  aspectRatio: "3 / 4",
                  fontFamily: font.family,
                }}
              >
                {/* Decorative elements */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12">
                  {/* Top accent line */}
                  <div
                    className="w-10 h-0.5 rounded-full mb-8"
                    style={{ backgroundColor: style.accent, opacity: 0.6 }}
                  />

                  {/* Cross icon */}
                  <div
                    className="text-2xl mb-6 opacity-40"
                    style={{ color: style.accent }}
                  >
                    ✦
                  </div>

                  {/* Primary text */}
                  <p
                    className="text-center text-lg md:text-xl leading-relaxed font-medium mb-4"
                    style={{ color: style.textColor }}
                  >
                    {primaryText}
                  </p>

                  {/* Secondary text (bilingual) */}
                  {showBilingual && !customMode && secondaryText && (
                    <p
                      className="text-center text-xs md:text-sm leading-relaxed mb-6 opacity-60"
                      style={{ color: style.textColor }}
                    >
                      {secondaryText}
                    </p>
                  )}

                  {/* Reference */}
                  <div
                    className="w-8 h-px rounded-full my-4"
                    style={{ backgroundColor: style.accent, opacity: 0.4 }}
                  />
                  <p
                    className="text-center text-sm tracking-wider"
                    style={{ color: style.refColor }}
                  >
                    — {refText}
                  </p>

                  {/* Bottom accent */}
                  <div
                    className="w-10 h-0.5 rounded-full mt-8"
                    style={{ backgroundColor: style.accent, opacity: 0.6 }}
                  />
                </div>

                {/* Subtle corner decorations */}
                <div
                  className="absolute top-4 left-4 w-8 h-8 border-t border-l rounded-tl-sm opacity-20"
                  style={{ borderColor: style.accent }}
                />
                <div
                  className="absolute bottom-4 right-4 w-8 h-8 border-b border-r rounded-br-sm opacity-20"
                  style={{ borderColor: style.accent }}
                />

                {/* Watermark */}
                <div
                  className="absolute bottom-3 left-0 right-0 text-center text-[9px] tracking-[0.2em] opacity-30"
                  style={{ color: style.textColor }}
                >
                  HOLY LIGHT COLLECTION
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center">
        <p className="text-muted-foreground text-xs font-serif-display">
          📖 {lang === "zh" ? "聖光寶典" : "Holy Light Collection"}
        </p>
      </footer>
    </div>
  );
};

export default VerseCard;
