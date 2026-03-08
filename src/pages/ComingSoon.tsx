import { Link } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";

const ComingSoon = ({ toolName }: { toolName: string }) => {
  const { lang } = useLang();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-serif-display text-4xl font-bold text-foreground mb-4">{toolName}</h1>
      <p className="text-muted-foreground text-lg mb-8">
        {lang === "zh" ? "即將推出，敬請期待 ✨" : "Coming soon, stay tuned ✨"}
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-gold/40 hover:shadow-md"
      >
        ← {lang === "zh" ? "返回首頁" : "Back to Home"}
      </Link>
    </div>
  );
};

export default ComingSoon;
