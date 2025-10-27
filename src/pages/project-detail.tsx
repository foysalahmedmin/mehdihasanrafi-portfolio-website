import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectCard } from "@/components/cards/project-card";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import type { Project } from "@/types";

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:slug");
  const slug = params?.slug;

  const { data: project, isLoading } = useQuery<Project>({
    queryKey: ["/api/projects", slug],
    queryFn: async () => {
      const response = await fetch(`/api/projects/${slug}`);
      if (!response.ok) {
        throw new Error('Project not found');
      }
      return response.json();
    },
    enabled: !!slug,
  });

  const { data: allProjects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  // Get related projects (same category, excluding current)
  const relatedProjects = allProjects
    .filter((p) => p.category === project?.category && p.slug !== slug)
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="aspect-[21/9] w-full mb-8" />
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

  if (!project) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <Card className="p-12 text-center max-w-md">
          <CardDescription className="text-lg mb-4">
            Project not found
          </CardDescription>
          <Link href="/projects">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <Link href="/projects">
            <Button variant="ghost" size="sm" data-testid="button-back-projects">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </section>

      {/* Project Header */}
      <section className="py-12 lg:py-16 border-b">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <div className="space-y-6">
            <div className="space-y-4">
              <Badge className="text-sm">{project.category}</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{project.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{project.readTime}</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-[21/9] rounded-lg overflow-hidden shadow-lg">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="py-12 lg:py-16 border-b">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-xl leading-relaxed text-muted-foreground mb-8">
              {project.description}
            </p>
            <div
              className="whitespace-pre-line leading-relaxed"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          </div>

          {/* Tags */}
          {project?.tags && project?.tags?.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  Tags
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project?.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-12 lg:py-16 bg-accent/20">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-8">
              Related Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedProjects.map((relatedProject) => (
                <ProjectCard key={relatedProject.id} project={relatedProject} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
