import { motion, MotionConfig } from "framer-motion";
import { useMobileNavStore } from "./useMobileNavStore";
const MobileNavToggle = () => {
  const navOpen = useMobileNavStore((state) => state.navOpen);
  const setNavOpen = useMobileNavStore((state) => state.setNavOpen);
  return (
    <MotionConfig transition={{ duration: 0.3, ease: "easeIn" }}>
      <motion.button
        onClick={() => setNavOpen(!navOpen)}
        className="relative w-20 h-20 cursor-pointer"
        animate={navOpen ? "open" : "closed"}
      >
        <motion.span
          style={{
            left: "50%",
            top: "45%",
            x: "-50%",
            y: "-50%",
          }}
          className="absolute h-0.5 w-6 bg-white"
          variants={{
            open: {
              rotate: ["0deg", "0deg", "0deg", "45deg"],
              top: ["45%", "50%", "50%", "50%"],
            },
            closed: {
              rotate: ["45deg", "0deg", "0deg", "0deg"],
              top: ["50%", "50%", "50%", "45%"],
            },
          }}
        />
        <motion.span
          style={{
            left: "50%",
            top: "55%",
            x: "-50%",
            y: "-50%",
          }}
          className="absolute h-0.5 w-6 bg-white"
          variants={{
            open: {
              rotate: ["0deg", "0deg", "0deg", "-45deg"],
              top: ["55%", "50%", "50%", "50%"],
            },
            closed: {
              rotate: ["-45deg", "0deg", "0deg", "0deg"],
              top: ["50%", "50%", "50%", "55%"],
            },
          }}
        />
      </motion.button>
    </MotionConfig>
  );
};

export default MobileNavToggle;
