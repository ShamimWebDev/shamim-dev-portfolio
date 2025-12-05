import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MousePointer2, MousePointer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useMouseEffect } from "@/contexts/MouseEffectContext";

const navItems = [
  { name: "Home", href: "/#home", id: "home" },
  { name: "About", href: "/#about", id: "about" },
  { name: "Skills", href: "/#skills", id: "skills" },
  { name: "Projects", href: "/#projects", id: "projects" },
  { name: "Education", href: "/#education", id: "education" },
  { name: "Contact", href: "/#contact", id: "contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();
  const { isEnabled, toggle } = useMouseEffect();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Active section detection
      const sections = navItems.map((item) => item.id);
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    id: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(id);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-strong py-3 shadow-lg" : "bg-transparent py-5"
      }`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <motion.a
          href="/#home"
          className="text-2xl font-bold text-gradient relative z-10"
          whileHover={{ scale: 1.05 }}
          onClick={(e) => handleNavClick(e, "/#home", "home")}
        >
          {"<Dev />"}
        </motion.a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.name} className="relative">
              <a
                href={item.href}
                className={`text-sm font-medium transition-colors duration-300 ${
                  activeSection === item.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
                onClick={(e) => handleNavClick(e, item.href, item.id)}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="rounded-full w-10 h-10 bg-secondary/50 hover:bg-secondary/80 text-foreground"
            title={isEnabled ? "Disable Custom Cursor" : "Enable Custom Cursor"}
          >
            {isEnabled ? (
              <MousePointer2 size={20} />
            ) : (
              <MousePointer size={20} />
            )}
          </Button>

          <Button variant="gradient" className="hidden md:flex" asChild>
            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/#contact", "contact")}
            >
              Hire Me
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="rounded-full w-10 h-10 bg-secondary/50 hover:bg-secondary/80 text-foreground"
          >
            {isEnabled ? (
              <MousePointer2 size={20} />
            ) : (
              <MousePointer size={20} />
            )}
          </Button>

          <button
            className="text-foreground p-2 relative z-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-border/50 overflow-hidden"
          >
            <ul className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={`block py-2 text-lg font-medium transition-colors ${
                      activeSection === item.id
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    onClick={(e) => handleNavClick(e, item.href, item.id)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <Button variant="gradient" className="mt-4 w-full" asChild>
                <a
                  href="/#contact"
                  onClick={(e) => handleNavClick(e, "/#contact", "contact")}
                >
                  Hire Me
                </a>
              </Button>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
