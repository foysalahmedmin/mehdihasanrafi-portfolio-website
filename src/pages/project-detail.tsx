import { ProjectCard } from "@/components/cards/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type {
  TBulkProjectResponse,
  TProjectResponse,
} from "@/types/project.type";
import { URLS } from "@/config/urls";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, Clock, Tag, ExternalLink, User } from "lucide-react";
import { Link, useRoute } from "wouter";

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:slug");
  const slug = params?.slug;

  const { data: projectResponse, isLoading } = useQuery<TProjectResponse>({
    queryKey: ["/api/projects", slug],
    queryFn: async () => {
      const response = await fetch(`/api/projects/${slug}`);
      if (!response.ok) {
        throw new Error("Project not found");
      }
      return response.json();
    },
    enabled: !!slug,
  });

  const { data: projectsResponse } = useQuery<TBulkProjectResponse>({
    queryKey: ["/api/projects"],
  });

  const project = projectResponse?.data;
  const projects = projectsResponse?.data || [];

  // Get related projects (same category, excluding current)
  const relatedProjects = projects
    .filter((p) => p.category === project?.category && p.slug !== slug)
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <section className="py-12 lg:py-16">
          <div className="container mx-auto max-w-4xl px-6 lg:px-8">
            <Skeleton className="mb-8 h-8 w-32" />
            <Skeleton className="mb-4 h-12 w-3/4" />
            <Skeleton className="mb-8 h-6 w-1/2" />
            <Skeleton className="mb-8 aspect-[21/9] w-full" />
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
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Card className="max-w-md p-12 text-center">
          <CardDescription className="mb-4 text-lg">
            Project not found
          </CardDescription>
          <Link href="/projects">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
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
      <section className="border-b py-6">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8">
          <Link href="/projects">
            <Button
              variant="ghost"
              size="sm"
              data-testid="button-back-projects"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </section>

      {/* Project Header */}
      <section className="border-b py-12 lg:py-16">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <Badge className="text-sm">{project?.category || "Uncategorized"}</Badge>
              <h1 className="text-4xl leading-tight font-bold lg:text-5xl">
                {project.title}
              </h1>
              {project.description && (
                <p className="text-muted-foreground text-xl leading-relaxed">
                  {project.description}
                </p>
              )}
              <div className="text-muted-foreground flex flex-wrap items-center gap-4 font-mono text-sm">
                {project?.published_at && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      {new Date(project?.published_at).toDateString()}
                    </span>
                  </div>
                )}
                {project?.read_time && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{project.read_time}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Author */}
            {project?.author && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="text-sm">{project.author}</span>
              </div>
            )}

            {/* Source Link */}
            {project?.link && (
              <div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>View Project Source</span>
                </a>
              </div>
            )}

            {/* Featured Image */}
            {project?.thumbnail && (
              <div className="aspect-[21/9] overflow-hidden rounded-lg shadow-lg">
                <img
                  src={project.thumbnail.startsWith("http") ? project.thumbnail : `${URLS.projects.thumbnail}/${project.thumbnail}`}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            {/* Additional Images */}
            {project?.images && project.images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {project.images.map((image, index) => (
                  <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={image.startsWith("http") ? image : `${URLS.projects.image}/${image}`}
                      alt={`${project.title} - Image ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="border-b py-12 lg:py-16">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          </div>

          {/* Tags */}
          {project?.tags && project?.tags?.length > 0 && (
            <div className="mt-12 border-t pt-8">
              <div className="mb-4 flex items-center gap-2">
                <Tag className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground text-sm font-medium">
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
        <section className="bg-accent/20 py-12 lg:py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-semibold lg:text-3xl">
              Related Projects
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {relatedProjects.map((relatedProject) => (
                <ProjectCard
                  key={relatedProject._id}
                  project={relatedProject}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
