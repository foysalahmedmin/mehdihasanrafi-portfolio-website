import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PublicationCard } from "@/components/cards/publication-card";
import { ArrowLeft, ExternalLink, FileText, Tag } from "lucide-react";
import type { Publication } from "@/types";

export default function PublicationDetail() {
  const [, params] = useRoute("/publications/:slug");
  const slug = params?.slug;

  const { data: publication, isLoading } = useQuery<Publication>({
    queryKey: ["/api/publications", slug],
    queryFn: async () => {
      const response = await fetch(`/api/publications/${slug}`);
      if (!response.ok) {
        throw new Error('Publication not found');
      }
      return response.json();
    },
    enabled: !!slug,
  });

  const { data: allPublications = [] } = useQuery<Publication[]>({
    queryKey: ["/api/publications"],
  });

  // Get related publications (publications with overlapping tags)
  const relatedPublications = allPublications
    .filter((p) => {
      if (p.slug === slug) return false;
      return publication?.tags?.some((tag) => p?.tags?.includes(tag));
    })
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
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
      <div className="flex flex-col min-h-screen items-center justify-center">
        <Card className="p-12 text-center max-w-md">
          <CardDescription className="text-lg mb-4">
            Publication not found
          </CardDescription>
          <Link href="/publications">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Publications
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const highlightedAuthors = publication.authors.map((author) =>
    author.includes("Rafi") ? `<strong>${author}</strong>` : author
  );

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <Link href="/publications">
            <Button variant="ghost" size="sm" data-testid="button-back-publications">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Publications
            </Button>
          </Link>
        </div>
      </section>

      {/* Publication Header */}
      <section className="py-12 lg:py-16 border-b bg-accent/20">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              {publication.title}
            </h1>

            {/* Authors */}
            <p
              className="text-lg"
              dangerouslySetInnerHTML={{
                __html: highlightedAuthors.join(", "),
              }}
            />

            {/* Publication Details */}
            <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-muted-foreground">
              <span>{publication.venue}</span>
              <span>•</span>
              <span>{publication.date}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              {publication.pdfUrl && (
                <a href={publication.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="default" data-testid="button-download-pdf">
                    <FileText className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </a>
              )}
              {publication.externalUrl && (
                <a href={publication.externalUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" data-testid="button-external-link">
                    <ExternalLink className="h-4 w-4 mr-2" />
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
      <section className="py-12 lg:py-16 border-b">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <h2 className="text-2xl font-semibold mb-6">Abstract</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {publication.abstract}
          </p>
        </div>
      </section>

      {/* Full Content */}
      <section className="py-12 lg:py-16 border-b">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div
              className="whitespace-pre-line leading-relaxed"
              dangerouslySetInnerHTML={{ __html: publication.content }}
            />
          </div>

          {/* Tags */}
          {publication?.tags && publication?.tags?.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
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
        <section className="py-12 lg:py-16 bg-accent/20">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-8">
              Related Publications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedPublications.map((relatedPub) => (
                <PublicationCard key={relatedPub.id} publication={relatedPub} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
