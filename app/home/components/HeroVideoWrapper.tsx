"use client";
import { motion } from "framer-motion";
import HeroVideo from "./HeroVideo";
const HeroVideoWrapper = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
    >
      <HeroVideo />
    </motion.div>
  );
};

export default HeroVideoWrapper;
