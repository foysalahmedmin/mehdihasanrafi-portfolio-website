import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { PublicationCard } from "@/components/cards/publication-card";
import { SearchFilter } from "@/components/search-filter";
import { Card, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Publication } from "@/types";
import { usePageSEO } from "@/hooks/utils/usePageSeo";

export default function Publications() {
  usePageSEO({
    title: "Publications",
    description: "Browse Mehedi Hasan Rafi's academic publications and research papers in atmospheric science, climate modeling, and environmental studies. Peer-reviewed contributions to scientific literature.",
  });
  const { data: publications = [], isLoading } = useQuery<Publication[]>({
    queryKey: ["/api/publications"],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");

  // Get unique tags as categories
  const categories = useMemo(() => {
    const tags = new Set<string>();
    publications.forEach((p) => p?.tags?.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, [publications]);

  // Filter and sort publications
  const filteredPublications = useMemo(() => {
    let filtered = [...publications];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.abstract.toLowerCase().includes(query) ||
          p.venue.toLowerCase().includes(query) ||
          p?.authors?.some((author) => author.toLowerCase().includes(query)) ||
          p?.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Category filter (by tags)
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p?.tags?.includes(selectedCategory));
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
  }, [publications, searchQuery, selectedCategory, sortBy]);

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
              Publications
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A comprehensive collection of my academic publications, research
              papers, and contributions to atmospheric science literature.
              Browse by topic, date, or search for specific research areas.
            </p>
          </div>
        </div>
      </section>

      {/* Publications Section */}
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
              resultsCount={filteredPublications.length}
              onClear={handleClear}
            />
          </div>

          {/* Publications Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </Card>
              ))}
            </div>
          ) : filteredPublications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredPublications.map((publication) => (
                <PublicationCard key={publication.id} publication={publication} />
              ))}
            </div>
          ) : (
            <Card className="p-16 text-center">
              <CardDescription className="text-lg">
                No publications found matching your criteria.
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
