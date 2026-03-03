import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";
import Nav from "@/components/ui/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Services />
      <Pricing />
      <Gallery />
      <Contact />
    </>
  );
}
