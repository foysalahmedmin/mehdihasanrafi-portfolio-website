import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";

// Pages
import Home from "@/pages/home";
import About from "@/pages/about";
import Projects from "@/pages/projects";
import ProjectDetail from "@/pages/project-detail";
import Publications from "@/pages/publications";
import PublicationDetail from "@/pages/publication-detail";
import NewsPage from "@/pages/news";
import NewsDetail from "@/pages/news-detail";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import { Header } from "./components/partials/Header";
import { Footer } from "./components/partials/Footer";

// Admin Pages
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminNewsPage from "@/pages/admin/news";
import AdminProjectsPage from "@/pages/admin/projects";
import AdminPublicationsPage from "@/pages/admin/publications";
import AdminWrapper from "@/components/wrappers/AdminWrapper";

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
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
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
