"use client";
import { motion } from "framer-motion";
import QuickNav from "../QuickNav/QuickNav";
const HeroText = () => {
  return (
    <div className="relative top-[-50px] z-10">
      <div className="flex flex-col h-screen items-center justify-center py-4 px-8 space-y-4 text-center">
        <motion.h1
          initial={{ opacity: 0, rotateX: 30, y: 30 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ duration: 0.8, easy: "easeOut", delay: 0.2 }}
          className="text-lime-500 bg-black/50 p-4 text-[5vw] text-base/25 max-w-4xl"
        >
          Repurpose. Reconnect.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, rotateX: 25, y: 25 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ duration: 0.8, easy: "easeOut", delay: 0.6 }}
        >
          <QuickNav />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroText;
