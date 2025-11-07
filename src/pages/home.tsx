import { NewsCard } from "@/components/cards/news-card";
import { ProjectCard } from "@/components/cards/project-card";
import { PublicationList } from "@/components/cards/publication-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePageSEO } from "@/hooks/utils/usePageSeo";
import type { TBulkGalleryResponse } from "@/types/gallery.type";
import type { TBulkNewsResponse } from "@/types/news.type";
import type { TBulkProjectResponse } from "@/types/project.type";
import type { TBulkPublicationResponse } from "@/types/publication.type";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  ChevronDown,
  Cloud,
  Code,
  Cpu,
  FolderKanban,
  Globe,
  GraduationCap,
  Microscope,
  Play,
  Quote,
  Satellite,
  Target,
  TrendingUp,
  Wind,
  Zap,
} from "lucide-react";
import { Link } from "wouter";

const researchInterests = [
  {
    title: "Lightning Meteorology",
    description:
      "Investigating the formation, distribution, and intensity of lightning events to understand their relationship with convective systems and severe weather processes.",
    icon: Cloud,
  },
  {
    title: "Remote Sensing",
    description:
      "Employing satellite and radar technologies to observe atmospheric properties, monitor storm development, and assess environmental impacts with high spatial and temporal resolution.",
    icon: Satellite,
  },
  {
    title: "Tropical Storms",
    description:
      "Studying the genesis, structure, and evolution of tropical cyclones to improve prediction models and assess their link to global climate variability.",
    icon: Wind,
  },
  {
    title: "Aerosol Emission",
    description:
      "Analyzing sources, transport, and radiative effects of aerosols, as well as their role in cloud formation and atmospheric chemistry.",
    icon: BarChart3,
  },
  {
    title: "Climate Change",
    description:
      "Examining the long-term effects of greenhouse gases, aerosol–cloud interactions, and feedback mechanisms that drive global and regional climate shifts.",
    icon: Target,
  },
  {
    title: "Atmospheric Dynamics",
    description:
      "Understanding the physical and dynamical processes of variations in electron density, mechanisms behind ionospheric disturbances, and their connections to space weather and upper-atmospheric dynamics.",
    icon: Globe,
  },
];

const skills = [
  {
    category: "Research Skills",
    icon: Microscope,
    items: [
      "Climate Modeling",
      "Remote Sensing",
      "Statistical Methods",
      "Data Analysis",
      "Weather Prediction",
    ],
  },
  {
    category: "Technical Skills",
    icon: Code,
    items: [
      "Python, R, NCL & Perl",
      "MATLAB & Fortran",
      "Machine Learning & Deep Learning",
      "GIS Software & Google Earth Engine",
      "Data Visualization",
    ],
  },
  {
    category: "Atmospheric Science",
    icon: Brain,
    items: [
      "Atmospheric Chemistry",
      "Climate Dynamics",
      "Satellite Data Processing",
      "Atmospheric Physics",
      "Environmental Monitoring",
    ],
  },
];

const testimonials = [
  {
    quote:
      "Mehedi demonstrates exceptional programming and analytical skills and dedication to the research. His work on lightning meteorology has been instrumental to our team's success.",
    author: "Robert H. Holzworth",
    role: "Professor Emeritus, Earth and Space Sciences",
    institution: "University of Washington",
  },
  {
    quote:
      "An outstanding researcher with a keen eye for detail. Mehedi's contributions to our ionospheric research projects have been invaluable.",
    author: "Dr. Haris Haralambous",
    role: "Professor of Computer Engineering and Informatics",
    institution: "Frederick University, Cyprus",
  },
];

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

  const { data: galleryResponse } = useQuery<TBulkGalleryResponse>({
    queryKey: ["/api/gallery"],
  });

  const projects = projectsResponse?.data || [];
  const publications = publicationsResponse?.data || [];
  const bulkNews = bulkNewsResponse?.data || [];
  const gallery = galleryResponse?.data || [];

  const recentProjects = projects.slice(0, 3);
  const recentPublications = publications.slice(0, 3);
  const recentNews = bulkNews.slice(0, 3);
  const recentGallery = gallery.filter((item) => item.is_active).slice(0, 6);

  const scrollToAbout = () => {
    document
      .getElementById("about-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="from-background to-accent/20 relative flex min-h-[600px] items-center border-b bg-gradient-to-b lg:min-h-[700px]">
        <div className="container mx-auto px-6 py-16 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-5">
            {/* Text Content */}
            <div className="fade-right order-2 space-y-6 text-center lg:order-1 lg:col-span-3 lg:text-start">
              <div className="space-y-3">
                <h1 className="text-5xl leading-tight font-bold lg:text-6xl">
                  Mehedi Hasan Rafi
                </h1>
                <p className="text-muted-foreground text-xl font-medium lg:text-2xl">
                  PhD Candidate in Earth & Atmospheric Science
                </p>
              </div>
              <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
                Exploring the complexities of Earth's atmosphere through
                advanced climate research, remote sensing, and data analysis.
                Committed to understanding atmospheric processes and their
                impact on our planet's climate change.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4 lg:justify-start">
                <Link href="/projects">
                  <Button size="lg" data-testid="button-explore-research">
                    <FolderKanban className="mr-2 h-5 w-5" />
                    Explore Research
                    <ArrowRight className="ml-2 h-4 w-4" />
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
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Portrait Image */}
            <div className="fade-left order-1 lg:order-2 lg:col-span-2">
              <div className="relative mx-auto max-w-md">
                <div className="aspect-square overflow-hidden rounded-full shadow-xl lg:aspect-[5/6] lg:rounded-lg">
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

        {/* Scroll Down Arrow */}
        <button
          onClick={scrollToAbout}
          className="group absolute bottom-8 left-1/2 -translate-x-1/2"
          aria-label="Scroll to about section"
        >
          <div className="relative">
            <div className="bg-background/70 border-border/60 ring-primary/20 group-hover:ring-primary/40 rounded-full border p-3 shadow-lg ring-1 backdrop-blur-md transition-all duration-300 group-hover:-translate-y-0.5">
              <ChevronDown className="text-muted-foreground group-hover:text-foreground h-6 w-6 transition-colors" />
            </div>
            <div className="to-primary/25 absolute -inset-3 rounded-full bg-gradient-to-b from-transparent opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </button>
      </section>

      {/* About Preview Section */}
      <section
        id="about-section"
        className="from-background to-muted/20 border-b bg-gradient-to-b py-20 lg:py-28"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="fade-up">
            <Card className="bg-card/50 border-2 shadow-lg backdrop-blur-sm transition-all duration-300">
              <CardHeader className="pb-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="space-y-3">
                    <Badge
                      variant="secondary"
                      className="px-3 py-1 text-sm font-semibold"
                    >
                      Research & Innovation
                    </Badge>
                    <CardTitle className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent lg:text-5xl">
                      About Me
                    </CardTitle>
                    <CardDescription className="text-muted-foreground max-w-2xl text-lg">
                      Pioneering earth & atmospheric research through advanced
                      computational modeling and remote sensing technologies
                    </CardDescription>
                  </div>
                  <Link href="/about" className="lg:self-start">
                    <Button>
                      Explore My Journey
                      <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="bg-card/40 hover:bg-card/60 border-border/60 hover:border-primary/40 rounded-xl border p-5 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 mt-1 rounded-lg p-2">
                          <Target className="text-primary h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="mb-2 text-lg font-semibold">
                            Research Focus
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            Specializing in lightning meteorology, atmospheric
                            dynamics, climate modeling, and environmental
                            science. My research investigates Earth's
                            atmospheric systems using cutting-edge remote
                            sensing and computational models to understand
                            climate change patterns.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card/40 hover:bg-card/60 border-border/60 hover:border-primary/40 rounded-xl border p-5 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 mt-1 rounded-lg p-2">
                          <Microscope className="text-primary h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="mb-2 text-lg font-semibold">
                            Methodology
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            Leveraging advanced computational frameworks,
                            satellite data analysis, and machine learning
                            techniques to develop accurate predictive models for
                            atmospheric behavior and climate trends.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-card/40 hover:bg-card/60 border-border/60 hover:border-primary/40 rounded-xl border p-5 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 mt-1 rounded-lg p-2">
                          <GraduationCap className="text-primary h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="mb-2 text-lg font-semibold">
                            Academic Excellence
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            PhD researcher with a strong foundation in space
                            physics and environmental science, committed to
                            advancing knowledge in atmospheric composition and
                            weather prediction systems through rigorous academic
                            research.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card/40 hover:bg-card/60 border-border/60 hover:border-primary/40 rounded-xl border p-5 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 mt-1 rounded-lg p-2">
                          <Globe className="text-primary h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="mb-2 text-lg font-semibold">
                            Global Impact
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            Dedicated to contributing meaningful insights that
                            address global environmental challenges and support
                            sustainable development through evidence-based
                            scientific research.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Badge variant="outline" className="px-3 py-1 text-sm">
                    <Cloud className="mr-1 h-3 w-3" />
                    Lightning Meteorology
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 text-sm">
                    <Satellite className="mr-1 h-3 w-3" />
                    Remote Sensing
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 text-sm">
                    <Cpu className="mr-1 h-3 w-3" />
                    Tropical Storm
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 text-sm">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    Aerosol Emission
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 text-sm">
                    <Wind className="mr-1 h-3 w-3" />
                    Climate Change
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 text-sm">
                    <Wind className="mr-1 h-3 w-3" />
                    Atmospheric Dynamics
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Divider with Arrow */}
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground flex flex-col items-center gap-2">
          <div className="bg-border h-12 w-px"></div>
          <ChevronDown className="h-6 w-6 animate-pulse" />
          <div className="bg-border h-12 w-px"></div>
        </div>
      </div>

      {/* Research Interests Section */}
      <section className="border-b py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="fade-down mb-12 text-center">
            <Badge
              variant="secondary"
              className="mb-4 px-3 py-1 text-sm font-semibold"
            >
              Research Focus
            </Badge>
            <h2 className="mb-4 text-3xl font-semibold lg:text-4xl">
              Research Interests
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Exploring cutting-edge areas in atmospheric science and climate
              research
            </p>
          </div>

          <div className="fade-up grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {researchInterests?.map((card, index) => (
              <Card
                key={index}
                className="border-border/60 hover:border-primary/40 transition-colors"
              >
                <CardHeader>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="bg-primary/10 rounded-lg p-2">
                      <card.icon className="text-primary h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{card.title}</CardTitle>
                  </div>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider with Arrow */}
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground flex flex-col items-center gap-2">
          <div className="bg-border h-12 w-px"></div>
          <ChevronDown className="h-6 w-6 animate-pulse" />
          <div className="bg-border h-12 w-px"></div>
        </div>
      </div>

      {/* Skills & Expertise Section */}
      <section className="bg-accent/20 border-b py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="fade-down mb-12 text-center">
            <Badge
              variant="secondary"
              className="mb-4 px-3 py-1 text-sm font-semibold"
            >
              Technical Expertise
            </Badge>
            <h2 className="mb-4 text-3xl font-semibold lg:text-4xl">
              Skills & Tools
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Proficient in a wide range of research methodologies and
              computational tools
            </p>
          </div>

          <div className="fade-up grid grid-cols-1 gap-8 md:grid-cols-3">
            {skills.map((skill, idx) => (
              <Card key={idx} className="bg-card/50 border-2">
                <CardHeader>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="bg-primary/10 rounded-lg p-2">
                      <skill.icon className="text-primary h-5 w-5" />
                    </div>
                    <CardTitle>{skill.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {skill.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Zap className="text-primary h-4 w-4" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider with Arrow */}
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground flex flex-col items-center gap-2">
          <div className="bg-border h-12 w-px"></div>
          <ChevronDown className="h-6 w-6 animate-pulse" />
          <div className="bg-border h-12 w-px"></div>
        </div>
      </div>

      {/* Publications Preview Section */}
      <section className="border-b py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="fade-down mb-8 flex flex-wrap items-center justify-between gap-4 lg:mb-12">
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
            <ul className="fade-up grid list-none grid-cols-1 gap-4">
              {recentPublications.map((publication) => (
                <PublicationList
                  key={publication._id}
                  publication={publication}
                />
              ))}
            </ul>
          ) : (
            <Card className="p-12 text-center">
              <CardDescription>No publications available yet.</CardDescription>
            </Card>
          )}
        </div>
      </section>

      {/* Section Divider with Arrow */}
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground flex flex-col items-center gap-2">
          <div className="bg-border h-12 w-px"></div>
          <ChevronDown className="h-6 w-6 animate-pulse" />
          <div className="bg-border h-12 w-px"></div>
        </div>
      </div>

      {/* Projects Preview Section */}
      <section className="bg-accent/20 border-b py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="fade-down mb-8 flex flex-wrap items-center justify-between gap-4 lg:mb-12">
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
            <div className="fade-up grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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

      {/* Section Divider with Arrow */}
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground flex flex-col items-center gap-2">
          <div className="bg-border h-12 w-px"></div>
          <ChevronDown className="h-6 w-6 animate-pulse" />
          <div className="bg-border h-12 w-px"></div>
        </div>
      </div>

      {/* Gallery Preview Section */}
      <section className="bg-accent/20 border-b py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="fade-down mb-8 flex flex-wrap items-center justify-between gap-4 lg:mb-12">
            <div>
              <h2 className="mb-2 text-3xl font-semibold lg:text-4xl">
                Gallery
              </h2>
              <p className="text-muted-foreground">
                Visual documentation of research and fieldwork
              </p>
            </div>
            <Link href="/gallery">
              <Button variant="outline" data-testid="button-see-all-gallery">
                See All Gallery
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {recentGallery.length > 0 ? (
            <div className="fade-up grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
              {recentGallery.map((item) => (
                <div
                  key={item._id}
                  className="group bg-muted relative aspect-square overflow-hidden rounded-lg"
                >
                  {item.media_type === "image" ? (
                    <img
                      src={item.image_url || item.image}
                      alt={item.caption || "Gallery image"}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="relative h-full w-full">
                      <video
                        src={item.video_url || item.video}
                        className="h-full w-full object-cover"
                        muted
                        loop
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                    </div>
                  )}
                  {item.caption && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <p className="line-clamp-2 text-sm text-white">
                        {item.caption}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <CardDescription>No gallery items available yet.</CardDescription>
            </Card>
          )}
        </div>
      </section>

      {/* Section Divider with Arrow */}
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground flex flex-col items-center gap-2">
          <div className="bg-border h-12 w-px"></div>
          <ChevronDown className="h-6 w-6 animate-pulse" />
          <div className="bg-border h-12 w-px"></div>
        </div>
      </div>

      {/* News Preview Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="fade-down mb-8 flex flex-wrap items-center justify-between gap-4 lg:mb-12">
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
            <div className="fade-up grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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

      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-5xl px-6 lg:px-8">
          <div className="fade-down mb-12">
            <div className="mb-3 flex items-center gap-3">
              <Quote className="text-primary h-8 w-8" />
              <h2 className="text-3xl font-semibold lg:text-4xl">
                Testimonials
              </h2>
            </div>
            <p className="text-muted-foreground">
              Endorsements from collaborators and mentors
            </p>
          </div>

          <div className="fade-up grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2">
                <CardContent className="space-y-4 pt-6">
                  <Quote className="text-muted-foreground/30 h-8 w-8" />
                  <p className="text-base leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-muted-foreground text-sm">
                      {testimonial.role}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {testimonial.institution}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
