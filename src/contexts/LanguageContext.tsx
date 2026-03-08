import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "zh" | "en";

interface LanguageContextType {
  lang: Lang;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextType>({ lang: "zh", toggle: () => {} });

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("zh");
  const toggle = () => setLang((l) => (l === "zh" ? "en" : "zh"));
  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
