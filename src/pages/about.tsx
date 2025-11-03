import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePageSEO } from "@/hooks/utils/usePageSeo";
import { Award, Briefcase, GraduationCap, Quote, Search } from "lucide-react";

export default function About() {
  usePageSEO({
    title: "About",
    description:
      "Learn about Mehedi Hasan Rafi's academic background, research experience, and expertise in atmospheric science. Discover his educational journey, skills, and contributions to climate modeling.",
  });
  const education = [
    {
      degree: "PhD in Atmospheric Science",
      institution: "University of Environmental Studies",
      period: "2021 - Present",
      description: "Focusing on climate modeling and atmospheric dynamics",
    },
    {
      degree: "MSc in Environmental Science",
      institution: "Institute of Climate Research",
      period: "2019 - 2021",
      description: "Thesis on remote sensing applications in meteorology",
    },
    {
      degree: "BSc in Physics",
      institution: "National University",
      period: "2015 - 2019",
      description: "Specialization in atmospheric physics",
    },
  ];

  const experience = [
    {
      role: "Research Assistant",
      organization: "Atmospheric Research Laboratory",
      period: "2020 - Present",
      description: "Conducting advanced climate modeling and data analysis",
    },
    {
      role: "Teaching Assistant",
      organization: "University of Environmental Studies",
      period: "2021 - Present",
      description: "Supporting undergraduate courses in environmental science",
    },
  ];

  const skills = [
    {
      category: "Research",
      items: [
        "Climate Modeling",
        "Remote Sensing",
        "Data Analysis",
        "Statistical Methods",
      ],
    },
    {
      category: "Technical",
      items: ["Python", "R", "MATLAB", "GIS Software", "Machine Learning"],
    },
    {
      category: "Atmospheric Science",
      items: [
        "Weather Prediction",
        "Atmospheric Chemistry",
        "Climate Dynamics",
        "Satellite Data Processing",
      ],
    },
  ];

  const researchInterests = [
    {
      title: "Climate Modeling",
      description:
        "Developing advanced computational models to simulate and predict climate patterns, understanding long-term atmospheric dynamics and their impacts on global weather systems.",
    },
    {
      title: "Atmospheric Dynamics",
      description:
        "Investigating the physical processes that govern atmospheric circulation, including jet streams, weather systems, and their interactions with Earth's surface.",
    },
    {
      title: "Remote Sensing Applications",
      description:
        "Utilizing satellite and ground-based remote sensing technologies to monitor atmospheric composition, cloud properties, and environmental changes.",
    },
    {
      title: "Air Quality & Pollution",
      description:
        "Analyzing atmospheric pollutants, their transport mechanisms, and developing strategies for air quality management and environmental protection.",
    },
    {
      title: "Extreme Weather Events",
      description:
        "Studying the mechanisms behind extreme weather phenomena such as hurricanes, heatwaves, and heavy precipitation events in the context of climate change.",
    },
    {
      title: "Data Analysis & Machine Learning",
      description:
        "Applying advanced statistical methods and machine learning techniques to analyze large-scale atmospheric datasets and improve predictive models.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Mehedi demonstrates exceptional analytical skills and dedication to atmospheric research. His work on climate modeling has been instrumental to our team's success.",
      author: "Dr. Sarah Johnson",
      role: "Professor of Atmospheric Science",
      institution: "University of Environmental Studies",
    },
    {
      quote:
        "An outstanding researcher with a keen eye for detail. Mehedi's contributions to our remote sensing projects have been invaluable.",
      author: "Dr. Michael Chen",
      role: "Senior Research Scientist",
      institution: "Climate Research Institute",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Portrait and Bio Section */}
      <section className="border-b py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Portrait */}
            <div className="fade-right lg:col-span-1">
              <div className="sticky top-24">
                <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={"/images/profile.png"}
                    alt="Mehedi Hasan Rafi"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="fade-left space-y-6 lg:col-span-2">
              <div>
                <h1 className="mb-4 text-4xl font-bold lg:text-5xl">
                  About Mehedi Hasan Rafi
                </h1>
                <p className="text-muted-foreground text-xl">
                  PhD Researcher in Atmospheric Studies
                </p>
              </div>

              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  I am a dedicated PhD researcher with a profound interest in
                  understanding the complexities of Earth's atmosphere. My
                  academic journey has been driven by a passion for
                  environmental science and a commitment to addressing the
                  challenges of climate change through rigorous scientific
                  inquiry.
                </p>
                <p>
                  Currently pursuing my doctoral degree, I specialize in climate
                  modeling, remote sensing applications, and atmospheric data
                  analysis. My research focuses on developing advanced
                  computational models to predict atmospheric behavior and
                  understand the intricate processes that govern our planet's
                  climate system.
                </p>
                <p>
                  Beyond the laboratory, I am passionate about science
                  communication and making atmospheric research accessible to
                  broader audiences. I believe in the power of collaboration and
                  interdisciplinary approaches to tackle the environmental
                  challenges facing our world today.
                </p>
                <p>
                  When I'm not immersed in research, I enjoy exploring nature,
                  photography, and staying updated with the latest advancements
                  in climate science and technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Interests */}
      <section className="border-b py-16 lg:py-24">
        <div className="container mx-auto max-w-5xl px-6 lg:px-8">
          <div className="fade-down mb-12">
            <div className="mb-3 flex items-center gap-3">
              <Search className="text-primary h-8 w-8" />
              <h2 className="text-3xl font-semibold lg:text-4xl">
                Research Interests
              </h2>
            </div>
            <p className="text-muted-foreground">
              Areas of focus and ongoing research investigations
            </p>
          </div>

          <div className="fade-up grid grid-cols-1 gap-6 md:grid-cols-2">
            {researchInterests.map((interest, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{interest.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {interest.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Background */}
      <section className="bg-accent/20 border-b py-16 lg:py-24">
        <div className="container mx-auto max-w-5xl px-6 lg:px-8">
          <div className="fade-down mb-12">
            <div className="mb-3 flex items-center gap-3">
              <GraduationCap className="text-primary h-8 w-8" />
              <h2 className="text-3xl font-semibold lg:text-4xl">
                Academic Background
              </h2>
            </div>
            <p className="text-muted-foreground">
              Educational journey and qualifications
            </p>
          </div>

          <div className="fade-up space-y-6">
            {education.map((edu, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{edu.degree}</CardTitle>
                      <p className="text-muted-foreground text-base font-medium">
                        {edu.institution}
                      </p>
                    </div>
                    <Badge variant="secondary" className="font-mono">
                      {edu.period}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {edu.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Experience */}
      <section className="border-b py-16 lg:py-24">
        <div className="container mx-auto max-w-5xl px-6 lg:px-8">
          <div className="fade-down mb-12">
            <div className="mb-3 flex items-center gap-3">
              <Briefcase className="text-primary h-8 w-8" />
              <h2 className="text-3xl font-semibold lg:text-4xl">
                Research Experience
              </h2>
            </div>
            <p className="text-muted-foreground">
              Professional research positions and roles
            </p>
          </div>

          <div className="fade-up space-y-6">
            {experience.map((exp, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{exp.role}</CardTitle>
                      <p className="text-muted-foreground text-base font-medium">
                        {exp.organization}
                      </p>
                    </div>
                    <Badge variant="secondary" className="font-mono">
                      {exp.period}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {exp.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills and Achievements */}
      <section className="bg-accent/20 border-b py-16 lg:py-24">
        <div className="container mx-auto max-w-5xl px-6 lg:px-8">
          <div className="fade-down mb-12">
            <div className="mb-3 flex items-center gap-3">
              <Award className="text-primary h-8 w-8" />
              <h2 className="text-3xl font-semibold lg:text-4xl">
                Skills & Expertise
              </h2>
            </div>
            <p className="text-muted-foreground">
              Technical skills and research competencies
            </p>
          </div>

          <div className="fade-up grid grid-cols-1 gap-6 md:grid-cols-3">
            {skills.map((skillGroup, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {skillGroup.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
