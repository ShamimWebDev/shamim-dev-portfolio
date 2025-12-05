import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Download,
  ArrowDown,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typewriter } from "react-simple-typewriter";
import { useEffect, useRef, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { type Container, type ISourceOptions } from "@tsparticles/engine";

// ... (other imports)

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
  {
    icon: Mail,
    href: "mailto:shamim.dev.contact@gmail.com",
    label: "Email",
  },
];

import { useMouseEffect } from "@/contexts/MouseEffectContext";

// ... (other imports)

export function HeroSection() {
  const { isEnabled } = useMouseEffect();
  const [init, setInit] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "parallax",
          parallax: {
            enable: true,
            force: 60,
            smooth: 10,
          },
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 80,
      },
      opacity: {
        value: 0.3,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };

  const springConfig = { damping: 25, stiffness: 150 };

  // Only apply spring if enabled, otherwise 0
  const moveX = useSpring(
    useTransform(mouseX, [0, window.innerWidth], [-20, 20]),
    springConfig
  );
  const moveY = useSpring(
    useTransform(mouseY, [0, window.innerHeight], [-20, 20]),
    springConfig
  );
  const moveXReverse = useSpring(
    useTransform(mouseX, [0, window.innerWidth], [20, -20]),
    springConfig
  );
  const moveYReverse = useSpring(
    useTransform(mouseY, [0, window.innerHeight], [20, -20]),
    springConfig
  );

  return (
    <section
      ref={ref}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Particles Background - Only if enabled */}
      {init && (
        <div className="absolute inset-0 z-0">
          <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options}
            className="w-full h-full"
          />
        </div>
      )}

      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(174_72%_56%_/_0.15),_transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(262_83%_68%_/_0.15),_transparent_60%)] pointer-events-none" />

      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none" />

      {/* Floating Orbs with Parallax */}
      {/* ... (rest of the component) */}

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ y, opacity }}
          >
            <motion.div
              className="inline-block px-4 py-1.5 mb-6 rounded-full glass border-primary/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-primary font-medium text-sm">
                👋 Welcome to my portfolio
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-foreground">I'm </span>
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">
                Shamim Ahmmed
              </span>
            </motion.h1>

            <motion.div
              className="text-xl md:text-2xl font-medium text-muted-foreground mb-8 h-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-foreground">I am a </span>
              <span className="text-primary">
                <Typewriter
                  words={[
                    "MERN Stack Developer",
                    "Frontend Specialist",
                    "React Enthusiast",
                    "Problem Solver",
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </motion.div>

            <motion.p
              className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Motivated and hardworking developer with practical experience in
              building clean, responsive, and user-friendly web applications. I
              turn complex problems into simple, beautiful solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                variant="gradient"
                size="lg"
                className="h-12 px-8 text-base relative overflow-hidden group"
                asChild
              >
                <a href="#contact">
                  <span className="relative z-10">Hire Me</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base group relative overflow-hidden"
                asChild
              >
                <a
                  href="https://drive.google.com/uc?export=download&id=1b2sY9hial-Kq17njyfG9_11577ajtbzd"
                  download
                >
                  <span className="relative z-10 flex items-center">
                    <Download
                      className="mr-2 group-hover:translate-y-1 transition-transform"
                      size={18}
                    />
                    Download CV
                  </span>
                  <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ x: moveXReverse, y: moveYReverse }}
          >
            <div className="relative w-72 h-72 md:w-[450px] md:h-[450px]">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-full blur-[60px] animate-pulse-slow" />

              {/* Image Container */}
              <motion.div
                className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/20 glass p-2"
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 relative group">
                  <img
                    src="Shamim-MERN-stack.png"
                    alt="Shamim Ahmmed"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute top-10 right-10 w-4 h-4 bg-primary rounded-full blur-[2px]"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-20 left-10 w-3 h-3 bg-accent rounded-full blur-[1px]"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => {
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{ opacity }}
        >
          <div className="w-8 h-12 rounded-full border-2 border-muted-foreground/30 flex justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-primary rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
