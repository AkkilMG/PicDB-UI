import AboutSection from "@/components/home/about";
import HeroSection from "@/components/home/hero";
import Footer from "@/components/main/footer";

export default function Home() {
  return (
    <>
      <div>
        <HeroSection />
      </div>
      <div className="py-16">
        <AboutSection />
      </div>
      <Footer />
    </>
  );
}
