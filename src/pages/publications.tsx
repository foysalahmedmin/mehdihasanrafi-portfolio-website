import { PublicationCard } from "@/components/cards/publication-card";
import { SearchFilter } from "@/components/search-filter";
import { Card, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePageSEO } from "@/hooks/utils/usePageSeo";
import type { TBulkPublicationResponse } from "@/types/publication.type";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export default function Publications() {
  usePageSEO({
    title: "Publications",
    description:
      "Browse Mehedi Hasan Rafi's academic publications and research papers in atmospheric science, climate modeling, and environmental studies. Peer-reviewed contributions to scientific literature.",
  });
  const { data: publicationsResponse, isLoading } =
    useQuery<TBulkPublicationResponse>({
      queryKey: ["/api/publications"],
    });

  const publications = publicationsResponse?.data || [];

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
          p?.tags?.some((tag) => tag.toLowerCase().includes(query)),
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
          return (
            new Date(b.published_at ?? "").getTime() -
            new Date(a.published_at ?? "").getTime()
          );
        case "date-asc":
          return (
            new Date(a.published_at ?? "").getTime() -
            new Date(b.published_at ?? "").getTime()
          );
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
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Header Section */}
      <section className="bg-accent/20 border-b py-12 lg:py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="fade-up max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold lg:text-5xl">
              Publications
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              A comprehensive collection of my academic publications, research
              papers, and contributions to atmospheric science literature.
              Browse by topic, date, or search for specific research areas.
            </p>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section className="flex-1 py-12 lg:py-16">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Search and Filter */}
          <div className="fade-down mb-8 lg:mb-12">
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="space-y-4 p-6">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </Card>
              ))}
            </div>
          ) : filteredPublications.length > 0 ? (
            <div className="fade-up grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {filteredPublications.map((publication) => (
                <PublicationCard
                  key={publication._id}
                  publication={publication}
                />
              ))}
            </div>
          ) : (
            <Card className="p-16 text-center">
              <CardDescription className="text-lg">
                No publications found matching your criteria.
                {(searchQuery || selectedCategory !== "all") && (
                  <span className="mt-2 block">
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
