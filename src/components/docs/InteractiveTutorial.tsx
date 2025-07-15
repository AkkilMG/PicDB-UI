"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, CheckCircle, Circle, Lightbulb, ArrowRight, MapPin, Navigation } from "lucide-react"

interface StepContent {
  stepNumber: number
  title: string
  description: string
  image: string
  tips: string[]
}

// interface ContentItem {
//   type: "step"
//   content: StepContent
// }

interface InteractiveTutorialProps {
  content: any[]
  title: string
}

export default function InteractiveTutorial({ content, title }: InteractiveTutorialProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [isAutoScrolling, setIsAutoScrolling] = useState(false)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const roadRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (isAutoScrolling) return

      const scrollPosition = window.scrollY + window.innerHeight / 2

      stepRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          const elementBottom = elementTop + rect.height

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            if (activeStep !== index) {
              setActiveStep(index)
              if (!completedSteps.includes(index)) {
                setCompletedSteps((prev) => [...prev, index])
              }
            }
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeStep, completedSteps, isAutoScrolling])

  const scrollToStep = (stepIndex: number) => {
    setIsAutoScrolling(true)
    const element = stepRefs.current[stepIndex]
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
      setTimeout(() => setIsAutoScrolling(false), 1000)
    }
  }

  const nextStep = () => {
    if (activeStep < content.length - 1) {
      scrollToStep(activeStep + 1)
    }
  }

  const prevStep = () => {
    if (activeStep > 0) {
      scrollToStep(activeStep - 1)
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Road Background */}
      <div
        ref={roadRef}
        className="fixed left-8 top-0 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 opacity-30 z-10"
        style={{
          background: `linear-gradient(to bottom, 
            #3b82f6 0%, 
            #8b5cf6 ${(activeStep / (content.length - 1)) * 100}%, 
            #06b6d4 100%)`,
        }}
      >
        {/* Road markers */}
        {content.map((_, index) => (
          <div
            key={index}
            className={`absolute w-6 h-6 -left-2.5 rounded-full border-4 border-white shadow-lg transition-all duration-500 cursor-pointer hover:scale-125 ${
              completedSteps.includes(index)
                ? "bg-green-500"
                : index === activeStep
                  ? "bg-blue-500 animate-pulse"
                  : "bg-gray-300"
            }`}
            style={{ top: `${(index / (content.length - 1)) * 100}%` }}
            onClick={() => scrollToStep(index)}
          >
            {completedSteps.includes(index) ? (
              <CheckCircle className="w-4 h-4 text-white absolute -top-1 -left-1" />
            ) : (
              <Circle className="w-4 h-4 text-white absolute -top-1 -left-1" />
            )}
          </div>
        ))}

        {/* Moving indicator */}
        <div
          className="absolute w-4 h-4 -left-1.5 bg-yellow-400 rounded-full shadow-lg animate-bounce transition-all duration-1000"
          style={{
            top: `${(activeStep / (content.length - 1)) * 100}%`,
            transform: "translateY(-50%)",
          }}
        >
          <Navigation className="w-3 h-3 text-yellow-800 absolute top-0.5 left-0.5" />
        </div>
      </div>

      {/* Progress Header */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
              <p className="text-gray-600">
                Step {activeStep + 1} of {content.length}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1">
                {content.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index <= activeStep ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <Badge variant="secondary">{Math.round(((activeStep + 1) / content.length) * 100)}% Complete</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Tutorial Steps */}
      <div className="container mx-auto px-4 py-8 ml-16">
        {content.map((item, index) => (
          <div
            key={index}
            ref={(el: any) => (stepRefs.current[index] = el)}
            className={`mb-32 transition-all duration-1000 ${
              index === activeStep
                ? "opacity-100 transform translate-x-0"
                : index < activeStep
                  ? "opacity-60 transform -translate-x-4"
                  : "opacity-40 transform translate-x-4"
            }`}
          >
            <Card
              className={`overflow-hidden shadow-2xl border-0 transition-all duration-500 ${
                index === activeStep ? "scale-105 shadow-blue-200/50" : "scale-100"
              }`}
            >
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Content Side */}
                  <div className="p-8 lg:p-12 bg-gradient-to-br from-white to-blue-50">
                    <div className="flex items-center space-x-4 mb-6">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl transition-all duration-500 ${
                          completedSteps.includes(index)
                            ? "bg-green-500 animate-pulse"
                            : index === activeStep
                              ? "bg-blue-500 animate-bounce"
                              : "bg-gray-400"
                        }`}
                      >
                        {item.content.stepNumber}
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">{item.content.title}</h2>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <span className="text-blue-600 font-medium">Step {item.content.stepNumber}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 text-lg leading-relaxed mb-8">{item.content.description}</p>

                    {/* Tips Section */}
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg mb-8">
                      <div className="flex items-center space-x-2 mb-4">
                        <Lightbulb className="w-5 h-5 text-yellow-600" />
                        <h3 className="font-semibold text-yellow-800">Pro Tips</h3>
                      </div>
                      <ul className="space-y-2">
                        {item.content.tips.map((tip: any, tipIndex: any) => (
                          <li key={tipIndex} className="flex items-start space-x-2 text-yellow-700">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center">
                      <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={activeStep === 0}
                        className="hover:scale-105 transition-transform bg-transparent"
                      >
                        <ChevronUp className="w-4 h-4 mr-2" />
                        Previous Step
                      </Button>

                      {activeStep < content.length - 1 ? (
                        <Button
                          onClick={nextStep}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:scale-105 transition-all"
                        >
                          Next Step
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 hover:scale-105 transition-all">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Complete Tutorial
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Image Side */}
                  <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8">
                    <div
                      className={`relative transition-all duration-1000 ${
                        index === activeStep ? "scale-100 opacity-100" : "scale-95 opacity-70"
                      }`}
                    >
                      <img
                        src={item.content.image || "/placeholder.svg"}
                        alt={`Step ${item.content.stepNumber}: ${item.content.title}`}
                        className="rounded-lg shadow-2xl max-w-full h-auto hover:scale-105 transition-transform duration-500"
                      />

                      {/* Floating Step Indicator */}
                      <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg animate-pulse">
                        {item.content.stepNumber}
                      </div>

                      {/* Completion Checkmark */}
                      {completedSteps.includes(index) && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Floating Navigation */}
      <div className="fixed bottom-8 right-8 z-20">
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevStep}
                disabled={activeStep === 0}
                className="hover:scale-105 transition-transform"
              >
                <ChevronUp className="w-4 h-4" />
              </Button>
              <div className="text-center text-sm font-medium text-gray-600">
                {activeStep + 1}/{content.length}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextStep}
                disabled={activeStep === content.length - 1}
                className="hover:scale-105 transition-transform"
              >
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
