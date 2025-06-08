"use client";

import AboutSection from "@/components/home/about";
import HeroSection from "@/components/home/hero";
import { SavingsCalculator } from "@/components/home/saving";
import { TestimonialsSection } from "@/components/home/testimonials";
import Footer from "@/components/main/footer";
import Header from "@/components/main/header";
import { Toaster } from "@/components/ui/toaster";
import { enHome, esHome, hiHome, ruHome } from "@/config/text/home.text";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(enHome);
  useEffect(() => {
    const checkLanguage = () => {
      const lang = localStorage.getItem("lang");
      if (lang === "es") {
        setData(esHome);
      } else if (lang === "ru") {
        setData(ruHome);
      } else if (lang === "hi") {
        setData(hiHome);
      } else {
        setData(enHome);
      }
    };

    checkLanguage();
    const intervalId = setInterval(checkLanguage, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>      
    <Header />
    <div>
      <HeroSection />
    </div>
    <AboutSection />
    <SavingsCalculator text={data} />
    <TestimonialsSection text={data} />
    <Footer />
    
    <Toaster />
    </>
  );
}
