"use client"

import React from "react"

import { useState, useRef, useCallback } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  onRatingChange: (rating: number) => void
}

export function StarRating({ rating, onRatingChange }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const calculateRating = useCallback((clientX: number): number => {
    if (!containerRef.current) return 0

    const { left, width } = containerRef.current.getBoundingClientRect()
    const position = Math.max(0, Math.min(width, clientX - left))
    const percentage = position / width

    // Calculate stars (0-5) with 0.25 increments
    let stars = percentage * 5
    stars = Math.round(stars * 4) / 4 // Round to nearest 0.25

    return Math.max(0, Math.min(5, stars))
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent | MouseEvent) => {
      const newRating = calculateRating(e.clientX)
      setHoverRating(newRating)

      if (isDragging) {
        onRatingChange(newRating)
      }
    },
    [calculateRating, isDragging, onRatingChange],
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setIsDragging(true)
      const newRating = calculateRating(e.clientX)
      setHoverRating(newRating)
      onRatingChange(newRating)
    },
    [calculateRating, onRatingChange],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!isDragging) {
      setHoverRating(null)
    }
  }, [isDragging])

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const newRating = calculateRating(e.clientX)
      onRatingChange(newRating)
    },
    [calculateRating, onRatingChange],
  )

  // Global mouse events for dragging
  React.useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e)
      const handleGlobalMouseUp = () => handleMouseUp()

      document.addEventListener("mousemove", handleGlobalMouseMove)
      document.addEventListener("mouseup", handleGlobalMouseUp)

      return () => {
        document.removeEventListener("mousemove", handleGlobalMouseMove)
        document.removeEventListener("mouseup", handleGlobalMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const displayRating = hoverRating !== null ? hoverRating : rating

  const renderStars = () => {
    const stars = []

    for (let i = 1; i <= 5; i++) {
      const starFill = Math.max(0, Math.min(1, displayRating - (i - 1)))
      const isHovered = hoverRating !== null && i <= Math.ceil(hoverRating)

      stars.push(
        <div
          key={i}
          className={`relative w-12 h-12 transition-all duration-200 ${isHovered ? "scale-110" : "scale-100"}`}
        >
          {/* Background star */}
          <Star className="w-12 h-12 text-gray-200 absolute transition-colors duration-200" />

          {/* Filled portion */}
          <div
            className="absolute overflow-hidden transition-all duration-300 ease-out"
            style={{ width: `${starFill * 100}%` }}
          >
            <Star
              className={`w-12 h-12 transition-all duration-300 ${
                starFill > 0 ? "text-yellow-400 fill-yellow-400 drop-shadow-sm" : "text-gray-200"
              }`}
            />
          </div>

          {/* Glow effect for filled stars */}
          {starFill > 0 && (
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                opacity: starFill * 0.3,
                background: "radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%)",
                borderRadius: "50%",
              }}
            />
          )}
        </div>,
      )
    }

    return stars
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <div
        ref={containerRef}
        className="flex items-center space-x-1 cursor-pointer select-none p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {renderStars()}
      </div>

      <div className="text-center space-y-2">
        <div className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
          {displayRating.toFixed(2)}
        </div>
        <div className="text-sm text-gray-500 font-medium">out of 5 stars</div>
      </div>
    </div>
  )
}


export function HeroStarRating({ rating }: { rating: number }) {
  const displayRating = rating

  const renderStars = () => {
    const stars = []

    for (let i = 1; i <= 5; i++) {
      const starFill = Math.max(0, Math.min(1, displayRating - (i - 1)))

      stars.push(
        <div key={i} className="relative w-6 h-6 transition-all duration-200 scale-100">
          <Star className="w-6 h-6 text-gray-200 absolute transition-colors duration-200" />
          <div className="absolute overflow-hidden transition-all duration-300 ease-out" style={{ width: `${starFill * 100}%` }}>
            <Star className={`w-6 h-6 transition-all duration-300 ${ starFill > 0 ? "text-yellow-400 fill-yellow-400 drop-shadow-sm" : "text-gray-200" }`} />
          </div>
        </div>,
      )
    }
    return stars
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="flex items-center space-x-1 select-none rounded-2xl bg-white/50 backdrop-blur-sm border border-white/30 transition-all duration-300">
        {renderStars()} <span className="text-black text-medium">({displayRating.toFixed(2)}/5)</span>
      </div>

    </div>
  )
}
