import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UltimosTrabajos from "@/components/UltimosTrabajos";
import Equipo from "@/components/Equipo";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <Hero />
      <UltimosTrabajos />
      <Equipo />
      <Footer />
    </div>
  );
}
