"use client";

import type { Metadata } from "next";
import AboutSection from "@/components/home/about";
import HeroSection from "@/components/home/hero";
import { SavingsCalculator } from "@/components/home/saving";
import { TestimonialsSection } from "@/components/home/testimonials";
import Footer from "@/components/main/footer";
import Header from "@/components/main/header";
import ChatBot from "@/components/pop/chatbot";
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


    const testimonialsData = [
        {
          id: 1,
          logo: "",
          logoColor: "text-blue-600",
          rating: 4.9,
          quote: "PicDB is incredibly easy to use and has streamlined our workflow. Uploading and managing images is now effortless for our whole team.",
          name: "Rahul Sharma",
          username: "",
          location: "Delhi, India",
          company: "Delhi Digital Services",
        },
        {
          id: 2,
          logo: "",
          logoColor: "text-green-600",
          rating: 4.8,
          quote: "The free plan is generous and lets us get started without worrying about costs. It’s perfect for startups and small businesses.",
          name: "Arjun Rao",
          username: "",
          location: "Bengaluru, India",
          company: "StartupLab",
        },
        {
          id: 3,
          logo: "",
          logoColor: "text-purple-700",
          rating: 4.9,
          quote: "Support is always quick to respond and genuinely helpful. Any questions we had were resolved in no time, which is rare these days.",
          name: "Naveen Shetty",
          username: "",
          location: "Mangaluru, India",
          company: "Creative Studios",
        },
        {
          id: 4,
          logo: "",
          logoColor: "text-pink-600",
          rating: 5.0,
          quote: "It’s great to see a product made in India that matches global standards. We’re proud to use PicDB for our projects.",
          name: "Rakesh Pai",
          username: "",
          location: "Mangaluru, India",
          company: "Design Agency",
        },
        {
          id: 5,
          logo: "",
          logoColor: "text-yellow-600",
          rating: 4.7,
          quote: "PicDB is reliable and simple, but also powerful enough for our growing needs. Our team collaboration has improved a lot.",
          name: "Dilan Perera",
          username: "",
          location: "Colombo, Sri Lanka",
          company: "SL Media Solutions",
        },
      ]
  

  return (
    <>  
      <ChatBot />   
      <Header />
      <div>
        <HeroSection testimonialsData={testimonialsData} />
      </div>
      <AboutSection />
      <SavingsCalculator text={data} />
      <TestimonialsSection text={data} testimonialsData={testimonialsData} />
      <Footer />
    </>
  );
}
