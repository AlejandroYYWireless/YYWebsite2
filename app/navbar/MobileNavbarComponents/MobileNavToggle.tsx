"use client";

import { motion, MotionConfig } from "framer-motion";
import { useState } from "react";
import { useMobileNavStore } from "./useMobileNavStore";

const MobileNavToggle = () => {
  const navOpen = useMobileNavStore((state) => state.navOpen);
  const setNavOpen = useMobileNavStore((state) => state.setNavOpen);
  const [isHovered, setIsHovered] = useState(false);

  // Toggle body scroll based on nav state
  if (navOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  // These functions will update the hover state
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <MotionConfig transition={{ duration: 0.3, ease: "easeIn" }}>
      <motion.button
        onClick={() => setNavOpen(!navOpen)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-10 h-12 cursor-pointer"
        aria-label="Toggle mobile navigation"
        animate={navOpen ? "open" : "closed"}
        data-hovered={isHovered} // This attribute can be used for testing
      >
        <motion.span
          style={{
            left: "50%",
            top: "40%",
            x: "-50%",
            y: "-50%",
          }}
          className="absolute h-0.5 w-6 bg-white"
          variants={{
            open: {
              rotate: ["0deg", "0deg", "0deg", "45deg"],
              top: ["40%", "50%", "50%", "50%"],
            },
            closed: {
              rotate: ["45deg", "0deg", "0deg", "0deg"],
              top: ["50%", "50%", "50%", "40%"],
            },
          }}
        />
        <motion.span
          style={{
            left: "50%",
            top: "60%",
            x: "-50%",
            y: "-50%",
          }}
          className="absolute h-0.5 w-6 bg-white"
          variants={{
            open: {
              rotate: ["0deg", "0deg", "0deg", "-45deg"],
              top: ["60%", "50%", "50%", "50%"],
            },
            closed: {
              rotate: ["-45deg", "0deg", "0deg", "0deg"],
              top: ["50%", "50%", "50%", "60%"],
            },
          }}
        />
      </motion.button>
    </MotionConfig>
  );
};

export default MobileNavToggle;
