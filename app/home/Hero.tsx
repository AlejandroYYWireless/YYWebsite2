import Image from "next/image";
import HeroText from "./components/HeroComponents/HeroText";
import HeroVideoWrapper from "./components/HeroVideoWrapper";

const Hero = () => {
  return (
    <div className="relative h-screen">
      <div className="">
        <div className="absolute inset-0 -top-[108px]">
          <Image
            src={"/images/herobackground.jpg"}
            alt="background"
            width={1920}
            height={1220}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <HeroText />
      </div>
      <div className="absolute bottom-[-[40vh]] z-2 left-0 right-0">
        <HeroVideoWrapper />
      </div>
    </div>
  );
};

export default Hero;
