import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { CommandPalette } from "./components/CommandPalette";
import { Footer } from "./components/Footer";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Skills } from "./sections/Skills";
import { Projects } from "./sections/Projects";
import { ProblemSolving } from "./sections/ProblemSolving";
import { Experience } from "./sections/Experience";
import { Achievements } from "./sections/Achievements";
import { Education } from "./sections/Education";
import { Contact } from "./sections/Contact";

function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-hidden bg-bg">
        <Navbar onOpenPalette={() => setPaletteOpen(true)} />
        <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <ProblemSolving />
          <Experience />
          <Education />
          <Achievements />
          <Contact />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
