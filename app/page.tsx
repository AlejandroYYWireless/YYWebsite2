import Image from "next/image";
import QuickNav from "./home/components/QuickNav/QuickNav";
import HeroVideo from "./home/components/HeroVideo";

export default function Home() {
  return (
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
      {/* Add your content here, which will make the page scrollable */}
      <div className="relative top-[-50px] z-10">
        <div className="flex flex-col h-screen items-center justify-center py-4 px-8 space-y-4 text-center">
          <p className="text-white text-2xl font-lora">Websites</p>
          <h1 className="text-white text-8xl max-w-4xl">
            The leader in website design
          </h1>
          <button className="text-lg cursor-pointer  bg-white text-black my-16 p-4 uppercase font-normal mt-8">
            get started
          </button>
          <QuickNav />
          {/* <div className="bg flex justify-center items-center">
            <video src={"/videos/herovideo.mp4"} className="max-w-[60vw]" />
          </div> */}
        </div>
        <HeroVideo />
      </div>
    </div>
  );
}
