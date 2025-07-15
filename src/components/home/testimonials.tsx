"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { SquareArrowOutUpRight, Star } from "lucide-react"
import { motion } from "framer-motion"

export function TestimonialsSection({text, testimonialsData}: {text: any, testimonialsData: any}) {
    
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      const slider = sliderRef.current;
      if (!slider) return;

      const interval = setInterval(() => {
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
          slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
          slider.scrollBy({ left: 320, behavior: "smooth" });
      }
      }, 4000);

      return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      slider.classList.add("dragging");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown = false;
      slider.classList.remove("dragging");
    };

    const onMouseUp = () => {
      isDown = false;
      slider.classList.remove("dragging");
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5; // scroll speed
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", onMouseDown);
    slider.addEventListener("mouseleave", onMouseLeave);
    slider.addEventListener("mouseup", onMouseUp);
    slider.addEventListener("mousemove", onMouseMove);

    return () => {
      slider.removeEventListener("mousedown", onMouseDown);
      slider.removeEventListener("mouseleave", onMouseLeave);
      slider.removeEventListener("mouseup", onMouseUp);
      slider.removeEventListener("mousemove", onMouseMove);
    };
  }, []);


  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-400 to-pink-400 rounded-full opacity-20 translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-30" />

      <div className="relative z-10 container mx-auto px-4 pt-20">
        {/* Header */}
        <div className="text-center mb-20 px-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {text.testimonials.title[0]}
          </h2>
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            {text.testimonials.title[1]}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              {text.testimonials.title[2]}
            </span>{" "}
            👋
          </p>
        </div>

        {/* Testimonials Interactive Area */}
        <div className="relative mb-20">
          <div className="max-w-7xl mx-auto px-4 pt-10 pb-10" style={{ paddingTop: "3rem" }}>
              <div ref={sliderRef} className="py-7 flex gap-6 overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing scroll-smooth select-none scrollbar-hide">
                {testimonialsData.map((testimonial: any) => (
                <div key={testimonial.id} className="min-w-[300px] max-w-xs flex-shrink-0">
                  <TestimonialCard testimonial={testimonial} />
                </div>
                ))}
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}



export function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:-rotate-3 transition-all duration-300 ease-out cursor-pointer group">
      <div className="flex items-center justify-between mb-4">
        <div className="h-8 flex items-center">
          <span className={`text-lg font-medium ${testimonial.logoColor}`}>{testimonial.logo}</span>
        </div>
        <StarRating rating={testimonial.rating} />
      </div>

      <blockquote className="text-gray-700 text-sm leading-relaxed mb-6 group-hover:text-gray-800 transition-colors duration-200">
        "{testimonial.quote}"
      </blockquote>

      <div className="border-t pt-4">
        <div className="font-semibold text-gray-900 text-base group-hover:text-gray-800 transition-colors duration-200">
          {testimonial.name}
        </div>
        {testimonial.username && <a href={`https://instagram.com/${testimonial.username}`} className="text-gray-500 text-sm group-hover:text-gray-600 transition-colors duration-200">
          {testimonial.username}
        </a>}
      </div>
    </div>
  )
}


function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-lg font-semibold text-gray-900">{rating}</span>
      <Star className="w-4 h-4 fill-green-500 text-green-500" />
    </div>
  )
}
