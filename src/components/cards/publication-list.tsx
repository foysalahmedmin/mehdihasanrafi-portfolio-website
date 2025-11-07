import { cn } from "@/lib/utils";
import type { TPublication } from "@/types/publication.type";
import { Link } from "wouter";

interface PublicationListItemProps {
  publication: TPublication;
  className?: string;
}

export function PublicationList({
  publication,
  className,
}: PublicationListItemProps) {
  const highlightedAuthors = publication?.authors?.map((author) =>
    author.includes("Rafi")
      ? `<strong class="font-semibold">${author}</strong>`
      : author,
  );

  const publicationDate = publication.published_at
    ? new Date(publication.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
    : "";

  return (
    <li
      data-testid={`list-publication-${publication._id}`}
      className={cn(
        "group border-border border-b pb-4 last:border-b-0 last:pb-0",
        className,
      )}
    >
      <Link href={`/publications/${publication.slug}`} className="">
        {/* Authors */}
        {highlightedAuthors && (
          <span
            className=""
            dangerouslySetInnerHTML={{
              __html: highlightedAuthors.join(", "),
            }}
          />
        )}
        <span> • </span>

        {/* Title */}
        <Link
          href={`/publications/${publication.slug}`}
          className="group-hover:text-primary transition-colors hover:underline"
        >
          {publication.title}
        </Link>
        <span> • </span>

        {/* Journal / Venue */}
        {publication.venue && (
          <span className="italic">{publication.venue}</span>
        )}

        {/* Volume & Page */}
        {(publication.volume || publication.code) && (
          <>
            {publication.volume && <span>, {publication.volume}</span>}
            {publication.code && <span>, pp. {publication.code}</span>}
          </>
        )}

        {/* DOI */}
        {publication.doi && (
          <>
            <span> • </span>
            <span>{publication.doi}</span>
          </>
        )}

        {/* Published Date */}
        {publicationDate && (
          <>
            <span> • </span>
            <span className="">{publicationDate}</span>
          </>
        )}
      </Link>
    </li>
  );
}
