"use client";

import { AuroraText } from "@/components/magicui/aurora-text";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { motion } from "framer-motion";
import Image from "next/image";

const brandImages = [
  "/images/brands/UPS.png",
  "/images/brands/Amazon.png",
  "/images/brands/Walmart.png",
  "/images/brands/eBay.png",
  "/images/brands/PhoneCheck.png",
  "/images/brands/Reebelo.png",
  "/images/brands/ATT.png",
  "/images/brands/TMobile.png",
  "/images/brands/USPS.png",
  "/images/brands/FedEx.png",
];

const BrandCard = ({ img }: { img: string }) => {
  // Extract brand name from the path for alt text
  const brandName = img.split("/").pop()?.split(".")[0] || "Brand";

  return (
    <figure
      className={cn(
        "relative flex items-center justify-center h-24 min-w-[180px] select-none max-w-[250px] mx-2 cursor-default overflow-hidden rounded-xl bg-slate-100 dark:bg-white p-2"
      )}
    >
      <div className="relative w-full h-full">
        <Image
          className="object-contain"
          fill
          sizes="(max-width: 768px) 100vw, 200px"
          alt={`${brandName} logo`}
          src={img}
        />
      </div>
    </figure>
  );
};

const colors = ["#98FB98", "#a3ff1a", "#90EE90", "#00b3ff", "#87CEFA"];

export function Partners() {
  return (
    <div className="relative  w-full bg-stone-800 py-[100px]">
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-stone-800 to-black"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.7,
          ease: "easeInOut",
        }}
        className="flex justify-center flex-col items-center space-y-12 mt-6 mb-24 px-4"
      >
        <h2 className="text-4xl md:text-5xl text-white lg:text-7xl font-semibold text-center">
          Our{" "}
          <AuroraText colors={colors} className="font-bold">
            Partners
          </AuroraText>{" "}
        </h2>
        <div className="relative w-full max-w-7xl overflow-hidden ">
          <Marquee pauseOnHover className="[--duration:20s]">
            {brandImages.map((brand) => (
              <BrandCard key={brand} img={brand} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-stone-800"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l  from-stone-800"></div>
        </div>
      </motion.div>
    </div>
  );
}
