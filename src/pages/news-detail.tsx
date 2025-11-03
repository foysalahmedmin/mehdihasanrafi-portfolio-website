import { NewsCard } from "@/components/cards/news-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { URLS } from "@/config/urls";
import { getNewsBySlug } from "@/services/news.service";
import type { TBulkNewsResponse, TNewsResponse } from "@/types/news.type";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  Tag,
  User,
} from "lucide-react";
import { Link, useRoute } from "wouter";

export default function NewsDetail() {
  const [, params] = useRoute("/news/:slug");
  const slug = params?.slug;

  const { data: newsResponse, isLoading } = useQuery<TNewsResponse>({
    queryKey: ["/api/news", slug],
    queryFn: async () => {
      return await getNewsBySlug(slug!);
    },
    enabled: !!slug,
  });

  const { data: bulkNewsResponse } = useQuery<TBulkNewsResponse>({
    queryKey: ["/api/news"],
  });

  const news = newsResponse?.data;
  const bulkNews = bulkNewsResponse?.data || [];

  // Get related news (same category, excluding current)
  const relatedNews = bulkNews
    .filter((n) => n.category === news?.category && n.slug !== slug)
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] flex-col">
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

  if (!news) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
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
          <div className="fade-up space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className="text-sm">
                  {news?.category || "Uncategorized"}
                </Badge>
                <div className="text-muted-foreground flex items-center gap-4 font-mono text-xs">
                  {news?.published_at && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {new Date(news?.published_at)?.toDateString()}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{news.read_time}</span>
                  </div>
                </div>
              </div>
              <h1 className="text-4xl leading-tight font-bold lg:text-5xl">
                {news.title}
              </h1>
              <p className="text-muted-foreground text-xl leading-relaxed">
                {news.description}
              </p>
            </div>

            {/* Author */}
            {news?.author && (
              <div className="text-muted-foreground flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm">{news.author}</span>
              </div>
            )}

            {/* Source Link */}
            {news?.link && (
              <div>
                <a
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary inline-flex items-center gap-2 hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>View Original Source</span>
                </a>
              </div>
            )}

            {/* Featured Image */}
            {news?.thumbnail && (
              <div className="aspect-[21/9] overflow-hidden rounded-lg shadow-lg">
                <img
                  src={
                    news.thumbnail.startsWith("http")
                      ? news.thumbnail
                      : `${URLS.news.thumbnail}/${news.thumbnail}`
                  }
                  alt={news.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            {/* Additional Images */}
            {news?.images && news.images.length > 0 && (
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                {news.images.map((image, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-lg shadow-lg"
                  >
                    <img
                      src={
                        image.startsWith("http")
                          ? image
                          : `${URLS.news.image}/${image}`
                      }
                      alt={`${news.title} - Image ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="border-b py-12 lg:py-16">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert fade-up max-w-none">
            <div
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </div>

          {/* Tags */}
          {news?.tags && news.tags.length > 0 && (
            <div className="mt-12 border-t pt-8">
              <div className="mb-4 flex items-center gap-2">
                <Tag className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground text-sm font-medium">
                  Tags
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {news.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <section className="bg-accent/20 py-12 lg:py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="fade-down mb-8 text-2xl font-semibold lg:text-3xl">
              Related News
            </h2>
            <div className="fade-up grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {relatedNews.map((related) => (
                <NewsCard key={related?._id} news={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
