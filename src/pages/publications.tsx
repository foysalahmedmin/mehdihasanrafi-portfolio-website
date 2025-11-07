import { PublicationList } from "@/components/cards/publication-list";
import { SearchFilter } from "@/components/search-filter";
import { Card, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePageSEO } from "@/hooks/utils/usePageSeo";
import type { TBulkPublicationResponse } from "@/types/publication.type";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

const publication_categories = [
  "Abstract",
  "Journal",
  "Conference",
  "Book chapter",
  "Others",
];

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

  // Get unique tags as categories - FIXED: Ensure only strings are returned
  const categories = useMemo(() => {
    const cats = new Set(
      publications
        .map((p) => {
          if (p?.category && publication_categories.includes(p.category)) {
            return p.category;
          }
          return null;
        })
        .filter((category): category is string => category !== null),
    );
    return Array.from(cats).sort();
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
      filtered = filtered.filter((p) => p?.category === selectedCategory);
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

  // Group publications by category according to publication_categories order
  const groupedPublications = useMemo(() => {
    const groups: Record<string, typeof filteredPublications> = {};

    // Initialize all categories with empty arrays
    publication_categories.forEach((category) => {
      groups[category] = [];
    });

    // Add "Other" category for publications that don't match any predefined category
    groups["Other"] = [];

    // Group publications
    filteredPublications.forEach((publication) => {
      const category =
        publication.category &&
        publication_categories.includes(publication.category)
          ? publication.category
          : "Other";

      if (groups[category]) {
        groups[category].push(publication);
      } else {
        groups["Other"].push(publication);
      }
    });

    // Remove empty categories
    Object.keys(groups).forEach((category) => {
      if (groups[category].length === 0) {
        delete groups[category];
      }
    });

    return groups;
  }, [filteredPublications]);

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
            <ul className="grid list-none grid-cols-1 gap-4">
              {[...Array(6)].map((_, i) => (
                <li key={i} className="border-b pb-4 last:border-0 last:pb-0">
                  {/* Simulate author + title + journal line */}
                  <div className="flex flex-wrap items-center">
                    <span className="w-2/10 pr-1">
                      <Skeleton className="h-4 w-full" />
                    </span>
                    <span className="w-5/10 px-1">
                      <Skeleton className="h-4 w-full" />
                    </span>
                    <span className="w-3/10 pl-1">
                      <Skeleton className="h-4 w-full" />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : filteredPublications.length > 0 ? (
            <div className="fade-up">
              {Object.entries(groupedPublications).map(
                ([category, publications]) => (
                  <div key={category} className="mb-8 last:mb-0">
                    <h2 className="text-foreground/80 mb-4 border-b pb-2 text-2xl font-semibold">
                      {category}
                    </h2>
                    <ul className="grid list-none grid-cols-1 gap-4">
                      {publications.map((publication) => (
                        <PublicationList
                          key={publication._id}
                          publication={publication}
                        />
                      ))}
                    </ul>
                  </div>
                ),
              )}
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
