import { PublicationCard } from "@/components/cards/publication-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type {
  TBulkPublicationResponse,
  TPublicationResponse,
} from "@/types/publication.type";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink, FileText, Tag } from "lucide-react";
import { Link, useRoute } from "wouter";

export default function PublicationDetail() {
  const [, params] = useRoute("/publications/:slug");
  const slug = params?.slug;

  const { data: publicationResponse, isLoading } =
    useQuery<TPublicationResponse>({
      queryKey: ["/api/publications", slug],
      queryFn: async () => {
        const response = await fetch(`/api/publications/${slug}`);
        if (!response.ok) {
          throw new Error("Publication not found");
        }
        return response.json();
      },
      enabled: !!slug,
    });

  const { data: publicationsResponse } = useQuery<TBulkPublicationResponse>({
    queryKey: ["/api/publications"],
  });

  const publication = publicationResponse?.data;
  const publications = publicationsResponse?.data || [];

  // Get related publications (publications with overlapping tags)
  const relatedPublications = publications
    .filter((p) => {
      if (p.slug === slug) return false;
      return publication?.tags?.some((tag) => p?.tags?.includes(tag));
    })
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <section className="py-12 lg:py-16">
          <div className="container mx-auto max-w-4xl px-6 lg:px-8">
            <Skeleton className="mb-8 h-8 w-32" />
            <Skeleton className="mb-4 h-12 w-3/4" />
            <Skeleton className="mb-8 h-6 w-1/2" />
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

  if (!publication) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Card className="max-w-md p-12 text-center">
          <CardDescription className="mb-4 text-lg">
            Publication not found
          </CardDescription>
          <Link href="/publications">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Publications
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const highlightedAuthors = publication?.authors?.map((author) =>
    author?.includes("Rafi") ? `<strong>${author}</strong>` : author,
  );

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <section className="border-b py-6">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8">
          <Link href="/publications">
            <Button
              variant="ghost"
              size="sm"
              data-testid="button-back-publications"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Publications
            </Button>
          </Link>
        </div>
      </section>

      {/* Publication Header */}
      <section className="bg-accent/20 border-b py-12 lg:py-16">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8">
          <div className="space-y-6">
            <h1 className="text-4xl leading-tight font-bold lg:text-5xl">
              {publication.title}
            </h1>

            {/* Authors */}
            {highlightedAuthors && (
              <p
                className="text-lg"
                dangerouslySetInnerHTML={{
                  __html: highlightedAuthors?.join(", "),
                }}
              />
            )}

            {/* Publication Details */}
            <div className="text-muted-foreground flex flex-wrap items-center gap-4 font-mono text-sm">
              <span>{publication.venue}</span>
              <span>•</span>
              <span>{publication.published_at}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              {publication.pdf && (
                <a
                  href={publication.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="default" data-testid="button-download-pdf">
                    <FileText className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </a>
              )}
              {publication.link && (
                <a
                  href={publication.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" data-testid="button-external-link">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Publication
                  </Button>
                </a>
              )}
              {publication.doi && (
                <a
                  href={`https://doi.org/${publication.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" data-testid="button-doi">
                    DOI: {publication.doi}
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Abstract */}
      <section className="border-b py-12 lg:py-16">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-semibold">Abstract</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {publication.abstract}
          </p>
        </div>
      </section>

      {/* Full Content */}
      <section className="border-b py-12 lg:py-16">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div
              className="leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: publication.content }}
            />
          </div>

          {/* Tags */}
          {publication?.tags && publication?.tags?.length > 0 && (
            <div className="mt-12 border-t pt-8">
              <div className="mb-4 flex items-center gap-2">
                <Tag className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground text-sm font-medium">
                  Research Areas
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {publication?.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Publications */}
      {relatedPublications.length > 0 && (
        <section className="bg-accent/20 py-12 lg:py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-semibold lg:text-3xl">
              Related Publications
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {relatedPublications.map((relatedPub) => (
                <PublicationCard
                  key={relatedPub._id}
                  publication={relatedPub}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
