import { HeroVideoControls } from "./HeroVideoControls";
const HeroVideo = () => {
  const videoId = "hero-video";

  return (
    <div className="relative top-[-150px] flex justify-center items-center">
      <div className="p-3 relative bg-stone-950 rounded-3xl shadow-lg">
        <video
          id={videoId}
          src={"/videos/herovideo.mp4"}
          autoPlay
          loop
          muted
          className="max-w-[75vw] rounded-lg"
        />
        <HeroVideoControls videoId={videoId} />
      </div>
    </div>
  );
};

export default HeroVideo;
