import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Servicos from "./pages/Servicos";
import ServicoDetalhe from "./pages/ServicoDetalhe";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogCategoria from "./pages/BlogCategoria";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import Bairro from "./pages/Bairro";
import OndeAtuamos from "./pages/OndeAtuamos";
import RegiaoHub from "./pages/RegiaoHub";
import NotFound from "./pages/NotFound";
import { IntroLoader } from "./components/IntroLoader";
import { useGsapReveal } from "./hooks/useGsapReveal";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function GlobalReveal() {
  useGsapReveal();
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <IntroLoader />
        <ScrollToTop />
        <GlobalReveal />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/servicos/:slug" element={<ServicoDetalhe />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/blog/categoria/:slug" element={<BlogCategoria />} />
          <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/terraplanagem-:slug" element={<Bairro />} />
          <Route path="/terraplanagem-*" element={<Bairro />} />
          <Route path="/onde-atuamos" element={<OndeAtuamos />} />
          <Route path="/onde-atuamos/:slug" element={<RegiaoHub />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
