import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

interface ToolCardProps {
  emoji: string;
  zhName: string;
  enName: string;
  zhDesc: string;
  enDesc: string;
  route: string;
  index: number;
}

const ToolCard = ({ emoji, zhName, enName, zhDesc, enDesc, route, index }: ToolCardProps) => {
  const { lang } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link to={route} className="group block">
        <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10 hover:border-gold/30 hover:-translate-y-1">
          {/* Gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="text-4xl mb-4">{emoji}</div>
          
          <h3 className="font-serif-display text-lg font-semibold text-foreground mb-1">
            {lang === "zh" ? zhName : enName}
          </h3>
          
          <p className="text-xs text-muted-foreground mb-3 tracking-wide uppercase">
            {lang === "zh" ? enName : zhName}
          </p>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            {lang === "zh" ? zhDesc : enDesc}
          </p>

          {/* Hover arrow */}
          <div className="mt-4 flex items-center text-gold-warm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
            <span className="text-sm font-medium">{lang === "zh" ? "開始使用" : "Get Started"}</span>
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ToolCard;
