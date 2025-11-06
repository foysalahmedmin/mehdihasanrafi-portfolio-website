import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { URLS } from "@/config";
import type { TNews } from "@/types/news.type";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Link } from "wouter";

interface NewsCardProps {
  news: TNews;
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <Link href={`/news/${news.slug}`}>
      <div data-testid={`card-news-${news._id}`}>
        <Card className="hover-elevate active-elevate-2 h-full overflow-hidden transition-all duration-200 hover:-translate-y-1">
          <div className="relative aspect-video overflow-hidden">
            <img
              src={
                news.thumbnail
                  ? `${URLS.news.thumbnail}/${news.thumbnail}`
                  : "/images/thumbnail.png"
              }
              alt={news.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <Badge className="bg-background/80 absolute top-3 right-3 backdrop-blur">
              {news?.category || "Uncategorized"}
            </Badge>
          </div>
          <CardHeader className="space-y-2">
            {news?.published_at && (
              <div className="text-muted-foreground flex items-center gap-2 font-mono text-xs">
                <Calendar className="h-3.5 w-3.5" />
                <span>{new Date(news?.published_at).toDateString()}</span>
              </div>
            )}

            <h3 className="line-clamp-2 text-xl leading-tight font-semibold">
              {news.title}
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
              {news.description}
            </p>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="text-muted-foreground flex items-center gap-1.5 font-mono text-xs">
              <Clock className="h-3.5 w-3.5" />
              <span>{news?.read_time}</span>
            </div>
            <div className="text-primary flex items-center gap-1 text-xs font-medium">
              <span>Read More</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </CardFooter>
        </Card>
      </div>
    </Link>
  );
}
