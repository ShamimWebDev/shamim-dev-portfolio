import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

      <div className="text-center relative z-10 px-6">
        <motion.h1
          className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent opacity-20 leading-none select-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          404
        </motion.h1>

        <motion.div
          className="mt-[-50px] md:mt-[-80px]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            Oops! It seems you've ventured into the unknown. The page you're
            looking for doesn't exist or has been moved.
          </p>

          <Link to="/">
            <Button variant="gradient" size="lg" className="group">
              <Home
                className="mr-2 group-hover:scale-110 transition-transform"
                size={18}
              />
              Return to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
