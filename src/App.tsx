import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";

// Pages
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Home from "@/pages/home";
import NewsPage from "@/pages/news";
import NewsDetail from "@/pages/news-detail";
import NotFound from "@/pages/not-found";
import ProjectDetail from "@/pages/project-detail";
import Projects from "@/pages/projects";
import PublicationDetail from "@/pages/publication-detail";
import Publications from "@/pages/publications";
import { Footer } from "./components/partials/Footer";
import { Header } from "./components/partials/Header";

// Admin Pages
import AdminWrapper from "@/components/wrappers/AdminWrapper";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminLogin from "@/pages/admin/login";
import AdminNewsPage from "@/pages/admin/news";
import AdminProjectsPage from "@/pages/admin/projects";
import AdminPublicationsPage from "@/pages/admin/publications";
import AnimationApplier from "./components/appliers/AnimationApplier";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/projects" component={Projects} />
      <Route path="/projects/:slug" component={ProjectDetail} />
      <Route path="/publications" component={Publications} />
      <Route path="/publications/:slug" component={PublicationDetail} />
      <Route path="/news" component={NewsPage} />
      <Route path="/news/:slug" component={NewsDetail} />
      <Route path="/contact" component={Contact} />

      {/* Admin Routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin">
        <AdminWrapper>
          <AdminDashboard />
        </AdminWrapper>
      </Route>
      <Route path="/admin/news">
        <AdminWrapper>
          <AdminNewsPage />
        </AdminWrapper>
      </Route>
      <Route path="/admin/projects">
        <AdminWrapper>
          <AdminProjectsPage />
        </AdminWrapper>
      </Route>
      <Route path="/admin/publications">
        <AdminWrapper>
          <AdminPublicationsPage />
        </AdminWrapper>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {/* Appliers */}
              <AnimationApplier />

              {/* Router */}
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
