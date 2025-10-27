import { Link } from "wouter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, FileText } from "lucide-react";
import type { Publication } from "@/types";

interface PublicationCardProps {
  publication: Publication;
}

export function PublicationCard({ publication }: PublicationCardProps) {
  const highlightedAuthors = publication.authors.map((author) =>
    author.includes("Rafi") ? `<strong>${author}</strong>` : author
  );

  return (
    <Link href={`/publications/${publication.slug}`}>
      <a data-testid={`card-publication-${publication.id}`}>
        <Card className="h-full hover-elevate active-elevate-2 transition-all duration-200 hover:-translate-y-1">
          <CardHeader className="space-y-3">
            <h3 className="text-xl font-semibold leading-tight line-clamp-2">
              {publication.title}
            </h3>
            <p
              className="text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: highlightedAuthors.join(", "),
              }}
            />
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
              <span>{publication.venue}</span>
              <span>•</span>
              <span>{publication.date}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {publication.abstract}
            </p>
            <div className="flex flex-wrap gap-2">
              {publication.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            {(publication.doi || publication.externalUrl || publication.pdfUrl) && (
              <div className="flex items-center gap-3 pt-2">
                {publication.pdfUrl && (
                  <div className="flex items-center gap-1 text-xs text-primary">
                    <FileText className="h-3.5 w-3.5" />
                    <span>PDF</span>
                  </div>
                )}
                {publication.externalUrl && (
                  <div className="flex items-center gap-1 text-xs text-primary">
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Link</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
