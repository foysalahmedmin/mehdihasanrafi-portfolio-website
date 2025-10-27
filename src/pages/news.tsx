import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { NewsCard } from "@/components/cards/news-card";
import { SearchFilter } from "@/components/search-filter";
import { Card, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePageSEO } from "@/hooks/utils/usePageSeo";
import type { News } from "@/types";

export default function NewsPage() {
  usePageSEO({
    title: "News & Updates",
    description: "Stay updated with the latest news, conference presentations, awards, and research milestones from Mehedi Hasan Rafi's academic journey in atmospheric science.",
  });
  const { data: news = [], isLoading } = useQuery<News[]>({
    queryKey: ["/api/news"],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(news.map((n) => n.category));
    return Array.from(cats).sort();
  }, [news]);

  // Filter and sort news
  const filteredNews = useMemo(() => {
    let filtered = [...news];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(query) ||
          n.summary.toLowerCase().includes(query) ||
          n.content.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((n) => n.category === selectedCategory);
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
  }, [news, searchQuery, selectedCategory, sortBy]);

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
              News & Updates
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Stay informed about the latest developments in my research,
              conference presentations, awards, and other significant milestones
              in my academic journey.
            </p>
          </div>
        </div>
      </section>

      {/* News Section */}
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
              resultsCount={filteredNews.length}
              onClear={handleClear}
            />
          </div>

          {/* News Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-video w-full" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredNews.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          ) : (
            <Card className="p-16 text-center">
              <CardDescription className="text-lg">
                No news found matching your criteria.
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
