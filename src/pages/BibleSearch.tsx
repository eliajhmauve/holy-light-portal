import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, BookOpen, Copy, Check } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import FloatingParticles from "@/components/FloatingParticles";
import verses, { Verse } from "@/data/verses";

const BibleSearch = () => {
  const { lang } = useLang();
  const [query, setQuery] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return verses
      .map((v, i) => ({ ...v, idx: i }))
      .filter(
        (v) =>
          v.zh.toLowerCase().includes(q) ||
          v.en.toLowerCase().includes(q) ||
          v.refZh.toLowerCase().includes(q) ||
          v.refEn.toLowerCase().includes(q)
      );
  }, [query]);

  const handleCopy = (v: Verse, idx: number) => {
    const text =
      lang === "zh"
        ? `${v.zh}\n— ${v.refZh}`
        : `${v.en}\n— ${v.refEn}`;
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const hasQuery = query.trim().length > 0;

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <FloatingParticles count={15} />
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
        className="relative z-10 text-center mt-8 mb-6 px-6"
      >
        <h1 className="font-serif-display text-3xl md:text-4xl font-bold text-foreground">
          🔍 {lang === "zh" ? "經文搜尋" : "Bible Search"}
        </h1>
        <p className="text-muted-foreground text-sm mt-2">
          {lang === "zh"
            ? "輸入關鍵字，搜尋相關經文"
            : "Enter a keyword to search scriptures"}
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative z-10 max-w-2xl mx-auto w-full px-6 mb-8"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === "zh"
                ? "搜尋經文內容或出處（如：平安、詩篇、love）…"
                : "Search verse text or reference (e.g. peace, Psalm, 平安)…"
            }
            className="w-full bg-card border border-border rounded-xl py-4 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            autoFocus
          />
        </div>
      </motion.div>

      {/* Results */}
      <main className="relative z-10 flex-1 max-w-2xl mx-auto w-full px-6 pb-12">
        {hasQuery && (
          <p className="text-muted-foreground text-xs mb-4">
            {lang === "zh"
              ? `找到 ${results.length} 筆結果`
              : `${results.length} result${results.length !== 1 ? "s" : ""} found`}
          </p>
        )}

        <AnimatePresence mode="popLayout">
          {results.map((v, i) => (
            <motion.div
              key={v.idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ delay: i * 0.04 }}
              className="bg-card border border-border rounded-xl p-5 mb-3 group hover:border-gold/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-sm leading-relaxed mb-1">
                    {lang === "zh" ? v.zh : v.en}
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed opacity-60 mb-2">
                    {lang === "zh" ? v.en : v.zh}
                  </p>
                  <p className="text-xs tracking-wider flex items-center gap-1.5" style={{ color: "hsl(var(--gold-warm))" }}>
                    <BookOpen className="w-3 h-3" />
                    {lang === "zh" ? v.refZh : v.refEn}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(v, v.idx)}
                  className="shrink-0 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors opacity-0 group-hover:opacity-100"
                  title={lang === "zh" ? "複製" : "Copy"}
                >
                  {copiedIdx === v.idx ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty states */}
        {hasQuery && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-4xl mb-4">📭</p>
            <p className="text-muted-foreground text-sm">
              {lang === "zh" ? "找不到相關經文，試試其他關鍵字" : "No verses found. Try a different keyword."}
            </p>
          </motion.div>
        )}

        {!hasQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-16"
          >
            <p className="text-4xl mb-4">📖</p>
            <p className="text-muted-foreground text-sm">
              {lang === "zh" ? "輸入關鍵字開始搜尋" : "Type a keyword to start searching"}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {(lang === "zh"
                ? ["平安", "愛", "力量", "信心", "光"]
                : ["peace", "love", "strength", "faith", "light"]
              ).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-xs hover:text-foreground hover:bg-muted/80 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-6 text-center">
        <p className="text-muted-foreground text-xs font-serif-display">
          📖 {lang === "zh" ? "聖光寶典" : "Holy Light Collection"}
        </p>
      </footer>
    </div>
  );
};

export default BibleSearch;
