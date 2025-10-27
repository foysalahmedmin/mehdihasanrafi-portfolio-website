import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { NewsCard } from "@/components/cards/news-card";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import type { News } from "@/types";

export default function NewsDetail() {
  const [, params] = useRoute("/news/:slug");
  const slug = params?.slug;

  const { data: newsItem, isLoading } = useQuery<News>({
    queryKey: ["/api/news", slug],
    queryFn: async () => {
      const response = await fetch(`/api/news/${slug}`);
      if (!response.ok) {
        throw new Error('News article not found');
      }
      return response.json();
    },
    enabled: !!slug,
  });

  const { data: allNews = [] } = useQuery<News[]>({
    queryKey: ["/api/news"],
  });

  // Get related news (same category, excluding current)
  const relatedNews = allNews
    .filter((n) => n.category === newsItem?.category && n.slug !== slug)
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="aspect-[21/9] w-full mb-8" />
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
      <div className="flex flex-col min-h-screen items-center justify-center">
        <Card className="p-12 text-center max-w-md">
          <CardDescription className="text-lg mb-4">
            News article not found
          </CardDescription>
          <Link href="/news">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
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
      <section className="py-6 border-b">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <Link href="/news">
            <Button variant="ghost" size="sm" data-testid="button-back-news">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to News
            </Button>
          </Link>
        </div>
      </section>

      {/* News Header */}
      <section className="py-12 lg:py-16 border-b">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className="text-sm">{newsItem.category}</Badge>
                <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
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
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                {newsItem.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {newsItem.summary}
              </p>
            </div>

            {/* Featured Image */}
            <div className="aspect-[21/9] rounded-lg overflow-hidden shadow-lg">
              <img
                src={newsItem.imageUrl}
                alt={newsItem.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="py-12 lg:py-16 border-b">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div
              className="whitespace-pre-line leading-relaxed"
              dangerouslySetInnerHTML={{ __html: newsItem.content }}
            />
          </div>
        </div>
      </section>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <section className="py-12 lg:py-16 bg-accent/20">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-8">
              Related News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
