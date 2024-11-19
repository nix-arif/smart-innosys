import Experience from "@/components/Experience";
import Intro from "@/components/Intro";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Product from "@/components/Product";
export default function Home() {
  return (
    <div className="md:w-10/12 mx-auto overflow-hidden">
      <Navbar />
      <div className="hidden sm:flex w-full bg-gray-100 h-0.5 dark:bg-gray-700"></div>
      <div className="relative">
        <Intro />
        <Hero />
        <div className="px-10 sm:px-0">
          <Product />
          <Experience />
        </div>
      </div>
    </div>
  );
}
