import AboutSection from "@/components/home/about";
import HeroSection from "@/components/home/hero";
import ReviewSlider from "@/components/home/review";
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
      {/* <div>
        <ReviewSlider />
      </div> */}
      <Footer />
    </>
  );
}
