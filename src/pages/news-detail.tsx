import { NewsCard } from "@/components/cards/news-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { TNews } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Link, useRoute } from "wouter";

export default function NewsDetail() {
  const [, params] = useRoute("/news/:slug");
  const slug = params?.slug;

  const { data: newsItem, isLoading } = useQuery<TNews>({
    queryKey: ["/api/news", slug],
    queryFn: async () => {
      const response = await fetch(`/api/news/${slug}`);
      if (!response.ok) {
        throw new Error("News article not found");
      }
      return response.json();
    },
    enabled: !!slug,
  });

  const { data: allNews = [] } = useQuery<TNews[]>({
    queryKey: ["/api/news"],
  });

  // Get related news (same category, excluding current)
  const relatedNews = allNews
    .filter((n) => n.category === newsItem?.category && n.slug !== slug)
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <section className="py-12 lg:py-16">
          <div className="container mx-auto max-w-4xl px-6 lg:px-8">
            <Skeleton className="mb-8 h-8 w-32" />
            <Skeleton className="mb-4 h-12 w-3/4" />
            <Skeleton className="mb-8 h-6 w-1/2" />
            <Skeleton className="mb-8 aspect-[21/9] w-full" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Card className="max-w-md p-12 text-center">
          <CardDescription className="mb-4 text-lg">
            News article not found
          </CardDescription>
          <Link href="/news">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <section className="border-b py-6">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8">
          <Link href="/news">
            <Button variant="ghost" size="sm" data-testid="button-back-news">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Button>
          </Link>
        </div>
      </section>

      {/* News Header */}
      <section className="border-b py-12 lg:py-16">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className="text-sm">{newsItem.category}</Badge>
                <div className="text-muted-foreground flex items-center gap-4 font-mono text-xs">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{newsItem.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{newsItem.readTime}</span>
                  </div>
                </div>
              </div>
              <h1 className="text-4xl leading-tight font-bold lg:text-5xl">
                {newsItem.title}
              </h1>
              <p className="text-muted-foreground text-xl leading-relaxed">
                {newsItem.summary}
              </p>
            </div>

            {/* Featured Image */}
            <div className="aspect-[21/9] overflow-hidden rounded-lg shadow-lg">
              <img
                src={newsItem.imageUrl}
                alt={newsItem.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="border-b py-12 lg:py-16">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div
              className="leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: newsItem.content }}
            />
          </div>
        </div>
      </section>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <section className="bg-accent/20 py-12 lg:py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-semibold lg:text-3xl">
              Related News
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {relatedNews.map((related) => (
                <NewsCard key={related.id} news={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
