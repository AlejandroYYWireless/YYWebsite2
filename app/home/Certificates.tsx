"use client";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { motion } from "framer-motion";
import { DownloadIcon } from "lucide-react";
import Image from "next/image";

interface CertificateCardProps {
  image: string;
  alt: string;
  title: string;
  description: string;
  isRound?: boolean;
  link?: string;
}
// Certificate Card Component
const CertificateCard = ({
  image,
  alt,
  title,
  description,
  isRound = false,
  link = "",
}: CertificateCardProps) => {
  const handleDownload = async () => {
    try {
      // Fetch the image
      const response = await fetch(image);
      const blob = await response.blob();

      // Create a temporary URL to the blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element and trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title.replace(/\s+/g, "-").toLowerCase()}.${
        blob.type.split("/")[1]
      }`;
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleClick = () => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="rounded-xl w-full sm:max-w-[250px] md:max-w-[280px] lg:max-w-[300px] flex flex-col justify-between shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl bg-stone-800 h-auto mb-4">
      <div
        className={`relative ${
          isRound
            ? "flex items-center bg-white justify-center p-2 sm:p-3 lg:p-4"
            : "w-full h-36 sm:h-40 md:h-44 lg:h-48"
        } ${link ? "cursor-pointer bg-white" : "bg-white"}`}
      >
        {isRound ? (
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-30 md:h-30 lg:w-32 lg:h-32 relative rounded-full shadow-lg overflow-hidden border-4 border-gray-600/50">
            <Image
              src={image}
              alt={alt}
              width={128}
              height={128}
              className="object-cover"
              onClick={handleClick}
            />
          </div>
        ) : (
          <div className="w-full h-36 sm:h-40 md:h-44 lg:h-48 relative">
            <Image
              src={image}
              alt={alt}
              width={300}
              height={192}
              className="object-contain p-2 sm:p-3 lg:p-4 w-full h-full"
              onClick={handleClick}
            />
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4 lg:p-5 border-t border-gray-600">
        <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-gray-100">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-gray-300 mb-2 sm:mb-3 lg:mb-4">
          {description}
        </p>
        <button
          onClick={handleDownload}
          className="cursor-pointer hover:underline inline-flex items-center text-gray-300 hover:text-gray-100 transition-colors text-sm sm:text-base"
        >
          <DownloadIcon className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Download
        </button>
      </div>
    </div>
  );
};

// Certificate data
const certificatesData = [
  {
    image: "/images/certifications/R2.webp",
    alt: "R2 Certificate",
    title: "R2 Certification",
    description:
      "Electronics recycling standard certification for responsible recycling practices and environmental stewardship.",
    isRound: false,
    link: "https://www.r2solutions.org/",
  },
  {
    image: "/images/certifications/adisa.jpg",
    alt: "ADISA Certification",
    title: "ADISA Certification",
    description:
      "Asset Disposal and Information Security Alliance certification for secure data destruction and IT asset disposal.",
    isRound: true,
  },
  {
    image: "/images/certifications/ISO9001.png",
    alt: "International Organization for Standarization 9001",
    title: "ISO 9001",
    description:
      "Quality Management System certification ensuring consistent service quality and customer satisfaction.",
    isRound: false,
  },
  {
    image: "/images/certifications/ISO9001.png",
    alt: "International Organization for Standarization 14001",
    title: "ISO 14001",
    description:
      "Environmental Management System certification demonstrating our commitment to environmental responsibility.",
    isRound: false,
  },
];

const HomeCertificates = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      viewport={{
        once: true,
        amount: 0.1,
        margin: "0px 0px -20% 0px",
      }}
      transition={{
        duration: 0.7,
        ease: "easeInOut",
      }}
      className="relative py-4 sm:py-5 lg:py-6 px-4 sm:px-6 lg:px-0"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="flex mt-[200px] md:mt-[300px] lg:mt-[500px] xl:mt-[700px] flex-col items-center justify-center  gap-2 sm:gap-3 lg:gap-4 relative z-1">
        <BoxReveal boxColor={"#1E293B"} duration={0.5}>
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold h-auto sm:h-16 lg:h-20 text-gray-100">
            We are fully certified<span className="text-gray-400">.</span>
          </p>
        </BoxReveal>

        <BoxReveal boxColor={"#1E293B"} duration={0.5}>
          <p className="mt-1 sm:mt-2 lg:mt-[.5rem] text-sm sm:text-base lg:text-[1rem] p-3 sm:p-4 rounded-lg sm:rounded-xl text-gray-300">
            All of our certifications are up to date, and are as follows Rest
            easy knowing you&apos;re in{" "}
            <span className="text-gray-100 font-medium">good care</span> with
            YYWireless.
          </p>
        </BoxReveal>

        <div className="grid grid-cols-1 place-items-center align-top sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-6">
          {certificatesData.map((certificate, index) => (
            <CertificateCard
              key={index}
              image={certificate.image}
              alt={certificate.alt}
              title={certificate.title}
              description={certificate.description}
              isRound={certificate.isRound}
              link={certificate.link || ""}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HomeCertificates;
