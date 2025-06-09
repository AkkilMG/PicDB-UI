"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { SquareArrowOutUpRight, Star } from "lucide-react"
import { motion } from "framer-motion"

/**
    // const testimonialsData = [
    //     {
    //         id: "1",
    //         name: "Caroneal Mafe",
    //         company: "XZS CONSULTING",
    //         role: "CEO",
    //         rating: 4.8,
    //         message: "In this demonstration, Pearl engages a customer and successfully upsells by following her script.",
    //         avatar: "/placeholder.svg?height=60&width=60",
    //         position: { x: 15, y: 25 },
    //     },
    //     {
    //         id: "2",
    //         name: "Sarah Johnson",
    //         company: "TechFlow Inc",
    //         role: "CTO",
    //         rating: 5.0,
    //         message: "PicDB has revolutionized how we manage our digital assets. The storage efficiency is incredible!",
    //         avatar: "/placeholder.svg?height=60&width=60",
    //         position: { x: 25, y: 45 },
    //     },
    //     {
    //         id: "3",
    //         name: "Michael Chen",
    //         company: "Creative Studios",
    //         role: "Art Director",
    //         rating: 4.9,
    //         message: "Amazing platform for storing and organizing our creative work. Highly recommended!",
    //         avatar: "/placeholder.svg?height=60&width=60",
    //         position: { x: 75, y: 30 },
    //     },
    //     {
    //         id: "4",
    //         name: "Emily Rodriguez",
    //         company: "Digital Marketing Pro",
    //         role: "Marketing Manager",
    //         rating: 4.7,
    //         message: "The cost savings compared to other cloud storage solutions is remarkable. Great service!",
    //         avatar: "/placeholder.svg?height=60&width=60",
    //         position: { x: 85, y: 60 },
    //     },
    //     {
    //         id: "5",
    //         name: "David Kim",
    //         company: "StartupLab",
    //         role: "Founder",
    //         rating: 4.8,
    //         message: "Perfect solution for startups looking to optimize their image storage costs.",
    //         avatar: "/placeholder.svg?height=60&width=60",
    //         position: { x: 10, y: 70 },
    //     },
    //     {
    //         id: "6",
    //         name: "Lisa Thompson",
    //         company: "E-commerce Plus",
    //         role: "Product Manager",
    //         rating: 4.9,
    //         message: "Seamless integration and excellent performance. Our team loves using PicDB!",
    //         avatar: "/placeholder.svg?height=60&width=60",
    //         position: { x: 60, y: 20 },
    //     },
    //     {
    //         id: "7",
    //         name: "Alex Morgan",
    //         company: "Design Agency",
    //         role: "Creative Director",
    //         rating: 5.0,
    //         message: "The best image storage platform we've used. Fast, reliable, and cost-effective.",
    //         avatar: "/placeholder.svg?height=60&width=60",
    //         position: { x: 40, y: 75 },
    //     },
    //     {
    //         id: "8",
    //         name: "Rachel Green",
    //         company: "Media Corp",
    //         role: "Content Manager",
    //         rating: 4.6,
    //         message: "Great for managing large volumes of media files. The savings are substantial!",
    //         avatar: "/placeholder.svg?height=60&width=60",
    //         position: { x: 80, y: 45 },
    //     },
    // ]
 * 
 * 
  {/* <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-center">
      <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
        A digital business
        <br />
        digital technologies
      </h3>
    </div>
  </div> 
  {testimonialsData.map((testimonial) => (
    <div
      key={testimonial.id}
      className="absolute cursor-pointer transform transition-all duration-300 hover:scale-110"
      style={{
        left: `${testimonial.position.x}%`,
        top: `${testimonial.position.y}%`,
      }}
      onMouseEnter={() => setHoveredTestimonial(testimonial)}
      onMouseLeave={() => setHoveredTestimonial(null)}
      onClick={() => setSelectedTestimonial(selectedTestimonial?.id === testimonial.id ? null : testimonial)}
    >
      <div className="relative">
        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <Image
            src={testimonial.avatar || "/placeholder.svg"}
            alt={testimonial.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
        {hoveredTestimonial?.id === testimonial.id && !selectedTestimonial && (
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 min-w-max z-20">
            <div className="text-center">
              <StarRating rating={testimonial.rating} size="sm" />
              <p className="text-sm font-medium text-gray-900 mt-1">{testimonial.name}</p>
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
          </div>
        )}
      </div>
    </div>
  ))}

  {displayedTestimonial && (
    <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-30">
      <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-6 text-white shadow-2xl max-w-sm animate-in slide-in-from-right duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
            <Image
              src={displayedTestimonial.avatar || "/placeholder.svg"}
              alt={displayedTestimonial.name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-bold text-lg">{displayedTestimonial.name}</h4>
            <p className="text-sm opacity-90">
              {displayedTestimonial.role} • {displayedTestimonial.company}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <StarRating rating={displayedTestimonial.rating} size="md" />
          </div>
          <p className="text-sm leading-relaxed opacity-95">{displayedTestimonial.message}</p>
        </div>
      </div>
    </div>
  )}
 */


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
