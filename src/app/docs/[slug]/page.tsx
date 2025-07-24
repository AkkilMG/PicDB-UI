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
          title: "Navigate to Upload",
          description: "First, you need to get to the upload page. If you're on the home page, click on \"Upload\" button. If you're in dashboard, navigate to side nav and click on Upload to go to upload page.",
          image: "/placeholder.svg?height=400&width=600&text=Home+Page+Upload+Button",
          tips: [
            "From home page: Look for the Upload button",
            "From dashboard: Check the side navigation",
            "Upload button is usually highlighted in blue",
            "Look for cloud or upload icons",
          ],
        },
      },
      {
        type: "step",
        content: {
          stepNumber: 2,
          title: "Access Upload Zone",
          description: "Once you're on the upload page, you'll see the upload zone. You can click on the upload zone to browse and select images from your device.",
          image: "/placeholder.svg?height=400&width=600&text=Upload+Zone+Click+Area",
          tips: [
            "Click anywhere in the upload zone area",
            "Look for 'Choose Files' or 'Browse' text",
            "The zone is usually highlighted with a dashed border",
            "File browser will open when you click",
          ],
        },
      },
      {
        type: "step",
        content: {
          stepNumber: 3,
          title: "Drag and Drop Alternative",
          description: "Alternatively, you can drag and drop images directly into the upload zone. This is often faster for multiple files.",
          image: "/placeholder.svg?height=400&width=600&text=Drag+and+Drop+Demo",
          tips: [
            "Drag files from your computer",
            "Drop them anywhere in the upload zone",
            "Works with multiple files at once",
            "Supported formats: JPEG, PNG, GIF, WebP",
          ],
        },
      },
      {
        type: "step",
        content: {
          stepNumber: 4,
          title: "Upload Complete",
          description: "That's it! You have uploaded your images and can now access them with a link or through the dashboard to view all uploaded images.",
          image: "/placeholder.svg?height=400&width=600&text=Uploaded+Images+in+Dashboard",
          tips: [
            "Images are now stored in your account",
            "Access them through your dashboard",
            "Share them using generated links",
            "Organize them into folders if needed",
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
    description: "Interactive guide to navigating PicDB",
    isInteractive: true,
    content: [
      {
        type: "step",
        content: {
          stepNumber: 1,
          title: "Access from Home Page",
          description: "If you're on the home page, look for the prominent Upload button. It's usually positioned in the main navigation or as a call-to-action button.",
          image: "/placeholder.svg?height=400&width=600&text=Home+Page+Upload+Button+Location",
          tips: [
            "The Upload button is typically highlighted in blue",
            "Look for upload or cloud icons",
            "It may be in the top navigation bar",
          ],
        },
      },
      {
        type: "step",
        content: {
          stepNumber: 2,
          title: "Navigate from Dashboard",
          description: "When you're in the dashboard, locate the side navigation panel and click on the Upload option to access the upload page.",
          image: "/placeholder.svg?height=400&width=600&text=Dashboard+Side+Navigation+Upload",
          tips: [
            "Side navigation is usually on the left side",
            "Look for an upload or plus icon",
            "The upload option may be labeled as 'Add Images' or 'Upload'",
          ],
        },
      },
      {
        type: "step",
        content: {
          stepNumber: 3,
          title: "Main Dashboard Navigation",
          description: "Explore the main navigation options in your dashboard including Gallery, Groups, and Settings.",
          image: "/placeholder.svg?height=400&width=600&text=Main+Dashboard+Navigation",
          tips: [
            "Dashboard: Your main hub for recent activity",
            "Gallery: Browse all your images",
            "Groups: Access shared group rooms",
            "Settings: Manage your account preferences",
          ],
        },
      },
      {
        type: "step",
        content: {
          stepNumber: 4,
          title: "Search and Filters",
          description: "Learn how to use the search bar and filters to find images by name, tags, or metadata. Apply filters for date, size, format, and more.",
          image: "/placeholder.svg?height=400&width=600&text=Search+and+Filter+Interface",
          tips: [
            "Use the search bar at the top of the page",
            "Apply multiple filters for better results",
            "Save your frequent searches for quick access",
          ],
        },
      },
      {
        type: "step",
        content: {
          stepNumber: 5,
          title: "Keyboard Shortcuts",
          description: "Master these keyboard shortcuts to navigate PicDB more efficiently and save time.",
          image: "/placeholder.svg?height=400&width=600&text=Keyboard+Shortcuts+Guide",
          tips: [
            "Ctrl/Cmd + U: Quick upload",
            "Ctrl/Cmd + F: Focus search",
            "Space: Preview selected image",
            "Arrow keys: Navigate between images",
          ],
        },
      },
    ],
  },
  "group-rooms": {
    title: "Group Room Features",
    description: "Interactive guide to using group rooms",
    isInteractive: true,
    content: [
      {
        type: "step",
        content: {
          stepNumber: 1,
          title: "Understanding Group Rooms",
          description: "Group rooms allow you to collaborate with team members, share images, and work together on projects. They're perfect for creative teams, event planning, and collaborative projects.",
          image: "/placeholder.svg?height=400&width=600&text=Group+Rooms+Overview",
          tips: [
            "Group rooms are shared spaces for teams",
            "Each room can have multiple members",
            "Images are shared across all group members",
            "Perfect for project collaboration",
          ],
        },
      },
      {
        type: "step",
        content: {
          stepNumber: 2,
          title: "Navigate to Groups Section",
          description: "First, you need to navigate to the Groups section in your dashboard. Look for the Groups menu item in your main navigation.",
          image: "/placeholder.svg?height=400&width=600&text=Groups+Section+Navigation",
          tips: [
            "Groups section is in the main navigation",
            "Look for a group or people icon",
            "May be labeled as 'Teams' or 'Collaboration'",
            "Usually located in the sidebar",
          ],
        },
      },
      {
        type: "step",
        content: {
          stepNumber: 3,
          title: "Create New Group",
          description: "Click the 'Create New Group' button to start setting up your collaborative space. This will open the group creation form.",
          image: "/placeholder.svg?height=400&width=600&text=Create+New+Group+Button",
          tips: [
            "Look for a prominent 'Create' or '+' button",
            "May be labeled as 'New Group' or 'Add Group'",
            "Usually positioned at the top of the groups page",
            "Some platforms use a floating action button",
          ],
        },
      },
      {
        type: "step",
        content: {
          stepNumber: 4,
          title: "Configure Group Settings",
          description: "Fill in the group name, description, and configure privacy settings. You can set the group as public or private, and decide who can join.",
          image: "/placeholder.svg?height=400&width=600&text=Group+Creation+Form",
          tips: [
            "Choose a descriptive group name",
            "Add a clear description of the group's purpose",
            "Set privacy settings carefully",
            "Consider who should have access",
          ],
        },
      },
      {
        type: "step",
        content: {
          stepNumber: 5,
          title: "Invite Members",
          description: "Add team members to your group by inviting them via email. You can set different permission levels for each member.",
          image: "/placeholder.svg?height=400&width=600&text=Invite+Members+Interface",
          tips: [
            "Send invites via email addresses",
            "Set appropriate permission levels",
            "You can add members later too",
            "Members will receive email notifications",
          ],
        },
      },
      {
        type: "step",
        content: {
          stepNumber: 6,
          title: "Manage Group Permissions",
          description: "Understand and configure the different permission levels: Admin (full control), Editor (upload/edit/delete), Viewer (view/download only), and Guest (limited access).",
          image: "/placeholder.svg?height=400&width=600&text=Group+Permissions+Settings",
          tips: [
            "Admin: Full control over group settings",
            "Editor: Can upload, edit, and delete images",
            "Viewer: Can only view and download images",
            "Guest: Limited viewing access",
          ],
        },
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
          <div key={index} className="mb-8 p-6 rounded-lg shadow-md bg-white animate-in fade-in slide-in-from-bottom-4 duration-700"
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
