import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMouseEffect } from "@/contexts/MouseEffectContext";

export function CustomCursor() {
  const { isEnabled } = useMouseEffect();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    if (isEnabled) {
      window.addEventListener("mousemove", updateMousePosition);
    }

    // Add hover listeners to interactive elements
    const handleHover = () => {
      const elements = document.querySelectorAll(
        "a, button, input, textarea, [role='button']"
      );
      elements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
      return () => {
        elements.forEach((el) => {
          el.removeEventListener("mouseenter", handleMouseEnter);
          el.removeEventListener("mouseleave", handleMouseLeave);
        });
      };
    };

    // Initial setup and observer for dynamic content
    let cleanupHover: () => void;
    let observer: MutationObserver;

    if (isEnabled) {
      cleanupHover = handleHover();
      observer = new MutationObserver(handleHover);
      observer.observe(document.body, { childList: true, subtree: true });
    }

    // Hide default cursor only when custom cursor is enabled
    if (isEnabled) {
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "auto";
    }

    return () => {
      if (isEnabled) {
        window.removeEventListener("mousemove", updateMousePosition);
        if (cleanupHover) cleanupHover();
        if (observer) observer.disconnect();
      }
      document.body.style.cursor = "auto";
    };
  }, [isVisible, isEnabled]);

  // Hide on touch devices
  if (
    typeof navigator !== "undefined" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return null;
  }

  if (!isEnabled) return null;

  return (
    <>
      <style>{`
        body {
          cursor: none;
        }
        a, button, input, textarea, [role='button'] {
          cursor: none;
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-primary rounded-full pointer-events-none z-[9998] mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 25,
          mass: 0.2,
        }}
      />
    </>
  );
}
