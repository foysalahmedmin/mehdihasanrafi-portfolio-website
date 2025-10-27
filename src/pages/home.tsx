import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectCard } from "@/components/cards/project-card";
import { PublicationCard } from "@/components/cards/publication-card";
import { NewsCard } from "@/components/cards/news-card";
import { ArrowRight, BookOpen, FolderKanban } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Project, Publication, News } from "@/types";
import { usePageSEO } from "@/hooks/utils/usePageSeo";

export default function Home() {
  usePageSEO({
    title: "Home",
    description: "Mehedi Hasan Rafi is a PhD researcher specializing in atmospheric studies, climate modeling, and environmental science. Explore research projects, publications, and academic contributions.",
  });
  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: publications = [] } = useQuery<Publication[]>({
    queryKey: ["/api/publications"],
  });

  const { data: news = [] } = useQuery<News[]>({
    queryKey: ["/api/news"],
  });

  const recentProjects = projects.slice(0, 3);
  const recentPublications = publications.slice(0, 3);
  const recentNews = news.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-[600px] lg:min-h-[700px] flex items-center border-b bg-gradient-to-b from-background to-accent/20">
        <div className="container mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Text Content */}
            <div className="lg:col-span-3 space-y-6">
              <div className="space-y-3">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Mehedi Hasan Rafi
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground font-medium">
                  PhD Researcher in Atmospheric Studies
                </p>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Exploring the complexities of Earth's atmosphere through advanced
                climate modeling, remote sensing, and data analysis. Committed to
                understanding atmospheric processes and their impact on our planet's
                climate system.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/projects">
                  <Button size="lg" data-testid="button-explore-research">
                    <FolderKanban className="h-5 w-5 mr-2" />
                    Explore Research
                  </Button>
                </Link>
                <Link href="/publications">
                  <Button size="lg" variant="outline" data-testid="button-view-publications">
                    <BookOpen className="h-5 w-5 mr-2" />
                    View Publications
                  </Button>
                </Link>
              </div>
            </div>

            {/* Portrait Image */}
            <div className="lg:col-span-2">
              <div className="relative max-w-md mx-auto">
                <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
                  <img
                    src={"/images/profile.png"}
                    alt="Mehedi Hasan Rafi"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-16 lg:py-24 border-b">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <CardTitle className="text-3xl lg:text-4xl">About Me</CardTitle>
                  <Link href="/about">
                    <Button variant="outline" data-testid="button-read-more-about">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-base leading-relaxed text-muted-foreground">
                  I am a passionate PhD researcher specializing in atmospheric
                  studies with a focus on climate modeling and environmental
                  science. My research investigates the intricate dynamics of
                  Earth's atmosphere, utilizing cutting-edge remote sensing
                  technologies and advanced computational models.
                </p>
                <p className="text-base leading-relaxed text-muted-foreground">
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
      <section className="py-16 lg:py-24 bg-accent/20 border-b">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 lg:mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-semibold mb-2">
                Recent Projects
              </h2>
              <p className="text-muted-foreground">
                Explore my latest research initiatives
              </p>
            </div>
            <Link href="/projects">
              <Button variant="outline" data-testid="button-see-all-projects">
                See All Projects
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          {recentProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {recentProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
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
      <section className="py-16 lg:py-24 border-b">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 lg:mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-semibold mb-2">
                Recent Publications
              </h2>
              <p className="text-muted-foreground">
                Latest academic contributions
              </p>
            </div>
            <Link href="/publications">
              <Button variant="outline" data-testid="button-see-all-publications">
                See All Publications
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          {recentPublications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {recentPublications.map((publication) => (
                <PublicationCard key={publication.id} publication={publication} />
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
      <section className="py-16 lg:py-24 bg-accent/20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 lg:mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-semibold mb-2">
                Latest News
              </h2>
              <p className="text-muted-foreground">
                Recent updates and announcements
              </p>
            </div>
            <Link href="/news">
              <Button variant="outline" data-testid="button-see-all-news">
                See All News
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          {recentNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {recentNews.map((item) => (
                <NewsCard key={item.id} news={item} />
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
