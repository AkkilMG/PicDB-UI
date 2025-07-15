import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ExternalLink, BookOpen, Sparkles, ChevronRight } from "lucide-react"
import InteractiveTutorial from "@/components/docs/InteractiveTutorial" // Declare the InteractiveTutorial component

interface ContentItem {
  type: "text" | "button" | "image" | "heading" | "list" | "code" | "step"
  content: any
}

interface DocData {
  title: string
  description: string
  isInteractive?: boolean
  content: ContentItem[]
}

const docsData: Record<string, DocData> = {
  "how-to-upload": {
    title: "How to Upload Images",
    description: "Step-by-step interactive guide to uploading images to PicDB",
    isInteractive: true,
    content: [
      {
        type: "step",
        content: {
          stepNumber: 1,
          title: "Access the Upload Area",
          description:
            "Navigate to your dashboard and locate the upload section. You'll see a prominent upload button in the navigation bar.",
          image: "/placeholder.svg?height=400&width=600",
          tips: [
            "Look for the cloud upload icon",
            "The upload area is highlighted in blue",
            "You can also use the keyboard shortcut Ctrl+U",
          ],
        },
      },
      {
        type: "step",
        content: {
          stepNumber: 2,
          title: "Choose Your Upload Method",
          description:
            "PicDB offers two convenient ways to upload your images. Choose the method that works best for you.",
          image: "/placeholder.svg?height=400&width=600",
          tips: [
            "Drag & drop is faster for multiple files",
            "File browser gives you more control",
            "Both methods support batch uploads",
          ],
        },
      },
      {
        type: "step",
        content: {
          stepNumber: 3,
          title: "Drag and Drop Method",
          description:
            "Simply drag your image files from your computer and drop them into the designated upload area. Watch as they're automatically processed.",
          image: "/placeholder.svg?height=400&width=600",
          tips: [
            "Supported formats: JPEG, PNG, GIF, WebP, TIFF, BMP",
            "Maximum file size: 50MB per image",
            "You can drop multiple files at once",
          ],
        },
      },
      {
        type: "step",
        content: {
          stepNumber: 4,
          title: "File Browser Method",
          description:
            "Click the 'Choose Files' button to open your system's file browser. Select one or multiple images and click 'Open'.",
          image: "/placeholder.svg?height=400&width=600",
          tips: [
            "Hold Ctrl/Cmd to select multiple files",
            "Use Shift to select a range of files",
            "Preview thumbnails before uploading",
          ],
        },
      },
      {
        type: "step",
        content: {
          stepNumber: 5,
          title: "Monitor Upload Progress",
          description:
            "Watch the real-time progress bar as your images are uploaded. You can continue using PicDB while uploads happen in the background.",
          image: "/placeholder.svg?height=400&width=600",
          tips: [
            "Green checkmarks indicate successful uploads",
            "Red indicators show failed uploads",
            "You can retry failed uploads instantly",
          ],
        },
      },
      {
        type: "step",
        content: {
          stepNumber: 6,
          title: "Organize Your Images",
          description:
            "Once uploaded, add tags, descriptions, and organize your images into collections for easy retrieval later.",
          image: "/placeholder.svg?height=400&width=600",
          tips: [
            "Use descriptive tags for better searchability",
            "Create collections for different projects",
            "Add alt text for accessibility",
          ],
        },
      },
    ],
  },
  "how-to-download": {
    title: "How to Download Images",
    description: "Interactive guide to downloading images from PicDB",
    isInteractive: true,
    content: [
      {
        type: "step",
        content: {
          stepNumber: 1,
          title: "Find Your Image",
          description: "Use the search bar or browse through your gallery to locate the image you want to download.",
          image: "/placeholder.svg?height=400&width=600",
          tips: ["Use filters to narrow down results", "Sort by date, name, or size", "Use the grid or list view"],
        },
      },
      {
        type: "step",
        content: {
          stepNumber: 2,
          title: "Select Download Option",
          description:
            "Click on the image to open the detail view, then click the download button to see available options.",
          image: "/placeholder.svg?height=400&width=600",
          tips: [
            "Original quality preserves all details",
            "Web-optimized reduces file size",
            "Custom resolution for specific needs",
          ],
        },
      },
      {
        type: "step",
        content: {
          stepNumber: 3,
          title: "Choose Format and Quality",
          description:
            "Select your preferred format (JPEG, PNG, WebP) and quality settings based on your intended use.",
          image: "/placeholder.svg?height=400&width=600",
          tips: [
            "JPEG for photos with small file size",
            "PNG for images with transparency",
            "WebP for modern web usage",
          ],
        },
      },
      {
        type: "step",
        content: {
          stepNumber: 4,
          title: "Bulk Download (Optional)",
          description:
            "For multiple images, use checkboxes to select them, then click 'Download Selected' for a ZIP file.",
          image: "/placeholder.svg?height=400&width=600",
          tips: [
            "Select all with the header checkbox",
            "ZIP files preserve folder structure",
            "Large batches may take time to prepare",
          ],
        },
      },
    ],
  },
  "what-is-picdb": {
    title: "What is PicDB?",
    description: "Learn about PicDB and its core features",
    content: [
      {
        type: "text",
        content:
          "PicDB is a comprehensive image database and management platform designed to help users organize, store, and share their images efficiently. Built with modern web technologies, PicDB offers a seamless experience for both individual users and teams.",
      },
      {
        type: "heading",
        content: "Key Features",
      },
      {
        type: "list",
        content: [
          "Free image storage and management",
          "Advanced search and filtering capabilities",
          "Group rooms for collaborative sharing",
          "Easy upload and download functionality",
          "Intuitive user interface",
          "Cross-platform accessibility",
        ],
      },
      {
        type: "text",
        content:
          "Whether you're a photographer, designer, or just someone who wants to organize their image collection, PicDB provides the tools you need to manage your visual assets effectively.",
      },
      {
        type: "button",
        content: { text: "Get Started Now", href: "/docs/getting-started" },
      },
    ],
  },
  "getting-started": {
    title: "Getting Started with PicDB",
    description: "Quick start guide to using PicDB",
    content: [
      {
        type: "text",
        content:
          "Welcome to PicDB! This guide will help you get started with the platform and make the most of its features.",
      },
      {
        type: "heading",
        content: "Step 1: Create Your Account",
      },
      {
        type: "text",
        content: "Sign up for a free PicDB account to access all features. No credit card required!",
      },
      {
        type: "heading",
        content: "Step 2: Upload Your First Image",
      },
      {
        type: "text",
        content:
          "Click the upload button and select images from your device. PicDB supports all major image formats including JPEG, PNG, GIF, and WebP.",
      },
      {
        type: "heading",
        content: "Step 3: Organize Your Collection",
      },
      {
        type: "text",
        content: "Use tags, folders, and collections to keep your images organized and easily searchable.",
      },
      {
        type: "button",
        content: { text: "Learn How to Upload", href: "/docs/how-to-upload" },
      },
    ],
  },
  "navigation-guide": {
    title: "Navigation Guide",
    description: "Navigate through PicDB like a pro",
    content: [
      {
        type: "text",
        content: "Master PicDB's interface with this comprehensive navigation guide.",
      },
      {
        type: "heading",
        content: "Main Navigation",
      },
      {
        type: "list",
        content: [
          "Dashboard: Your main hub for recent activity",
          "Gallery: Browse all your images",
          "Upload: Add new images to your collection",
          "Groups: Access shared group rooms",
          "Settings: Manage your account preferences",
        ],
      },
      {
        type: "heading",
        content: "Search and Filters",
      },
      {
        type: "text",
        content:
          "Use the search bar to find images by name, tags, or metadata. Apply filters for date, size, format, and more.",
      },
      {
        type: "heading",
        content: "Keyboard Shortcuts",
      },
      {
        type: "list",
        content: [
          "Ctrl/Cmd + U: Quick upload",
          "Ctrl/Cmd + F: Focus search",
          "Space: Preview selected image",
          "Arrow keys: Navigate between images",
        ],
      },
    ],
  },
  "group-rooms": {
    title: "Group Room Features",
    description: "Collaborate with others using group rooms",
    content: [
      {
        type: "text",
        content: "Group rooms allow you to collaborate with team members, share images, and work together on projects.",
      },
      {
        type: "heading",
        content: "Creating a Group Room",
      },
      {
        type: "list",
        content: [
          "Navigate to the Groups section",
          "Click 'Create New Group'",
          "Enter group name and description",
          "Set privacy settings (public/private)",
          "Invite members via email",
        ],
      },
      {
        type: "heading",
        content: "Group Permissions",
      },
      {
        type: "list",
        content: [
          "Admin: Full control over group settings",
          "Editor: Can upload, edit, and delete images",
          "Viewer: Can only view and download images",
          "Guest: Limited viewing access",
        ],
      },
      {
        type: "text",
        content: "Group rooms are perfect for creative teams, event planning, and collaborative projects.",
      },
      {
        type: "button",
        content: { text: "Back to Documentation", href: "/docs" },
      },
    ],
  },
}

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function DocPage({ params }: PageProps) {
  const docData = docsData[(await params).slug]

  if (!docData) {
    notFound()
  }

  // If it's an interactive tutorial, render the special component
  if (docData.isInteractive) {
    return <InteractiveTutorial content={docData.content} title={docData.title} />
  }

  const renderContent = (item: ContentItem, index: number) => {
    switch (item.type) {
      case "text":
        return (
          <div
            key={index}
            className="animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">{item.content}</p>
          </div>
        )

      case "heading":
        return (
          <div
            key={index}
            className="animate-in fade-in slide-in-from-left-4 duration-700"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center space-x-3 mt-10 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {item.content}
              </h2>
            </div>
          </div>
        )

      case "list":
        return (
          <div
            key={index}
            className="animate-in fade-in slide-in-from-right-4 duration-700"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ul className="space-y-3 mb-8">
              {item.content.map((listItem: string, listIndex: number) => (
                <li
                  key={listIndex}
                  className="flex items-start space-x-3 text-gray-700 text-lg animate-in fade-in slide-in-from-left-2 duration-500"
                  style={{ animationDelay: `${index * 100 + listIndex * 50}ms` }}
                >
                  <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-3"></div>
                  <span>{listItem}</span>
                </li>
              ))}
            </ul>
          </div>
        )

      case "button":
        return (
          <div
            key={index}
            className="my-8 animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Button
              asChild
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 shadow-lg text-lg px-6 py-3"
            >
              <Link href={item.content.href}>
                {item.content.text}
                <ExternalLink className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        )

      case "image":
        return (
          <div
            key={index}
            className="my-8 animate-in fade-in slide-in-from-bottom-6 duration-700"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative overflow-hidden rounded-xl shadow-2xl hover:shadow-3xl transition-shadow duration-500">
              <img
                src={item.content || "/placeholder.svg"}
                alt="Documentation image"
                className="w-full h-auto hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        )

      case "code":
        return (
          <div
            key={index}
            className="my-8 animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative">
              <pre className="bg-gradient-to-br from-gray-900 to-gray-800 text-green-400 p-6 rounded-xl overflow-x-auto shadow-2xl border border-gray-700">
                <code className="text-sm font-mono">{item.content}</code>
              </pre>
            </div>
          </div>
        )

      case "step":
        return (
          <div
            key={index}
            className="mb-8 p-6 rounded-lg shadow-md bg-white animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Step {item.content.stepNumber}: {item.content.title}
            </h3>
            <p className="text-gray-700 mb-4">{item.content.description}</p>
            <img src={item.content.image || "/placeholder.svg"} alt={item.content.title} className="rounded-md mb-4" />
            {item.content.tips && item.content.tips.length > 0 && (
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Tips:</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {item.content.tips.map((tip: string, tipIndex: number) => (
                    <li key={tipIndex}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Enhanced Back Button */}
        <div className="mb-8 animate-in fade-in slide-in-from-left-4 duration-700">
          <Button
            variant="ghost"
            asChild
            className="hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-md bg-white/80 backdrop-blur-sm"
          >
            <Link href="/docs">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Documentation
            </Link>
          </Button>
        </div>

        {/* Enhanced Content Card */}
        <Card className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl border-0 hover:shadow-3xl transition-all duration-500 relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
          <CardContent className="p-8 lg:p-12 relative z-10">
            {/* Enhanced Header */}
            <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                    {docData.title}
                  </h1>
                  <div className="flex items-center space-x-2 mt-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    <p className="text-xl text-gray-600">{docData.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Dynamic Content */}
            <div className="prose max-w-none">{docData.content.map((item, index) => renderContent(item, index))}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
