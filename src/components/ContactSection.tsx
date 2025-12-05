import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  User,
  AtSign,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "shamim.ct17@gmail.com",
    href: "mailto:shamim.ct17@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+880 1963 912757",
    href: "tel:+8801963912757",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+880 1963 912757",
    href: "https://wa.me/8801963912757",
  },
  { icon: MapPin, label: "Location", value: "Dhaka, Bangladesh", href: null },
];

export function ContactSection() {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast({
        title: "Configuration Error",
        description:
          "EmailJS credentials are missing in environment variables.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current!,
        publicKey
      );

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Error Sending Message",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(174_72%_56%_/_0.08),_transparent_60%)]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

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
              Get In Touch
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2">
              Contact <span className="text-gradient">Me</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Have a project in mind or want to discuss opportunities? Feel free
              to reach out. I'd love to hear from you!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-6">
                Let's talk about everything!
              </h3>
              <p className="text-muted-foreground mb-8 text-lg">
                Feel free to get in touch with me. I am always open to
                discussing new projects, creative ideas or opportunities to be
                part of your visions.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center gap-4 glass rounded-xl p-5 hover:border-primary/30 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={
                            item.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel="noopener noreferrer"
                          className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-lg font-semibold text-foreground">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-8 shadow-xl border border-white/10"
              >
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <User size={16} className="text-primary" /> Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <AtSign size={16} className="text-primary" /> Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="mb-6 space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <MessageSquare size={16} className="text-primary" /> Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="mb-6 space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <MessageCircle size={16} className="text-primary" /> Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none placeholder:text-muted-foreground/50"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  className="w-full group"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 size={18} className="mr-2 animate-spin" />
                  ) : (
                    <Send
                      size={18}
                      className="mr-2 group-hover:translate-x-1 transition-transform"
                    />
                  )}
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
