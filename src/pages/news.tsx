import { NewsCard } from "@/components/cards/news-card";
import { SearchFilter } from "@/components/search-filter";
import { Card, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePageSEO } from "@/hooks/utils/usePageSeo";
import type { TBulkNewsResponse } from "@/types/news.type";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export default function NewsPage() {
  usePageSEO({
    title: "News & Updates",
    description:
      "Stay updated with the latest news, conference presentations, awards, and research milestones from Mehedi Hasan Rafi's academic journey in atmospheric science.",
  });
  const { data: bulkNewsResponse, isLoading } = useQuery<TBulkNewsResponse>({
    queryKey: ["/api/news"],
  });

  const bulkNews = bulkNewsResponse?.data || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(bulkNews.map((n) => n.category));
    return Array.from(cats).sort();
  }, [bulkNews]);

  // Filter and sort news
  const filteredNews = useMemo(() => {
    let filtered = [...bulkNews];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered?.filter(
        (n) =>
          n?.title?.toLowerCase().includes(query) ||
          n?.description?.toLowerCase().includes(query) ||
          n?.tags?.some((tag) => tag?.toLowerCase().includes(query)),
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered?.filter((n) => n?.category === selectedCategory);
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
  }, [bulkNews, searchQuery, selectedCategory, sortBy]);

  const handleClear = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("date-desc");
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header Section */}
      <section className="bg-accent/20 border-b py-12 lg:py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold lg:text-5xl">
              News & Updates
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Stay informed about the latest developments in my research,
              conference presentations, awards, and other significant milestones
              in my academic journey.
            </p>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="flex-1 py-12 lg:py-16">
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-video w-full" />
                  <div className="space-y-3 p-6">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {filteredNews.map((item) => (
                <NewsCard key={item._id} news={item} />
              ))}
            </div>
          ) : (
            <Card className="p-16 text-center">
              <CardDescription className="text-lg">
                No news found matching your criteria.
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
