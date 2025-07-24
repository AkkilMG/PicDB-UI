import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Book, Upload, Download, Users, Navigation, HelpCircle, Sparkles, Zap } from "lucide-react"

const docsSections = [
  {
    id: "how-to-upload",
    title: "How to Upload",
    description: "Step-by-step guide to uploading images",
    icon: <Upload className="w-6 h-6" />,
    href: "/docs/how-to-upload",
    color: "from-purple-500 to-violet-500",
  },
  {
    id: "how-to-download",
    title: "How to Download",
    description: "Learn how to download images from PicDB",
    icon: <Download className="w-6 h-6" />,
    href: "/docs/how-to-download",
    color: "from-orange-500 to-red-500",
  },
  {
    id: "navigation-guide",
    title: "Navigation Guide",
    description: "Navigate through PicDB like a pro",
    icon: <Navigation className="w-6 h-6" />,
    href: "/docs/navigation-guide",
    color: "from-teal-500 to-cyan-500",
  },
  {
    id: "group-rooms",
    title: "Group Room Features",
    description: "Collaborate with others using group rooms",
    icon: <Users className="w-6 h-6" />,
    href: "/docs/group-rooms",
    color: "from-pink-500 to-rose-500",
  },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header with enhanced animations */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-blue-500 animate-spin-slow absolute -top-2 -left-2" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                PicDB Documentation
              </h1>
              <Zap className="w-6 h-6 text-purple-500 animate-bounce absolute -bottom-1 -right-2" />
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about using PicDB effectively. Find guides, tutorials, and answers to common
            questions.
          </p>
        </div>

        {/* Enhanced Quick Start Section */}
        <div className="mb-16 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 via-purple-600/50 to-indigo-600/50 animate-pulse"></div>
            <CardHeader className="relative z-10">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                  <Zap className="w-6 h-6" />
                </div>
                <CardTitle className="text-3xl font-bold">Quick Start</CardTitle>
              </div>
              <CardDescription className="text-blue-100 text-lg">
                New to PicDB? Start here to get up and running quickly.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="secondary"
                  asChild
                  className="bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <Link href="/docs/how-to-upload">
                    Get Started <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <Link href="/docs/what-is-picdb">What is PicDB?</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Documentation Sections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {docsSections.map((section, index) => (
            <div
              key={section.id}
              className="animate-in fade-in slide-in-from-bottom-8 duration-1000"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <Card className="hover:shadow-2xl transition-all duration-500 group hover:scale-[1.05] hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg relative overflow-hidden">
                {/* Animated gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                <CardHeader className="relative z-10">
                  <div className="flex items-center space-x-4 mb-3">
                    <div
                      className={`p-3 bg-gradient-to-br ${section.color} rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <div className="text-white">{section.icon}</div>
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                        {section.title}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600 leading-relaxed">{section.description}</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <Button
                    variant="ghost"
                    className="w-full justify-between group-hover:bg-gradient-to-r group-hover:from-blue-50 group-hover:to-purple-50 transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <Link href={section.href}>
                      <span className="font-medium">Read More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Enhanced Help Section */}
        <div className="mt-20 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
          <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl border-0 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full">
                  <HelpCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">Still Need Help?</CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Can't find what you're looking for? Our support team is here to help.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-105 shadow-md bg-transparent"
                >
                  Contact Support
                </Button>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 shadow-lg">
                  Join Community
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Floating Action Elements */}
        <div className="fixed bottom-8 left-8 animate-bounce">
          <div className="w-4 h-4 bg-blue-500 rounded-full opacity-60"></div>
        </div>
        <div className="fixed top-20 right-20 animate-pulse">
          <div className="w-3 h-3 bg-purple-500 rounded-full opacity-40"></div>
        </div>
      </div>
    </div>
  )
}
