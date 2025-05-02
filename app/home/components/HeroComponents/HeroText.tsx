"use client";
import { motion } from "framer-motion";
import QuickNav from "../QuickNav/QuickNav";
import HeroVideo from "../HeroVideo";
const HeroText = () => {
  return (
    <div className="relative top-[-50px] z-10">
      <div className="flex flex-col h-screen items-center justify-center py-4 px-8 space-y-4 text-center">
        <motion.p
          initial={{ opacity: 0, rotateX: 20, y: 20 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ duration: 0.8, easy: "easeOut" }}
          className="text-white text-2xl font-lora"
        >
          Websites
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, rotateX: 30, y: 30 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ duration: 0.8, easy: "easeOut", delay: 0.2 }}
          className="text-white text-[5vw] text-base/25 max-w-4xl"
        >
          Repurpose. Reconnect.
        </motion.h1>
        <motion.button
          initial={{ opacity: 0, rotateX: 25, y: 25 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ duration: 0.8, easy: "easeOut", delay: 0.4 }}
          className="text-lg cursor-pointer  bg-white text-black my-16 p-4 uppercase font-normal mt-8"
        >
          get started
        </motion.button>
        <motion.div
          initial={{ opacity: 0, rotateX: 25, y: 25 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ duration: 0.8, easy: "easeOut", delay: 0.6 }}
        >
          <QuickNav />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
      >
        <HeroVideo />
      </motion.div>
    </div>
  );
};

export default HeroText;
