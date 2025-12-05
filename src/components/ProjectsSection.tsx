import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Github, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Project } from "@/types";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="group glass rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

        {/* Overlay Links */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full glass flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="View Live Demo"
          >
            <ExternalLink size={20} />
          </motion.a>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full glass flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="View Source Code"
          >
            <Github size={20} />
          </motion.a>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass-strong text-xs font-medium text-primary flex items-center gap-1">
            <Star size={12} fill="currentColor" /> Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-all duration-300">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-6 line-clamp-2 flex-grow">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium rounded-full bg-primary/5 text-primary border border-primary/10"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-muted-foreground border border-white/5">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <Link to={`/project/${project.id}`} className="w-full">
            <Button
              variant="ghost"
              className="w-full group/btn justify-between hover:bg-primary/5 hover:text-primary"
            >
              View Details
              <ArrowRight
                className="ml-2 transition-transform group-hover/btn:translate-x-1"
                size={16}
              />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10px" });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Fetching projects...");
    fetch("/projects.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Projects fetched:", data);
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section
        id="projects"
        className="py-24 relative min-h-[500px] flex items-center justify-center"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="projects"
        className="py-24 relative min-h-[500px] flex items-center justify-center"
      >
        <div className="text-center p-8 glass rounded-2xl border-destructive/30">
          <p className="text-destructive font-medium mb-2">
            Failed to load projects
          </p>
          <p className="text-muted-foreground text-sm">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              className="text-primary font-medium"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              My Work
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and
              experience in building modern web applications.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
