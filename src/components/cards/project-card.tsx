import { Link } from "wouter";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <a data-testid={`card-project-${project.id}`}>
        <Card className="h-full overflow-hidden hover-elevate active-elevate-2 transition-all duration-200 hover:-translate-y-1">
          <div className="relative aspect-video overflow-hidden">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
              {project.category}
            </Badge>
          </div>
          <CardHeader className="space-y-2">
            <h3 className="text-xl font-semibold line-clamp-2 leading-tight">
              {project.title}
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </CardContent>
          <CardFooter className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{project.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{project.readTime}</span>
            </div>
          </CardFooter>
        </Card>
      </a>
    </Link>
  );
}
