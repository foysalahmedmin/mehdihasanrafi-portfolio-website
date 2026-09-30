import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePageSEO } from "@/hooks/utils/usePageSeo";
import {
  Atom,
  Award,
  Brain,
  Briefcase,
  Building2,
  ChevronDown,
  Cloud,
  Code,
  Globe,
  GraduationCap,
  Layers,
  Mic,
  Microscope,
  Navigation,
  Quote,
  Satellite,
  Search,
  Signal,
  Sun,
  Trophy,
  Users,
  Waves,
  Wind,
  Zap,
} from "lucide-react";

export default function About() {
  usePageSEO({
    title: "About",
    description:
      "Learn about Mehdi Hasan Rafi's academic background, research experience, and expertise in atmospheric science. Discover his educational journey, skills, and contributions to climate modeling.",
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
      role: "Researcher",
      organization:
        "International Research Experience Program (IREP) — Instituto Geofísico del Perú (IGP), known as Jicamarca Radio Observatory, Lima, Peru",
      period: "May 2026 – August 2026",
      description:
        "Investigating the nighttime equatorial plasma irregularities and their relationship with E×B vertical plasma drift was conducted using ROTI and Incoherent Scatter Radar (ISR) observations in the equatorial region.",
    },
    {
      role: "Research Scholar",
      organization:
        "Project GARE, Bangladesh — Funding Authority: Bangladesh Bureau of Educational Information & Statistics",
      period: "2025 – 2026",
      description:
        "Responsible for analyzing lightning patterns during convective seasons, developing lightning vulnerability maps and supporting the development of a beneficiary database to improve lightning early warning systems in Bangladesh.",
    },
    {
      role: "Research Scholar (Remote)",
      organization:
        "Istituto Nazionale di Geofisica e Vulcanologia (INGV), Italy — PI: Dr. Claudio Cessaroni",
      period: "Jun 2024 – Present",
      description:
        "Responsible for analyzing ionospheric scintillation effects over Bangladesh and the broader South Asian region.",
    },
    {
      role: "Doctoral Fellow — Research Scholar",
      organization:
        "Military Institute of Science & Technology, Dhaka, Bangladesh",
      period: "Apr 2023 – Mar 2026",
      description:
        "Responsible for conducting advanced research and leading undergraduate researchers to collaborate with faculty members.",
    },
    {
      role: "Co-Investigator (Remote)",
      organization:
        "Frederick University, Cyprus — Cyprus Ionospheric Research Group, PI: Dr. Haris Haralambous",
      period: "Jul 2023 – Jun 2024",
      description:
        "Investigating the correlation between the Rate of Total Electron Content Index and Spread F over Europe and America.",
    },
    {
      role: "Research Scholar",
      organization:
        "Project BANBAIS, Bangladesh — Funding Authority: GoB, Ministry of Education, Bangladesh",
      period: "FY 2023 – 2025",
      description:
        "Responsible for developing an ionospheric monitoring system for Bangladesh: Empowering Geospace Research.",
    },
    {
      role: "Co-Investigator (Remote)",
      organization:
        "University of Washington, Seattle, United States — World Wide Lightning Location Network, PI: Emeritus Professor Robert H. Holzworth",
      period: "2022 – 2023",
      description:
        "Responsible for analyzing VLF receiver data and determining the network detection efficiency.",
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
        "Space Weather",
        "Satellite Observations",
        "Atmospheric Physics",
        "Radar System Acquisition",
      ],
    },
  ];

  const researchInterests = [
    {
      title: "Upper Atmosphere",
      description:
        "Investigating the structure, variability and physical processes of the upper atmosphere using ground based and satellite observations.",
      icon: Layers,
    },
    {
      title: "Ionospheric Irregularities",
      description:
        "Studying the formation, evolution and characteristics of ionospheric irregularities and their relationship with plasma dynamics.",
      icon: Waves,
    },
    {
      title: "Ionospheric Scintillation",
      description:
        "Analyzing ionospheric scintillation using GNSS observations to understand signal fluctuations and space weather effects.",
      icon: Signal,
    },
    {
      title: "Ionospheric Plasma Dynamics",
      description:
        "Examining plasma dynamics, vertical plasma drift and E×B processes associated with nighttime equatorial ionospheric variability.",
      icon: Atom,
    },
    {
      title: "Space Weather Applications",
      description:
        "Investigating ionospheric variability and space weather effects to support monitoring, prediction and communication applications.",
      icon: Sun,
    },
    {
      title: "Satellite Navigation",
      description:
        "Studying ionospheric effects on GNSS signals and satellite navigation through TEC, scintillation and related observations.",
      icon: Navigation,
    },
    {
      title: "Lightning Meteorology",
      description:
        "Investigating the distribution, intensity and evolution of lightning and its relationship with convection and severe weather.",
      icon: Cloud,
    },
    {
      title: "Remote Sensing",
      description:
        "Using satellite, radar and ground based observations to investigate atmospheric and ionospheric processes.",
      icon: Satellite,
    },
    {
      title: "Tropical Storms",
      description:
        "Studying the development, structure and evolution of tropical cyclones and their associated atmospheric and lightning characteristics.",
      icon: Wind,
    },
  ];

  const awards = [
    {
      title: "Outstanding Research Contribution Award",
      organization:
        "Bangladesh Council of Scientific and Industrial Research (BCSIR)",
      year: "2025",
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
      title: "Best Researcher Award (Weather & Atmosphere)",
      organization:
        "Organized by World Science Awards. Theme: Empowering Research & Inspiring Innovation.",
      year: "2024",
      description: "Recognized for outstanding academic achievements",
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
      name: "Springer Nature (Theoretical and Applied Climatology)",
      type: "Reviewer",
      description:
        "Reviewed scientific manuscripts and conference submissions in climate and environmental research",
    },
    {
      name: "Frontiers in Astronomy and Space Sciences",
      type: "Reviewer",
      description:
        "Reviewed scientific manuscripts and conference submissions in climate and environmental research",
    },
    {
      name: "International Conference on Advances in Civil and Ecological Engineering Research, Macao, China",
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

  const invitedTalks = [
    {
      title:
        "Ionospheric Research and Development in Bangladesh: Current Status and Future Scope",
      venue: "Jicamarca Radio Observatory, Peru",
      date: "9 June 2026",
      type: "Invited Talk",
    },
    {
      title:
        "Research Experience at Jicamarca Radio Observatory: Reflections on Peru's History and Culture",
      venue:
        "104th Anniversary Program of the Jicamarca Radio Observatory, Lima, Peru",
      date: "28 July 2026",
      type: "Invited Talk",
    },
    {
      title:
        "Lightning Characteristics within Tropical Cyclones over the Indian Ocean",
      venue:
        "American Geophysical Union (AGU) Annual Meeting, Advancing Earth and Space Science, New Orleans, United States",
      date: "December 2025",
      type: "Conference Presentation",
    },
    {
      title: "Lightning Research Using the International Space Station",
      venue: "Military Institute of Science and Technology (MIST), Bangladesh",
      date: "January 2023",
      type: "Seminar",
    },
    {
      title:
        "Development of the World Wide Lightning Location Network (WWLLN) and Lightning Research in Bangladesh",
      venue: "2022 International Conference on Energy and Power Engineering (ICEPE)",
      date: "November 2022",
      type: "Invited Talk",
    },
    {
      title: "Machine Learning Applications for Lightning Prediction",
      venue: "RAWSET Conference, KL University, India",
      date: "November 2022",
      type: "Invited Talk",
    },
  ];

  const testimonials = [
    {
      quote:
        "Mehdi demonstrates exceptional programming and analytical skills and dedication to the research. His work on lightning meteorology has been instrumental to our team's success.",
      author: "Robert H. Holzworth",
      role: "Professor Emeritus, Earth and Space Sciences",
      institution: "University of Washington",
    },
    {
      quote:
        "An outstanding researcher with a keen eye for detail. Mehdi's contributions to our ionospheric research projects have been invaluable.",
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
                    alt="Mehdi Hasan Rafi"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="fade-left space-y-6 lg:col-span-2 lg:self-center">
              <div>
                <h1 className="mb-4 text-4xl font-bold lg:text-5xl">
                  About Mehdi Hasan Rafi
                </h1>
                <p className="text-muted-foreground text-xl">
                  PhD Candidate in Earth & Atmospheric Science
                </p>
              </div>

              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  I am a PhD researcher working in Earth and atmospheric science
                  with a focus on ionospheric and atmospheric research. My work
                  involves studying ionospheric irregularities, plasma dynamics,
                  space weather and lightning using ground based observations,
                  satellite data and computational methods.
                </p>
                <p>
                  My research brings together multi instrument observations,
                  scientific data analysis, remote sensing and machine learning
                  to better understand atmospheric and ionospheric processes. I
                  have research experience with Jicamarca Radio Observatory,
                  GNSS observations, incoherent scatter radar and lightning
                  detection systems.
                </p>
                <p>
                  I am particularly interested in understanding how changes in
                  the upper atmosphere and ionosphere affect space based
                  technologies and how scientific observations can be used to
                  improve monitoring and prediction.
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
              <Card key={index} className="h-full md:last:col-span-2">
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
              <Card key={index} className="border-2 md:last:col-span-2">
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

      {/* Section Divider with Arrow */}
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground flex flex-col items-center gap-2">
          <div className="bg-border h-12 w-px"></div>
          <ChevronDown className="h-6 w-6 animate-pulse" />
          <div className="bg-border h-12 w-px"></div>
        </div>
      </div>

      {/* Invited Talks and Seminars */}
      <section className="border-b py-16 lg:py-24">
        <div className="container mx-auto max-w-5xl px-6 lg:px-8">
          <div className="fade-down mb-12">
            <div className="mb-3 flex items-center gap-3">
              <Mic className="text-primary h-8 w-8" />
              <h2 className="text-3xl font-semibold lg:text-4xl">
                Invited Talks & Seminars
              </h2>
            </div>
            <p className="text-muted-foreground">
              Invited talks, seminars, and conference presentations
            </p>
          </div>

          <div className="fade-up space-y-6">
            {invitedTalks.map((talk, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">"{talk.title}"</CardTitle>
                      <p className="text-muted-foreground text-base font-medium">
                        {talk.venue}
                      </p>
                    </div>
                    <Badge variant="secondary" className="font-mono">
                      {talk.date}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="w-fit">
                    {talk.type}
                  </Badge>
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
