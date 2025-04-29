// src/app/page.tsx
import Navbar from "@/components/Layouts/Navbar";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/Layouts/Footer";
import RecommendedProducts from "@/components/sections/RecommendedProducts";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <RecommendedProducts /> {/* Nueva sección */}
      </main>
      <Footer />
    </div>
  );
}