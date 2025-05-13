// src/app/page.tsx
import PublicLayout from "@/components/Layouts/PublicLayout";
import Hero from "@/components/sections/Hero";
import RecommendedProducts from "@/components/sections/RecommendedProducts";

export default function Home() {
  return (
    <PublicLayout>
      <Hero />
      <RecommendedProducts />
    </PublicLayout>
  );
}