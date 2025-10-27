import { Link } from "wouter";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/publications", label: "Publications" },
    { href: "/news", label: "News" },
    { href: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:mehedi.rafi@university.edu", label: "Email" },
  ];

  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Mehedi Hasan Rafi</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              PhD Researcher specializing in atmospheric studies, climate modeling,
              and environmental science. Passionate about understanding Earth's
              atmosphere and its impact on our climate.
            </p>
            <p className="text-xs text-muted-foreground">
              © {currentYear} Mehedi Hasan Rafi. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer inline-block"
                    data-testid={`link-footer-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-md bg-accent hover-elevate active-elevate-2 transition-transform"
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Follow my research journey and stay updated with the latest
              findings in atmospheric science.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
