import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/publications", label: "Publications" },
    { href: "/news", label: "News" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:rafimehdihasan@gmail.com", label: "Email" },
  ];

  return (
    <footer className="bg-card mt-auto border-t">
      <div className="container mx-auto px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Mehedi Hasan Rafi</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              PhD Researcher specializing in Earth & Atmospheric science.
            </p>
            <p className="text-muted-foreground text-xs">
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
                    className="text-muted-foreground hover:text-primary inline-block cursor-pointer text-sm transition-colors"
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
                  className="bg-accent hover-elevate active-elevate-2 flex h-10 w-10 items-center justify-center rounded-md transition-transform"
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              Follow my research journey and stay updated with the latest
              findings in atmospheric science.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
