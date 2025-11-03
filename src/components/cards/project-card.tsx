import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { URLS } from "@/config";
import type { TProject } from "@/types/project.type";
import { Calendar, Clock } from "lucide-react";
import { Link } from "wouter";

interface ProjectCardProps {
  project: TProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <div data-testid={`card-project-${project._id}`}>
        <Card className="hover-elevate active-elevate-2 h-full overflow-hidden transition-all duration-200 hover:-translate-y-1">
          <div className="relative aspect-video overflow-hidden">
            <img
              src={
                project.thumbnail
                  ? `${URLS.projects}/${project.thumbnail}`
                  : "/images/thumbnail.png"
              }
              alt={project.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <Badge className="bg-primary text-primary-foreground absolute top-3 left-3">
              {project?.category || "Uncategorized"}
            </Badge>
          </div>
          <CardHeader className="space-y-2">
            <h3 className="line-clamp-2 text-xl leading-tight font-semibold">
              {project.title}
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
              {project.description}
            </p>
          </CardContent>
          <CardFooter className="text-muted-foreground flex items-center gap-4 font-mono text-xs">
            {project?.published_at && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{new Date(project?.published_at).toDateString()}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{project.read_time}</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Link>
  );
}
