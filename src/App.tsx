import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, Component, ErrorInfo, ReactNode } from "react";
import { Loader2 } from "lucide-react";

import { ThemeProvider } from "@/components/theme-provider"

const Index = lazy(() => import("./pages/Index"));
const InfluencersPage = lazy(() => import("./pages/InfluencersPage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const ProductShootPage = lazy(() => import("./pages/ProductShootPage"));
const AdsPage = lazy(() => import("./pages/AdsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();



class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Something went wrong</h1>
          <p className="text-muted-foreground mb-4">We encountered an error while loading the page.</p>
          <pre className="bg-secondary/50 p-4 rounded-lg text-xs font-mono text-left max-w-2xl overflow-auto border border-border">
            {this.state.error?.message}
            {this.state.error?.stack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/influencers" element={<InfluencersPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/product-shoot" element={<ProductShootPage />} />
                <Route path="/sample-ads" element={<AdsPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
