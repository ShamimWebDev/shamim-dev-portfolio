import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

const education = [
  {
    degree: "Higher Secondary School Certificate - HSC",
    institution: "National College",
    location: "Dhaka, Bangladesh",
    period: "Passing Year – 2013",
    description:
      "Completed Higher Secondary School Certificate with a focus on Commerce.",
    achievements: [],
  },
];

function TimelineItem({ item, index }: { item: any; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="relative pl-8 pb-12 last:pb-0"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
    >
      {/* Timeline Line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />

      {/* Timeline Dot */}
      <div className="absolute left-0 top-1 w-3 h-3 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" />

      <div className="glass rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {item.degree}
            </h3>
            <p className="text-lg text-primary/80 font-medium mt-1">
              {item.institution}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
              <Calendar size={14} />
              {item.period}
            </span>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={14} />
              {item.location}
            </span>
          </div>
        </div>

        <p className="text-muted-foreground mb-6 leading-relaxed">
          {item.description}
        </p>

        {item.achievements.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.achievements.map((achievement: string) => (
              <span
                key={achievement}
                className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/10"
              >
                {achievement}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function EducationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(262_83%_68%_/_0.05),_transparent_70%)]" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />

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
              My Background
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2">
              <span className="text-gradient">Education</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              My academic journey has been a foundation for my technical skills
              and problem-solving abilities.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Education */}
            <div>
              <div className="flex items-center justify-center gap-4 mb-12">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center shadow-lg">
                  <GraduationCap className="text-primary" size={28} />
                </div>
                <h3 className="text-3xl font-bold">Academic History</h3>
              </div>
              <div className="pl-4">
                {education.map((item, index) => (
                  <TimelineItem key={item.degree} item={item} index={index} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
