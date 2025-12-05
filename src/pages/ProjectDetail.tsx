import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Layers,
  Box,
  Terminal,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { Project } from "@/types";

import { Helmet } from "react-helmet-async";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data: Project[]) => {
        const foundProject = data.find((p) => p.id === Number(id));
        setProject(foundProject || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching project:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading project details...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link to="/">
            <Button variant="gradient">Go Back Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{project.title} | Shamim Ahmmed</title>
        <meta name="description" content={project.description} />
      </Helmet>
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/#projects">
              <Button variant="ghost" className="mb-8">
                <ArrowLeft size={18} className="mr-2" />
                Back to Projects
              </Button>
            </Link>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="relative aspect-video rounded-2xl overflow-hidden mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </motion.div>

          {/* Content */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {project.title}
              </h1>

              <div className="flex items-center gap-2 text-muted-foreground mb-8">
                <Calendar size={18} />
                <span>2024</span>
              </div>

              <div className="prose prose-invert max-w-none mb-12">
                <p className="text-lg text-muted-foreground whitespace-pre-line">
                  {project.fullDescription || project.description}
                </p>
              </div>

              {/* Features */}
              {project.features && (
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="text-primary" size={20} />
                    </div>
                    <h2 className="text-2xl font-bold">Key Features</h2>
                  </div>
                  <ul className="grid gap-4">
                    {project.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3 glass rounded-lg p-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <span className="text-primary font-bold mt-1">•</span>
                        <span className="text-muted-foreground">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Architecture */}
              {project.architecture && (
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <Layers className="text-primary" size={20} />
                    </div>
                    <h2 className="text-2xl font-bold">Architecture & Tech</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.architecture.map((item, index) => (
                      <motion.div
                        key={index}
                        className="glass rounded-lg p-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <span className="text-muted-foreground">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dependencies */}
              {project.dependencies && (
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <Box className="text-primary" size={20} />
                    </div>
                    <h2 className="text-2xl font-bold">Core Dependencies</h2>
                  </div>
                  <div className="glass rounded-xl p-6 overflow-x-auto">
                    <pre className="text-sm text-muted-foreground">
                      {JSON.stringify(project.dependencies, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {/* Getting Started */}
              {project.gettingStarted && (
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <Terminal className="text-primary" size={20} />
                    </div>
                    <h2 className="text-2xl font-bold">Getting Started</h2>
                  </div>
                  <div className="space-y-4">
                    {project.gettingStarted.map((step, index) => (
                      <div
                        key={index}
                        className="glass rounded-lg p-4 font-mono text-sm text-muted-foreground"
                      >
                        $ {step}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="glass rounded-2xl p-6 sticky top-24">
                <h3 className="text-lg font-bold mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-2 text-sm font-medium rounded-lg bg-primary/10 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="space-y-4">
                  <Button variant="gradient" className="w-full" asChild>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={18} className="mr-2" />
                      View Live Demo
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={18} className="mr-2" />
                      View Source Code
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
