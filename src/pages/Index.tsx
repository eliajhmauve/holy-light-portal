import { motion } from "framer-motion";
import { useMemo } from "react";
import { useLang } from "@/contexts/LanguageContext";
import ToolCard from "@/components/ToolCard";
import LanguageToggle from "@/components/LanguageToggle";
import heroImage from "@/assets/hero-light.jpg";

const FloatingParticles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 6,
        duration: Math.random() * 4 + 4,
        opacity: Math.random() * 0.4 + 0.1,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold-light"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [p.opacity, p.opacity + 0.35, p.opacity],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const tools = [
  { emoji: "✨", zhName: "每日金句", enName: "Daily Verse", route: "/daily", zhDesc: "每天一句經文鼓勵", enDesc: "A verse of encouragement every day" },
  { emoji: "🖼️", zhName: "金句圖產生器", enName: "Verse Card", route: "/card", zhDesc: "製作經文分享圖", enDesc: "Create shareable verse cards" },
  { emoji: "🔍", zhName: "經文搜尋", enName: "Bible Search", route: "/search", zhDesc: "關鍵字搜尋經文", enDesc: "Search scriptures by keyword" },
  { emoji: "📖", zhName: "經文對照", enName: "Parallel Bible", route: "/parallel", zhDesc: "多版本並排對照", enDesc: "Compare multiple translations" },
  { emoji: "🎲", zhName: "隨機經文", enName: "Random Verse", route: "/random", zhDesc: "按主題抽經文", enDesc: "Draw verses by topic" },
  { emoji: "📅", zhName: "讀經進度", enName: "Reading Plan", route: "/plan", zhDesc: "讀經打卡追蹤", enDesc: "Track your reading progress" },
  { emoji: "🧮", zhName: "聖經問答", enName: "Bible Quiz", route: "/quiz", zhDesc: "聖經知識測驗", enDesc: "Test your Bible knowledge" },
  { emoji: "🙏", zhName: "禱告計時器", enName: "Prayer Timer", route: "/prayer", zhDesc: "禱告倒數計時", enDesc: "Prayer countdown timer" },
];

const Index = () => {
  const { lang } = useLang();

  return (
    <div className="min-h-screen bg-background">
      <LanguageToggle />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-cathedral-dark/70 via-cathedral-dark/50 to-background" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold-light text-lg mb-4 tracking-[0.3em] uppercase">
              Holy Light Collection
            </p>
            <h1 className="font-serif-display text-5xl md:text-7xl font-bold text-gold-light mb-8 leading-tight">
              📖 {lang === "zh" ? "聖光寶典" : "Holy Light Collection"}
            </h1>
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="max-w-2xl"
          >
            <p className="font-serif-display text-xl md:text-2xl text-gold-light/90 italic leading-relaxed">
              {lang === "zh"
                ? "「你的話是我腳前的燈，是我路上的光。」"
                : '"Your word is a lamp for my feet, a light on my path."'}
            </p>
            <cite className="block mt-4 text-gold-light/60 text-sm not-italic tracking-wider">
              {lang === "zh" ? "— 詩篇 119:105" : "— Psalm 119:105"}
            </cite>
          </motion.blockquote>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-gold-light/30 flex items-start justify-center p-1.5"
            >
              <div className="w-1.5 h-2.5 rounded-full bg-gold-light/50" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-serif-display text-3xl md:text-4xl font-semibold text-foreground mb-3">
            {lang === "zh" ? "探索工具" : "Explore Tools"}
          </h2>
          <p className="text-muted-foreground text-lg">
            {lang === "zh" ? "八個聖經工具，開始你的靈修旅程" : "Eight Bible tools to begin your devotional journey"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tools.map((tool, i) => (
            <ToolCard key={tool.route} {...tool} index={i} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 text-center">
        <p className="text-muted-foreground text-sm font-serif-display">
          📖 {lang === "zh" ? "聖光寶典" : "Holy Light Collection"} — {lang === "zh" ? "願主的光照亮你的道路" : "May the Lord's light illuminate your path"}
        </p>
      </footer>
    </div>
  );
};

export default Index;
