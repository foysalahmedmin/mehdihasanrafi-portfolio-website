import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase, Award, Quote } from "lucide-react";
import { usePageSEO } from "@/hooks/utils/usePageSeo";

export default function About() {
  usePageSEO({
    title: "About",
    description: "Learn about Mehedi Hasan Rafi's academic background, research experience, and expertise in atmospheric science. Discover his educational journey, skills, and contributions to climate modeling.",
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
    { category: "Research", items: ["Climate Modeling", "Remote Sensing", "Data Analysis", "Statistical Methods"] },
    { category: "Technical", items: ["Python", "R", "MATLAB", "GIS Software", "Machine Learning"] },
    { category: "Atmospheric Science", items: ["Weather Prediction", "Atmospheric Chemistry", "Climate Dynamics", "Satellite Data Processing"] },
  ];

  const testimonials = [
    {
      quote: "Mehedi demonstrates exceptional analytical skills and dedication to atmospheric research. His work on climate modeling has been instrumental to our team's success.",
      author: "Dr. Sarah Johnson",
      role: "Professor of Atmospheric Science",
      institution: "University of Environmental Studies",
    },
    {
      quote: "An outstanding researcher with a keen eye for detail. Mehedi's contributions to our remote sensing projects have been invaluable.",
      author: "Dr. Michael Chen",
      role: "Senior Research Scientist",
      institution: "Climate Research Institute",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Portrait and Bio Section */}
      <section className="py-16 lg:py-24 border-b">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Portrait */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={"/images/profile.png"}
                    alt="Mehedi Hasan Rafi"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                  About Mehedi Hasan Rafi
                </h1>
                <p className="text-xl text-muted-foreground">
                  PhD Researcher in Atmospheric Studies
                </p>
              </div>

              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  I am a dedicated PhD researcher with a profound interest in
                  understanding the complexities of Earth's atmosphere. My
                  academic journey has been driven by a passion for environmental
                  science and a commitment to addressing the challenges of
                  climate change through rigorous scientific inquiry.
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

      {/* Academic Background */}
      <section className="py-16 lg:py-24 bg-accent/20 border-b">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h2 className="text-3xl lg:text-4xl font-semibold">
                Academic Background
              </h2>
            </div>
            <p className="text-muted-foreground">
              Educational journey and qualifications
            </p>
          </div>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{edu.degree}</CardTitle>
                      <p className="text-base text-muted-foreground font-medium">
                        {edu.institution}
                      </p>
                    </div>
                    <Badge variant="secondary" className="font-mono">
                      {edu.period}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {edu.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Experience */}
      <section className="py-16 lg:py-24 border-b">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <Briefcase className="h-8 w-8 text-primary" />
              <h2 className="text-3xl lg:text-4xl font-semibold">
                Research Experience
              </h2>
            </div>
            <p className="text-muted-foreground">
              Professional research positions and roles
            </p>
          </div>

          <div className="space-y-6">
            {experience.map((exp, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{exp.role}</CardTitle>
                      <p className="text-base text-muted-foreground font-medium">
                        {exp.organization}
                      </p>
                    </div>
                    <Badge variant="secondary" className="font-mono">
                      {exp.period}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {exp.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills and Achievements */}
      <section className="py-16 lg:py-24 bg-accent/20 border-b">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <Award className="h-8 w-8 text-primary" />
              <h2 className="text-3xl lg:text-4xl font-semibold">
                Skills & Expertise
              </h2>
            </div>
            <p className="text-muted-foreground">
              Technical skills and research competencies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{skillGroup.category}</CardTitle>
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
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <Quote className="h-8 w-8 text-primary" />
              <h2 className="text-3xl lg:text-4xl font-semibold">
                Testimonials
              </h2>
            </div>
            <p className="text-muted-foreground">
              Endorsements from collaborators and mentors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2">
                <CardContent className="pt-6 space-y-4">
                  <Quote className="h-8 w-8 text-muted-foreground/30" />
                  <p className="text-base leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="pt-4 border-t">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-muted-foreground">
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
