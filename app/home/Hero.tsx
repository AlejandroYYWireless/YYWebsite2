import Image from "next/image";
import HeroText from "./components/HeroComponents/HeroText";

const Hero = () => {
  return (
    <div>
      <div className="">
        <div className="absolute inset-0 -top-[108px]">
          <Image
            src={"/images/brands/DesktopBackground.webp"}
            alt="background"
            width={1920}
            height={1220}
            priority
            className=""
          />
        </div>
        <HeroText />
      </div>
    </div>
  );
};

export default Hero;
