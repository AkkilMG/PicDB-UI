"use client"

import type React from "react"
import { Upload, ImageIcon, Cloud, Sparkles, Camera, Folder, Zap } from "lucide-react"

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl rotate-12 animate-float opacity-30"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full animate-float-delayed opacity-20"></div>
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-gradient-to-br from-gray-150 to-gray-250 rounded-lg rotate-45 animate-float-slow opacity-25"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl -rotate-12 animate-float-delayed opacity-30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:40px_40px] opacity-30"></div>
      </div>

      <div className={`max-w-5xl mx-auto text-center space-y-12 relative z-10 transition-all duration-1000`}>
        <div className="relative hidden sm:block">
          <div className="w-32 h-32 mx-auto mb-8 relative">
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center shadow-lg animate-pulse-slow">
              <div className="relative">
                <Cloud className="w-16 h-16 text-gray-600 animate-bounce-gentle" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md animate-spin-slow">
                  <Upload className="w-3 h-3 text-gray-700" />
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center animate-float">
              <ImageIcon className="w-4 h-4 text-gray-600" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center animate-float-delayed">
              <Camera className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="overflow-hidden">
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 tracking-tight animate-slide-up">
              <span className="inline-block animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                C0M!NG
              </span>{" "}
              <span className="inline-block animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                S00N
              </span>
            </h1>
          </div>
          <div className="flex justify-center animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full"></div>
          </div>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "1.2s" }}>
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 max-w-3xl mx-auto border border-gray-200 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center animate-pulse-gentle">
                  <Zap className="w-8 h-8 text-gray-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center animate-bounce-gentle">
                  <Sparkles className="w-3 h-3 text-yellow-600" />
                </div>
              </div>
            </div>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-4">
              {'"We\'re cooking up the perfect image storage solution..."'}
            </p>
            <p className="text-lg text-gray-600 italic">
              {"(Yeah, we tried to add a feature and wrote a bug instead. Classic! 🐛)"}
            </p>
            <div className="mt-6 flex justify-center">
              <div className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
                {"— The Dev Team, probably at 3 AM"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
