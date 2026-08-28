import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import FeaturedBooks from "@/components/FeaturedBooks";
import HowItWorks from "@/components/HowItWorks";
import CategoryShowcase from "@/components/CategoryShowcase";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedBooks />
      <CategoryShowcase />
      <HowItWorks />
    </>
  );
}
