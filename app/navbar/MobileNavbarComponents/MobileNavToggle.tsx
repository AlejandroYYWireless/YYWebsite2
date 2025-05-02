import { motion, MotionConfig } from "framer-motion";
import { useMobileNavStore } from "./useMobileNavStore";

const MobileNavToggle = () => {
  const navOpen = useMobileNavStore((state) => state.navOpen);
  const setNavOpen = useMobileNavStore((state) => state.setNavOpen);
  return (
    <MotionConfig transition={{ duration: 0.3, ease: "easeIn" }}>
      <motion.button
        onClick={() => setNavOpen(!navOpen)}
        className="relative w-10 h-12 cursor-pointer"
        animate={navOpen ? "open" : "closed"}
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
