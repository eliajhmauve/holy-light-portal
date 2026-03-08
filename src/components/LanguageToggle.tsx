import { useLang } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { lang, toggle } = useLang();

  return (
    <button
      onClick={toggle}
      className="fixed top-6 right-6 z-50 flex items-center gap-1.5 rounded-full border border-border bg-card/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-gold/40 hover:shadow-md"
    >
      <span className={lang === "zh" ? "text-gold-warm font-semibold" : "text-muted-foreground"}>中</span>
      <span className="text-border">/</span>
      <span className={lang === "en" ? "text-gold-warm font-semibold" : "text-muted-foreground"}>EN</span>
    </button>
  );
};

export default LanguageToggle;
