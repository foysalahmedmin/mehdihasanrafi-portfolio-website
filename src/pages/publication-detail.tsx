import { PublicationList } from "@/components/cards/publication-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { URLS } from "@/config/urls";
import { getPublicationBySlug } from "@/services/publication.service";
import type {
  TBulkPublicationResponse,
  TPublicationResponse,
} from "@/types/publication.type";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  BookOpen,
  Building2,
  Calendar,
  Clock,
  Download,
  ExternalLink,
  Eye,
  Tag,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link, useRoute } from "wouter";

export default function PublicationDetail() {
  const [, params] = useRoute("/publications/:slug");
  const slug = params?.slug;
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);

  const { data: publicationResponse, isLoading } =
    useQuery<TPublicationResponse>({
      queryKey: ["/api/publications", slug],
      queryFn: async () => {
        return await getPublicationBySlug(slug!);
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
      <div className="flex min-h-[calc(100vh-4rem)] flex-col">
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
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
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

  const pdfUrl = publication?.pdf
    ? publication.pdf.startsWith("http")
      ? publication.pdf
      : `${URLS.publications.pdf}/${publication.pdf}`
    : null;

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
          <div className="fade-up space-y-6">
            <div className="space-y-4">
              {publication.category && (
                <Badge className="text-sm">{publication.category}</Badge>
              )}
              <h1 className="text-4xl leading-tight font-bold lg:text-5xl">
                {publication.title}
              </h1>

              {/* Authors */}
              {publication.authors && publication.authors.length > 0 && (
                <div className="flex items-center gap-2">
                  <User className="text-muted-foreground h-4 w-4" />
                  <p
                    className="text-lg"
                    dangerouslySetInnerHTML={{
                      __html:
                        highlightedAuthors?.join(", ") ||
                        publication.authors.join(", "),
                    }}
                  />
                </div>
              )}

              {/* Publication Details */}
              <div className="text-muted-foreground flex flex-wrap items-center gap-4 font-mono text-sm">
                {publication.venue && (
                  <>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-3.5 w-3.5" />
                      <span>{publication.venue}</span>
                    </div>
                    <span>•</span>
                  </>
                )}
                {publication.journal && (
                  <>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>{publication.journal}</span>
                    </div>
                    <span>•</span>
                  </>
                )}
                {publication.publisher && (
                  <>
                    <span>{publication.publisher}</span>
                    <span>•</span>
                  </>
                )}
                {publication.volume && (
                  <>
                    <span>Vol. {publication.volume}</span>
                    <span>•</span>
                  </>
                )}
                {publication.published_at && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      {new Date(publication.published_at).toDateString()}
                    </span>
                  </div>
                )}
                {publication.read_time && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{publication.read_time}</span>
                    </div>
                  </>
                )}
              </div>

              {/* DOI */}
              {publication.doi && (
                <div>
                  <a
                    href={`https://doi.org/${publication.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary inline-flex items-center gap-2 text-sm hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>DOI: {publication.doi}</span>
                  </a>
                </div>
              )}

              {/* Source Link */}
              {publication.link && (
                <div>
                  <a
                    href={publication.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary inline-flex items-center gap-2 hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>View Publication Source</span>
                  </a>
                </div>
              )}
            </div>

            {/* Thumbnail */}
            {publication.thumbnail && (
              <div className="aspect-[21/9] overflow-hidden rounded-lg shadow-lg">
                <img
                  src={
                    publication.thumbnail.startsWith("http")
                      ? publication.thumbnail
                      : `${URLS.publications.thumbnail}/${publication.thumbnail}`
                  }
                  alt={publication.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              {pdfUrl && (
                <>
                  <Button
                    variant="default"
                    onClick={() => setPdfViewerOpen(true)}
                    data-testid="button-view-pdf"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View PDF
                  </Button>
                  <a
                    href={pdfUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" data-testid="button-download-pdf">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </a>
                </>
              )}
            </div>

            {/* Additional Images */}
            {publication.images && publication.images.length > 0 && (
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                {publication.images.map((image, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-lg shadow-lg"
                  >
                    <img
                      src={
                        image.startsWith("http")
                          ? image
                          : `${URLS.publications.image}/${image}`
                      }
                      alt={`${publication.title} - Image ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Abstract */}
      {publication.abstract && (
        <section className="border-b py-12 lg:py-16">
          <div className="container mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="fade-down mb-6 text-2xl font-semibold">Abstract</h2>
            <p className="text-muted-foreground fade-up text-lg leading-relaxed">
              {publication.abstract}
            </p>
          </div>
        </section>
      )}

      {/* Full Content */}
      {publication.content && (
        <section className="border-b py-12 lg:py-16">
          <div className="container mx-auto max-w-4xl px-6 lg:px-8">
            <div className="prose prose-lg dark:prose-invert fade-up max-w-none">
              <div
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ __html: publication.content }}
              />
            </div>

            {/* Tags */}
            {publication.tags && publication.tags.length > 0 && (
              <div className="mt-12 border-t pt-8">
                <div className="mb-4 flex items-center gap-2">
                  <Tag className="text-muted-foreground h-4 w-4" />
                  <span className="text-muted-foreground text-sm font-medium">
                    Research Areas
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {publication.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* PDF Viewer Dialog */}
      {pdfUrl && (
        <Dialog open={pdfViewerOpen} onOpenChange={setPdfViewerOpen}>
          <DialogContent className="max-h-[90vh] max-w-6xl">
            <DialogHeader>
              <DialogTitle>{publication.title}</DialogTitle>
              <DialogDescription>PDF Viewer</DialogDescription>
            </DialogHeader>
            <div className="h-[80vh] w-full">
              <iframe
                src={pdfUrl}
                className="h-full w-full rounded border"
                title="PDF Viewer"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Related Publications */}
      {relatedPublications.length > 0 && (
        <section className="bg-accent/20 py-12 lg:py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="fade-down mb-8 text-2xl font-semibold lg:text-3xl">
              Related Publications
            </h2>
            <ul className="fade-up grid list-none grid-cols-1 gap-4">
              {relatedPublications.map((relatedPub) => (
                <PublicationList
                  key={relatedPub._id}
                  publication={relatedPub}
                />
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
