import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RefreshCw, ArrowLeft, Share2 } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import FloatingParticles from "@/components/FloatingParticles";
import { getDailyVerse } from "@/data/verses";
import { useMemo, useState } from "react";
import verses from "@/data/verses";

const DailyVerse = () => {
  const { lang } = useLang();
  const dailyVerse = useMemo(() => getDailyVerse(), []);
  const [currentVerse, setCurrentVerse] = useState(dailyVerse);
  const [isDaily, setIsDaily] = useState(true);
  const [animKey, setAnimKey] = useState(0);

  const handleRandom = () => {
    const random = verses[Math.floor(Math.random() * verses.length)];
    setCurrentVerse(random);
    setIsDaily(false);
    setAnimKey((k) => k + 1);
  };

  const handleBackToDaily = () => {
    setCurrentVerse(dailyVerse);
    setIsDaily(true);
    setAnimKey((k) => k + 1);
  };

  const handleShare = async () => {
    const text = lang === "zh"
      ? `「${currentVerse.zh}」\n— ${currentVerse.refZh}\n\n📖 聖光寶典`
      : `"${currentVerse.en}"\n— ${currentVerse.refEn}\n\n📖 Holy Light Collection`;
    
    if (navigator.share) {
      await navigator.share({ text });
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  const today = new Date();
  const dateStr = lang === "zh"
    ? `${today.getFullYear()} 年 ${today.getMonth() + 1} 月 ${today.getDate()} 日`
    : today.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <FloatingParticles count={20} />
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

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full">
          {/* Date & Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <p className="text-muted-foreground text-sm tracking-widest uppercase mb-2">
              {dateStr}
            </p>
            <h1 className="font-serif-display text-3xl md:text-4xl font-bold text-foreground">
              ✨ {lang === "zh" ? "每日金句" : "Daily Verse"}
            </h1>
            {!isDaily && (
              <button
                onClick={handleBackToDaily}
                className="mt-2 text-xs text-gold-warm hover:underline"
              >
                {lang === "zh" ? "← 回到今日金句" : "← Back to today's verse"}
              </button>
            )}
          </motion.div>

          {/* Verse Card */}
          <motion.div
            key={animKey}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            {/* Glow behind card */}
            <div className="absolute -inset-4 bg-gold/5 rounded-3xl blur-2xl" />

            <div className="relative bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg">
              {/* Decorative top line */}
              <div className="w-12 h-0.5 bg-gradient-to-r from-gold-warm to-gold mx-auto mb-8" />

              {/* Verse text */}
              <blockquote className="text-center">
                <p className="font-serif-display text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground mb-6">
                  {lang === "zh"
                    ? `「${currentVerse.zh}」`
                    : `"${currentVerse.en}"`}
                </p>

                {/* Secondary language */}
                <p className="text-sm md:text-base text-muted-foreground italic leading-relaxed mb-8">
                  {lang === "zh"
                    ? `"${currentVerse.en}"`
                    : `「${currentVerse.zh}」`}
                </p>

                {/* Reference */}
                <cite className="block text-gold-warm font-serif-display text-base md:text-lg not-italic tracking-wide">
                  — {lang === "zh" ? currentVerse.refZh : currentVerse.refEn}
                </cite>
              </blockquote>

              {/* Decorative bottom line */}
              <div className="w-12 h-0.5 bg-gradient-to-r from-gold-warm to-gold mx-auto mt-8" />
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <button
              onClick={handleRandom}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground hover:border-gold/40 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              {lang === "zh" ? "再抽一句" : "Another Verse"}
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-warm text-primary-foreground text-sm hover:opacity-90 transition-all"
            >
              <Share2 className="w-4 h-4" />
              {lang === "zh" ? "分享" : "Share"}
            </button>
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

export default DailyVerse;
