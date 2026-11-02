import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import FourDoors from "@/components/FourDoors";
import Headquarters from "@/components/Headquarters";
import Skills from "@/components/Skills";
import Journey from "@/components/Journey";
import Philosophy from "@/components/Philosophy";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ShivamAI from "@/components/ShivamAI";

export default function Home() {
  return (
    <SmoothScroll>
      <Cursor />
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <FourDoors />
        <Headquarters />
        <Skills />
        <Journey />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
      <ShivamAI />
    </SmoothScroll>
  );
}
