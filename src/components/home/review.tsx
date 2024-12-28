"use client";

import React, { useState } from 'react';

interface Review {
  name: string;
  title: string;
  image: string;
  reviewText?: string;
  rating?: number;
  isAvailable: boolean;
  price: string;
  location: string;
  jobType?: string;
}

const ReviewSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const reviews = [
        {
        name:"Rebecca",
        title:"UI/UX Designer",
        isAvailable:true,
          image:"https://placehold.co/500x500",
          price:"$35/hr",
          location:"Yogyakarta",
          jobType:"UI/UX Designer"
  
        },
          {
              name:"Sarah M.",
              title:"Mobile App Designer",
              image:"https://placehold.co/500x500",
              reviewText:`"Working with Sarah was a game-changer for our app development process. I highly recommend Sarah to anyone looking for a top-tier UI/UX designer!"`,
             rating:4,
               jobType:"Founder of BrightApp"
           ,
          },
          {
              name:"Marcopolo",
             title:"UX Research & Strategy",
             isAvailable:true,
                image:"https://placehold.co/500x500",
               price:"$40/hr",
               location:"Solo",
              jobType:"UX Research & Strategy"
          }
      ]
  
    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : reviews.length - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex < reviews.length - 1 ? prevIndex + 1 : 0
        );
    };

    const generateStars = (rating?: number) => {
        if (!rating) return null;
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <svg
                    key={i}
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M5.5 0L6.7928 4.00981L10.9999 4.08842L7.74415 6.77563L8.96766 10.9207L5.5 8.75359L2.03234 10.9207L3.25585 6.77563L0.000107432 4.08842L4.2072 4.00981L5.5 0Z"
                        fill={i < rating ? "#FFC846" : "#474747"}
                    />
                </svg>
            );
        }
        return stars;
    };

    return (
        <div className="relative overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center mb-7 px-1">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 leading-9">
                        Top-Rated Designers{" "}
                        <span className="relative">
                            <svg
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute left-0 bottom-[-5px]"
                            >
                                <circle cx="12.5" cy="12" r="12" fill="#9452EF" />
                            </svg>
                            for
                        </span>
                        <br />
                        Your Next Project
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Handpicked Experts Ready to Bring Your Vision to Life.
                    </p>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={handlePrev}
                        className="bg-gray-100 rounded-full p-1.5 hover:bg-gray-200"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12.5 15L7.5 10L12.5 5"
                                stroke="#474747"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={handleNext}
                        className="bg-gray-100 rounded-full p-1.5 hover:bg-gray-200"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.5 15L12.5 10L7.5 5"
                                stroke="#474747"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
             {/* Slider Container */}
            <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {reviews.map((review, index) => (
                     <div key={index} className="w-full flex-shrink-0 px-2.5">
                         <div className="bg-white rounded-2xl overflow-hidden shadow-md relative">
                            {/* Verified Icon */}
                            <div className="absolute top-4 left-4 z-10">
                                <div className="bg-white rounded-full p-1">
                                     <svg
                                         width="14"
                                         height="14"
                                         viewBox="0 0 14 14"
                                         fill="none"
                                         xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle cx="7" cy="7" r="7" fill="#77C9F7" />
                                        <path
                                            d="M9.89355 4.53613L6.03222 8.39746L4.10645 6.4717"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            {/* Profile Image */}
                           <div className="relative w-full h-[250px]  rounded-t-2xl overflow-hidden">
                              <img
                                  src={review.image}
                                  alt={review.name}
                                  className="w-full h-full object-cover"
                              />
                           </div>
                           {/* Review content */}
                           {review.reviewText ? (
                                 <div className="absolute bottom-0 w-full left-0 bg-black bg-opacity-80 px-5 pb-4 pt-3 rounded-t-2xl">
                                     <div className='flex mb-1.5'>
                                         {generateStars(review.rating)}
                                      </div>
                                    <p className="text-white text-sm leading-relaxed">
                                        {review.reviewText}
                                    </p>
                                    <p className="text-gray-200 text-sm font-medium mt-1.5">
                                        {review.name}
                                       <span className="font-normal text-xs block text-gray-400">
                                            {review.jobType}
                                       </span>
                                    </p>
                                </div>
                            ) : (
                                <div className="px-4 pt-4 pb-3">
                                      <div className="flex justify-between items-center mb-2">
                                          <div>
                                               <p className="text-gray-800 font-medium text-sm">
                                                   {review.title}
                                               </p>
                                               <p className="text-gray-600 text-xs">{review.jobType}</p>
                                           </div>
                                        {review.isAvailable ? (
                                                <div className="flex items-center">
                                                  <span className="rounded-full bg-green-500 w-2 h-2 inline-block mr-1"></span>
                                                    <p className="text-gray-700 text-xs">Available</p>
                                                </div>
                                            ) : null}
                                     </div>
                                     <p className="text-gray-900 text-xl font-medium mb-2 leading-6">{review.name}</p>
                                     <div className='flex justify-between items-center'>
                                          <p className='text-gray-600 text-sm'>
                                             {review.price}
                                               <span className='font-normal text-xs block'>{review.location}</span>
                                         </p>
                                      </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewSlider;