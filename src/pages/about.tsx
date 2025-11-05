import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePageSEO } from "@/hooks/utils/usePageSeo";
import {
  Award,
  BarChart3,
  Brain,
  Briefcase,
  Building2,
  ChevronDown,
  Cloud,
  Code,
  Globe,
  GraduationCap,
  Microscope,
  Quote,
  Satellite,
  Search,
  Target,
  Trophy,
  Users,
  Wind,
  Zap,
} from "lucide-react";

export default function About() {
  usePageSEO({
    title: "About",
    description:
      "Learn about Mehedi Hasan Rafi's academic background, research experience, and expertise in atmospheric science. Discover his educational journey, skills, and contributions to climate modeling.",
  });
  const education = [
    {
      degree: "PhD in Electrical, Electronics and Communication Engineering",
      institution:
        "Military Institute of Science and Technology, Dhaka, Bangladesh",
      period: "2024 - Present",
      description: "Focusing on Earth and Atmospheric Science",
    },
    {
      degree: "MSc in Electrical, Electronics and Communication Engineering",
      institution:
        "Military Institute of Science and Technology, Dhaka, Bangladesh",
      period: "2021 - 2023",
      description:
        "Focusing on lightning meteorology and remote sensing applications",
    },
    {
      degree: "BSc in Electrical and Electronics Engineering",
      institution: "Daffodil International University, Dhaka, Bangladesh",
      period: "2014 - 2019",
      description: "Focusing on satellite navigation and communication",
    },
  ];

  const experience = [
    {
      role: "Research Assistant",
      organization:
        "Military Institute of Science and Technology, Dhaka, Bangladesh",
      period: "2023 – Present",
      description:
        "Conducting advanced research and guiding undergraduate students",
    },
    {
      role: "Co-Investigator",
      organization: "Frederic University, Cyprus",
      period: "2023 – Present",
      description: "Contributing to the ionospheric research project",
    },
    {
      role: "Researcher",
      organization: "World-Wide Lightning Location Network (WWLLN)",
      period: "2022 – Present",
      description:
        "Monitoring and analyzing lightning activity on a global scale",
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

  const awards = [
    {
      title: "Outstanding Research Contribution Award",
      organization:
        "Bangladesh Council of Scientific and Industrial Research (BCSIR)",
      year: "2024",
      description:
        "Recognized for exceptional contributions to lightning and atmospheric research",
    },
    {
      title: "Graduate Research Excellence Scholarship",
      organization:
        "Military Institute of Science and Technology, Dhaka, Bangladesh",
      year: "2024",
      description: "Full scholarship for a PhD for outstanding research",
    },
    {
      title: "Best Paper Award",
      organization:
        "6th International Conference, ICEEICT, Held at MIST, Dhaka, Bangladesh",
      year: "2024",
      description:
        "Recognized for groundbreaking research on atmospheric dynamics",
    },
    {
      title: "Dr. Aminul Islam Scholarship",
      organization: "Daffodil International University",
      year: "2018",
      description:
        "Awarded for excellence in academic performance and compensation",
    },
  ];

  const clients = [
    {
      name: "Journal of Geophysical Research (Climate Dynamics)",
      type: "Reviewer",
      description:
        "Reviewed scientific manuscripts and conference submissions in climate and environmental research",
    },
    {
      name: "Global Open Access Journal of Science",
      type: "Reviewer",
      description:
        "Reviewed scientific manuscripts and conference submissions in climate and environmental research",
    },
    {
      name: "International Conference on Water Resources and Environment",
      type: "Reviewer",
      description:
        "Reviewed scientific manuscripts and conference submissions in climate and environmental research",
    },
    {
      name: "University Science Club and University Robotics Club",
      type: "Team Leader",
      description:
        "Led teams for academic and robotics projects, fostering collaboration and innovation",
    },
    {
      name: "Hackathon Competition, Hult Prize Bangladesh",
      type: "Mentor",
      description:
        "Guided participants in innovation competitions, providing mentorship and technical guidance",
    },
    {
      name: "NASA Space Apps Challenge",
      type: "Mentor",
      description:
        "Guided participants in innovation competitions, providing mentorship and technical guidance",
    },
  ];

  const memberships = [
    {
      role: "Member of the American Geophysical Union (AGU)",
      period: "2024 – Present",
      icon: Users,
    },
    {
      role: "Member of the American Meteorological Society (AMS)",
      period: "2025 – Present",
      icon: Globe,
    },
    {
      role: "Member of IEEE Bangladesh Section",
      period: "Present",
      icon: Zap,
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
                  understanding the complexities of Earth’s atmosphere. My
                  academic journey has been driven by a passion for Earth and
                  Atmospheric science and a commitment to addressing the
                  challenges of climate change through rigorous scientific
                  inquiry.
                </p>
                <p>
                  Currently pursuing my doctoral degree, I specialize in
                  Lightning Meteorology, climate modeling, remote sensing
                  applications, and atmospheric data analysis. My research
                  focuses on developing advanced computational models to predict
                  atmospheric behavior and understand the intricate processes
                  that govern our planet’s climate system.
                </p>
                <p>
                  When I’m not immersed in research, I enjoy exploring nature,
                  photography, and staying up to date on the latest advancements
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

      {/* Section Divider with Arrow */}
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground flex flex-col items-center gap-2">
          <div className="bg-border h-12 w-px"></div>
          <ChevronDown className="h-6 w-6 animate-pulse" />
          <div className="bg-border h-12 w-px"></div>
        </div>
      </div>

      {/* Awards and Achievements */}
      <section className="bg-accent/20 border-b py-16 lg:py-24">
        <div className="container mx-auto max-w-5xl px-6 lg:px-8">
          <div className="fade-down mb-12">
            <div className="mb-3 flex items-center gap-3">
              <Trophy className="text-primary h-8 w-8" />
              <h2 className="text-3xl font-semibold lg:text-4xl">
                Awards and Achievements
              </h2>
            </div>
            <p className="text-muted-foreground">
              Recognition for outstanding contributions to atmospheric research
            </p>
          </div>

          <div className="fade-up grid grid-cols-1 gap-6 md:grid-cols-2">
            {awards.map((award, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="bg-primary/10 rounded-lg p-3">
                      <Award className="text-primary h-6 w-6" />
                    </div>
                    <Badge variant="secondary" className="font-mono">
                      {award.year}
                    </Badge>
                  </div>
                  <CardTitle className="mb-2 text-xl">{award.title}</CardTitle>
                  <p className="text-muted-foreground text-sm font-medium">
                    {award.organization}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {award.description}
                  </p>
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

      {/* Skills and Achievements */}
      <section className="border-b py-16 lg:py-24">
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

      {/* Worked With - Clients Section */}
      <section className="bg-accent/20 border-b py-16 lg:py-24">
        <div className="container mx-auto max-w-5xl px-6 lg:px-8">
          <div className="fade-down mb-12">
            <div className="mb-3 flex items-center gap-3">
              <Users className="text-primary h-8 w-8" />
              <h2 className="text-3xl font-semibold lg:text-4xl">
                Worked With
              </h2>
            </div>
            <p className="text-muted-foreground">
              Collaborations with leading institutions and organizations
            </p>
          </div>

          <div className="fade-up grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {clients.map((client, index) => (
              <Card
                key={index}
                className="border-border/60 hover:border-primary/40 flex flex-col transition-colors"
              >
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-lg p-2">
                      <Building2 className="text-primary h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="mt-auto space-y-4">
                  <Badge variant="outline" className="w-fit">
                    {client.type}
                  </Badge>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {client.description}
                  </p>
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

      {/* Worked With - Clients Section */}
      <section className="bg-accent/20 border-b py-16 lg:py-24">
        <div className="container mx-auto max-w-5xl px-6 lg:px-8">
          <div className="fade-down mb-12">
            <div className="mb-3 flex items-center gap-3">
              <Globe className="text-primary h-8 w-8" />
              <h2 className="text-3xl font-semibold lg:text-4xl">
                Memberships
              </h2>
            </div>
            <p className="text-muted-foreground">
              Collaborations with leading institutions and organizations
            </p>
          </div>

          <div className="fade-up grid grid-cols-1 gap-6 md:grid-cols-3">
            {memberships.map((membership, idx) => {
              const IconComponent = membership.icon;
              return (
                <Card key={idx} className="bg-card/50 border-2">
                  <CardHeader>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="bg-primary/10 rounded-lg p-2">
                        <IconComponent className="text-primary h-5 w-5" />
                      </div>
                      <CardTitle className="text-sm">
                        {membership.role}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <span className="text-muted-foreground text-xs">
                      {membership.period}
                    </span>
                  </CardContent>
                </Card>
              );
            })}
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
