import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Facebook, Heart, Mail } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/ShamimWebDev", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/mdshamimahmmed",
    label: "LinkedIn",
  },
  {
    icon: Facebook,
    href: "https://web.facebook.com/ShamimWebDev1/",
    label: "Facebook",
  },
  { icon: Mail, href: "mailto:shamim.ct17@gmail.com", label: "Email" },
];

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Projects", href: "/#projects" },
  { name: "Contact", href: "/#contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href.replace("/", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative py-12 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-primary/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <motion.a
            href="/#home"
            className="text-3xl font-bold text-gradient mb-8"
            whileHover={{ scale: 1.05 }}
            onClick={(e) => handleNavClick(e, "/#home")}
          >
            {"<Dev />"}
          </motion.a>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-8 mb-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex gap-5 mb-10">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label={label}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center space-y-2">
            <p className="text-muted-foreground text-sm">
              © {currentYear} MD SHAMIM AHMMED. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm flex items-center justify-center gap-1.5">
              Made with{" "}
              <Heart
                size={14}
                className="text-red-500 fill-red-500 animate-pulse"
              />{" "}
              using React, TailwindCSS & Framer Motion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
