import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Database, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code2,
    skills: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "DaisyUI", level: 90 },
      { name: "HTML5/CSS3", level: 95 },
    ],
  },
  {
    title: "Backend & Database",
    icon: Database,
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "REST API", level: 90 },
      { name: "Firebase Auth", level: 85 },
      { name: "NextAuth.js", level: 80 },
    ],
  },
  {
    title: "Tools & Deployment",
    icon: Wrench,
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Postman", level: 85 },
      { name: "Vercel", level: 90 },
      { name: "Netlify", level: 90 },
      { name: "Firebase Hosting", level: 85 },
    ],
  },
];

function SkillBar({
  name,
  level,
  delay,
}: {
  name: string;
  level: number;
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="mb-4 group">
      <div className="flex justify-between mb-2">
        <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
          {name}
        </span>
        <span className="text-muted-foreground text-sm font-medium">
          {level}%
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-primary rounded-full relative"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay, ease: "easeOut" }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]" />
        </motion.div>
      </div>
    </div>
  );
}

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(174_72%_56%_/_0.05),_transparent_70%)]" />
      <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
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
              My Expertise
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2">
              Skills & <span className="text-gradient">Technologies</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              I'm constantly learning and improving my skills. Here are the
              technologies I work with on a daily basis to build amazing
              products.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                className="glass rounded-2xl p-8 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + categoryIndex * 0.1, duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                    <category.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={0.4 + categoryIndex * 0.1 + skillIndex * 0.05}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
