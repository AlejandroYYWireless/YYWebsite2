import Certificates from "./home/Certificates";
import Metrics from "./home/components/Metrics";
import Hero from "./home/Hero";
import { Partners } from "./home/Partners";

export default function Home() {
  return (
    <>
      <Hero />
      <Certificates />
      <Metrics />
      <Partners />
    </>
  );
}
