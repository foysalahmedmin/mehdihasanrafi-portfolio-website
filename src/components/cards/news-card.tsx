import { Link } from "wouter";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { News } from "@/types";

interface NewsCardProps {
  news: News;
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <Link href={`/news/${news.slug}`}>
      <a data-testid={`card-news-${news.id}`}>
        <Card className="h-full overflow-hidden hover-elevate active-elevate-2 transition-all duration-200 hover:-translate-y-1">
          <div className="relative aspect-video overflow-hidden">
            <img
              src={news.imageUrl}
              alt={news.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <Badge className="absolute top-3 right-3 bg-background/80 backdrop-blur">
              {news.category}
            </Badge>
          </div>
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>{news.date}</span>
            </div>
            <h3 className="text-xl font-semibold line-clamp-2 leading-tight">
              {news.title}
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {news.summary}
            </p>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>{news.readTime}</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-primary">
              <span>Read More</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </CardFooter>
        </Card>
      </a>
    </Link>
  );
}
