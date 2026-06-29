import BentoGrid from "@/components/BentoGrid";
import About from "@/sections/About";
import Footer from "@/sections/Footer";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";

export default function Home() {
  return (
    <>
      <Hero />
      <BentoGrid />
      <About />
      <Services />
      <Footer />
    </>
  );
}
