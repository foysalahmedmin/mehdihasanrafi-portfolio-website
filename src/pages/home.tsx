import { NewsCard } from "@/components/cards/news-card";
import { ProjectCard } from "@/components/cards/project-card";
import { PublicationCard } from "@/components/cards/publication-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePageSEO } from "@/hooks/utils/usePageSeo";
import type { TBulkNewsResponse } from "@/types/news.type";
import type { TBulkProjectResponse } from "@/types/project.type";
import type { TBulkPublicationResponse } from "@/types/publication.type";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, BookOpen, FolderKanban } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  usePageSEO({
    title: "Home",
    description:
      "Mehedi Hasan Rafi is a PhD researcher specializing in atmospheric studies, climate modeling, and environmental science. Explore research projects, publications, and academic contributions.",
  });
  const { data: projectsResponse } = useQuery<TBulkProjectResponse>({
    queryKey: ["/api/projects"],
  });

  const { data: publicationsResponse } = useQuery<TBulkPublicationResponse>({
    queryKey: ["/api/publications"],
  });

  const { data: bulkNewsResponse } = useQuery<TBulkNewsResponse>({
    queryKey: ["/api/news"],
  });

  const projects = projectsResponse?.data || [];
  const publications = publicationsResponse?.data || [];
  const bulkNews = bulkNewsResponse?.data || [];

  const recentProjects = projects.slice(0, 3);
  const recentPublications = publications.slice(0, 3);
  const recentNews = bulkNews.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="from-background to-accent/20 flex min-h-[600px] items-center border-b bg-gradient-to-b lg:min-h-[700px]">
        <div className="container mx-auto px-6 py-16 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-5">
            {/* Text Content */}
            <div className="space-y-6 lg:col-span-3">
              <div className="space-y-3">
                <h1 className="text-5xl leading-tight font-bold lg:text-6xl">
                  Mehedi Hasan Rafi
                </h1>
                <p className="text-muted-foreground text-xl font-medium lg:text-2xl">
                  PhD Researcher in Atmospheric Studies
                </p>
              </div>
              <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
                Exploring the complexities of Earth's atmosphere through
                advanced climate modeling, remote sensing, and data analysis.
                Committed to understanding atmospheric processes and their
                impact on our planet's climate system.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/projects">
                  <Button size="lg" data-testid="button-explore-research">
                    <FolderKanban className="mr-2 h-5 w-5" />
                    Explore Research
                  </Button>
                </Link>
                <Link href="/publications">
                  <Button
                    size="lg"
                    variant="outline"
                    data-testid="button-view-publications"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    View Publications
                  </Button>
                </Link>
              </div>
            </div>

            {/* Portrait Image */}
            <div className="lg:col-span-2">
              <div className="relative mx-auto max-w-md">
                <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-xl">
                  <img
                    src={"/images/profile.png"}
                    alt="Mehedi Hasan Rafi"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="border-b py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Card className="border-2">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <CardTitle className="text-3xl lg:text-4xl">
                    About Me
                  </CardTitle>
                  <Link href="/about">
                    <Button
                      variant="outline"
                      data-testid="button-read-more-about"
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-base leading-relaxed">
                  I am a passionate PhD researcher specializing in atmospheric
                  studies with a focus on climate modeling and environmental
                  science. My research investigates the intricate dynamics of
                  Earth's atmosphere, utilizing cutting-edge remote sensing
                  technologies and advanced computational models.
                </p>
                <p className="text-muted-foreground text-base leading-relaxed">
                  With a strong foundation in physics and environmental science,
                  I aim to contribute meaningful insights into climate change,
                  atmospheric composition, and weather prediction systems.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Preview Section */}
      <section className="bg-accent/20 border-b py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between lg:mb-12">
            <div>
              <h2 className="mb-2 text-3xl font-semibold lg:text-4xl">
                Recent Projects
              </h2>
              <p className="text-muted-foreground">
                Explore my latest research initiatives
              </p>
            </div>
            <Link href="/projects">
              <Button variant="outline" data-testid="button-see-all-projects">
                See All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {recentProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {recentProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <CardDescription>No projects available yet.</CardDescription>
            </Card>
          )}
        </div>
      </section>

      {/* Publications Preview Section */}
      <section className="border-b py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between lg:mb-12">
            <div>
              <h2 className="mb-2 text-3xl font-semibold lg:text-4xl">
                Recent Publications
              </h2>
              <p className="text-muted-foreground">
                Latest academic contributions
              </p>
            </div>
            <Link href="/publications">
              <Button
                variant="outline"
                data-testid="button-see-all-publications"
              >
                See All Publications
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {recentPublications.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {recentPublications.map((publication) => (
                <PublicationCard
                  key={publication._id}
                  publication={publication}
                />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <CardDescription>No publications available yet.</CardDescription>
            </Card>
          )}
        </div>
      </section>

      {/* News Preview Section */}
      <section className="bg-accent/20 py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between lg:mb-12">
            <div>
              <h2 className="mb-2 text-3xl font-semibold lg:text-4xl">
                Latest News
              </h2>
              <p className="text-muted-foreground">
                Recent updates and announcements
              </p>
            </div>
            <Link href="/news">
              <Button variant="outline" data-testid="button-see-all-news">
                See All News
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {recentNews.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {recentNews.map((item) => (
                <NewsCard key={item._id} news={item} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <CardDescription>No news available yet.</CardDescription>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
