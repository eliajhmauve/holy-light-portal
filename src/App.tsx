import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ComingSoon from "./pages/ComingSoon";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/daily" element={<ComingSoon toolName="✨ 每日金句 Daily Verse" />} />
            <Route path="/card" element={<ComingSoon toolName="🖼️ 金句圖產生器 Verse Card" />} />
            <Route path="/search" element={<ComingSoon toolName="🔍 經文搜尋 Bible Search" />} />
            <Route path="/parallel" element={<ComingSoon toolName="📖 經文對照 Parallel Bible" />} />
            <Route path="/random" element={<ComingSoon toolName="🎲 隨機經文 Random Verse" />} />
            <Route path="/plan" element={<ComingSoon toolName="📅 讀經進度 Reading Plan" />} />
            <Route path="/quiz" element={<ComingSoon toolName="🧮 聖經問答 Bible Quiz" />} />
            <Route path="/prayer" element={<ComingSoon toolName="🙏 禱告計時器 Prayer Timer" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
