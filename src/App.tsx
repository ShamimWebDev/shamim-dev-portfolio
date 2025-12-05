import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/project/:id"
          element={
            <PageTransition>
              <ProjectDetail />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

import { MouseEffectProvider } from "@/contexts/MouseEffectContext";
import ScrollToTop from "@/components/ScrollToTop";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <MouseEffectProvider>
        <TooltipProvider>
          <CustomCursor />
          <ScrollProgress />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </MouseEffectProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
