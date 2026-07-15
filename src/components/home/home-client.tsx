"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/home/hero";
import Header from "@/components/main/header";
import { useLanguage } from "@/contexts/language-context";
import { enHome, esHome, hiHome, ruHome } from "@/config/text/home.text";

const AboutSection = dynamic(() => import("@/components/home/about"), {
  loading: () => <div className="min-h-screen bg-gray-50" />,
});
const SavingsCalculator = dynamic(
  () => import("@/components/home/saving").then((m) => ({ default: m.SavingsCalculator })),
  { loading: () => <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" /> }
);
const TestimonialsSection = dynamic(
  () => import("@/components/home/testimonials").then((m) => ({ default: m.TestimonialsSection })),
  { loading: () => <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100" /> }
);
const Footer = dynamic(() => import("@/components/main/footer"), {
  loading: () => <div className="h-64 bg-black" />,
});
const ChatBot = dynamic(() => import("@/components/pop/chatbot"), { ssr: false });

const testimonialsData = [
  {
    id: 1,
    logo: "",
    logoColor: "text-blue-600",
    rating: 4.9,
    quote: "PikDB is incredibly easy to use and has streamlined our workflow. Uploading and managing images is now effortless for our whole team.",
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
    quote: "The free plan is generous and lets us get started without worrying about costs. It's perfect for startups and small businesses.",
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
    quote: "It's great to see a product made in India that matches global standards. We're proud to use PikDB for our projects.",
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
    quote: "PikDB is reliable and simple, but also powerful enough for our growing needs. Our team collaboration has improved a lot.",
    name: "Dilan Perera",
    username: "",
    location: "Colombo, Sri Lanka",
    company: "SL Media Solutions",
  },
];

const langTextMap = { en: enHome, es: esHome, ru: ruHome, hi: hiHome };

export default function HomeClient() {
  const { lang } = useLanguage();
  const data = langTextMap[lang] ?? enHome;

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
