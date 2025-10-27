import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProjectCard } from "@/components/cards/project-card";
import { SearchFilter } from "@/components/search-filter";
import { Card, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Project } from "@/types";
import { usePageSEO } from "@/hooks/utils/usePageSeo";

export default function Projects() {
  usePageSEO({
    title: "Research Projects",
    description: "Explore Mehedi Hasan Rafi's research projects in atmospheric science, climate modeling, remote sensing, and environmental studies. Discover innovative approaches to understanding Earth's atmosphere.",
  });
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return Array.from(cats).sort();
  }, [projects]);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p?.title?.toLowerCase().includes(query) ||
          p?.description?.toLowerCase().includes(query) ||
          p?.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [projects, searchQuery, selectedCategory, sortBy]);

  const handleClear = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("date-desc");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="py-12 lg:py-16 border-b bg-accent/20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Research Projects
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore my research initiatives in atmospheric science, climate
              modeling, and environmental studies. Each project represents a
              unique contribution to understanding our planet's atmosphere.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-12 lg:py-16 flex-1">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Search and Filter */}
          <div className="mb-8 lg:mb-12">
            <SearchFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categories}
              sortBy={sortBy}
              onSortChange={setSortBy}
              resultsCount={filteredProjects.length}
              onClear={handleClear}
            />
          </div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-video w-full" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <Card className="p-16 text-center">
              <CardDescription className="text-lg">
                No projects found matching your criteria.
                {(searchQuery || selectedCategory !== "all") && (
                  <span className="block mt-2">
                    Try adjusting your filters or search query.
                  </span>
                )}
              </CardDescription>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
