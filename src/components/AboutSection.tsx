import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code2,
  Palette,
  Coffee,
  Gamepad2,
  Rocket,
  Brain,
  Users,
  Clock,
} from "lucide-react";

const interests = [
  {
    icon: Brain,
    label: "Problem Solving",
    description: "Finding efficient solutions to complex issues",
  },
  {
    icon: Rocket,
    label: "Fast Learner",
    description: "Quickly adapting to new technologies",
  },
  {
    icon: Users,
    label: "Team Player",
    description: "Collaborating effectively in agile environments",
  },
  {
    icon: Clock,
    label: "Time Management",
    description: "Delivering high-quality work on schedule",
  },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              className="text-primary font-medium"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              Career Objective
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2">
              About <span className="text-gradient">Me</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image & Stats */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="relative max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl transform rotate-6" />

                <div className="relative aspect-square rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-br from-secondary/50 to-muted/50 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                    <Code2
                      size={120}
                      className="text-primary/40 group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Floating Icons */}
                    <motion.div
                      className="absolute top-10 right-10 text-accent/40"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Palette size={40} />
                    </motion.div>
                    <motion.div
                      className="absolute bottom-10 left-10 text-primary/40"
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      <Coffee size={40} />
                    </motion.div>
                  </div>
                </div>

                {/* Stats Cards */}
                <motion.div
                  className="absolute -bottom-6 -right-6 glass-strong rounded-2xl p-6 shadow-xl border border-white/10"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-4xl font-bold text-gradient">1+</p>
                  <p className="text-muted-foreground text-sm font-medium">
                    Years Experience
                  </p>
                </motion.div>

                <motion.div
                  className="absolute -top-6 -left-6 glass-strong rounded-2xl p-6 shadow-xl border border-white/10"
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-4xl font-bold text-gradient">10+</p>
                  <p className="text-muted-foreground text-sm font-medium">
                    Projects Completed
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
                A Passionate{" "}
                <span className="text-primary">MERN Stack Developer</span> Based
                in Bangladesh
              </h3>

              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Motivated and hardworking MERN Stack Developer with practical
                  experience in building clean, responsive, and user-friendly
                  web applications. I am seeking a Junior Developer or MERN
                  Stack Internship position where I can apply my skills,
                  contribute to real projects, and continue growing into a
                  strong full-stack developer.
                </p>

                <p>
                  I specialize in building modern, responsive web applications
                  using the{" "}
                  <span className="text-foreground font-medium">
                    MERN stack (MongoDB, Express.js, React, Node.js)
                  </span>
                  . I believe in writing clean, maintainable code and creating
                  intuitive user experiences that delight users.
                </p>
              </div>

              {/* Interests Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                {interests.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="glass rounded-xl p-4 flex items-start gap-4 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {item.label}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-snug">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
