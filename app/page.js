import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Demo from "./_components/Demo";
import Pricing from "./_components/Pricing";
import Features from "./_components/Features";
import Footer from "./_components/Footer";
import Techs from "./_components/Techs";

export default function Home() {
  return (
    <div className="md:px-16 lg:px-24 xl:px-36">
      <div
        className="absolute w-60 h-60 bg-gradient-to-br from-green-400 via-blue-400 to-blue-500 rounded-full blur-2xl opacity-40 z-0 pointer-events-none animate-pulse shadow-[0_0_80px_30px_rgba(34,197,94,0.3)]"
        style={{ top: '-50px', right: '500px' }}
      />

      <div className="relative z-10 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36">
        <Header />
        <Hero />
        <Demo />
        <Techs />
        <Features />
        <Pricing />
        <Footer />
      </div>
    </div>
  );
}
