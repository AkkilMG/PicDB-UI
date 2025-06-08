import AboutSection from "@/components/home/about";
import HeroSection from "@/components/home/hero";
import { SavingsCalculator } from "@/components/home/saving";
import { TestimonialsSection } from "@/components/home/testimonials";
import Footer from "@/components/main/footer";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <>
      <div>
        <HeroSection />
      </div>
      <AboutSection />
      <SavingsCalculator />
      <TestimonialsSection />
      <Footer />
      
      <Toaster />
    </>
  );
}
