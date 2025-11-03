import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { TPublication } from "@/types/publication.type";
import { ExternalLink, FileText } from "lucide-react";
import { Link } from "wouter";

interface PublicationCardProps {
  publication: TPublication;
}

export function PublicationCard({ publication }: PublicationCardProps) {
  const highlightedAuthors = publication?.authors?.map((author) =>
    author.includes("Rafi") ? `<strong>${author}</strong>` : author,
  );

  return (
    <Link href={`/publications/${publication.slug}`}>
      <div data-testid={`card-publication-${publication._id}`}>
        <Card className="hover-elevate active-elevate-2 h-full transition-all duration-200 hover:-translate-y-1">
          <CardHeader className="space-y-3">
            <h3 className="line-clamp-2 text-xl leading-tight font-semibold">
              {publication.title}
            </h3>
            {highlightedAuthors && (
              <p
                className="text-muted-foreground text-sm"
                dangerouslySetInnerHTML={{
                  __html: highlightedAuthors.join(", "),
                }}
              />
            )}

            <div className="text-muted-foreground flex items-center gap-2 font-mono text-sm">
              <span>{publication.venue}</span>
              <span>•</span>
              <span>
                {publication.published_at
                  ? new Date(publication.published_at).toLocaleDateString()
                  : ""}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
              {publication?.abstract}
            </p>
            <div className="flex flex-wrap gap-2">
              {publication?.tags?.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            {(publication.doi || publication.link || publication.pdf) && (
              <div className="flex items-center gap-3 pt-2">
                {publication.pdf && (
                  <div className="text-primary flex items-center gap-1 text-xs">
                    <FileText className="h-3.5 w-3.5" />
                    <span>PDF</span>
                  </div>
                )}
                {publication.link && (
                  <div className="text-primary flex items-center gap-1 text-xs">
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Link</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}
