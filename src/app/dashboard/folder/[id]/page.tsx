"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Upload,
  Grid,
  List,
  Search,
  Filter,
  FolderIcon,
  FileText,
  ImageIcon,
  Video,
  Download,
  Trash2,
  MoreHorizontal,
  Loader2,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import MainDashboardFolders from "@/components/dashboard/main/folders"

interface FolderPageProps {
  params: Promise<{ id: string }>
}

interface FileItem {
  id: string
  name: string
  type: string
  size: number
  uploadedAt: string
  url: string
}

export default function FolderPage({ params }: FolderPageProps) {
  const [folderId, setFolderId] = useState<string>("")
  const [folderName, setFolderName] = useState<string>("Loading...")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [files, setFiles] = useState<FileItem[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Get user ID from localStorage (in real app, from auth context)
  const userId = typeof window !== "undefined" ? localStorage.getItem("uid") || "user123" : "user123"

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params
      setFolderId(resolvedParams.id)
      await fetchFolderDetails(resolvedParams.id)
    }
    fetchParams()
  }, [params])

  const fetchFolderDetails = async (id: string) => {
    try {
      setLoading(true)
      // In a real app, you'd fetch folder details and files from API
      // For now, we'll simulate this
      setFolderName(`Folder ${id}`)

      // Simulate files data
      const mockFiles: FileItem[] = [
        {
          id: "1",
          name: "image1.jpg",
          type: "image/jpeg",
          size: 1024000,
          uploadedAt: new Date().toISOString(),
          url: "/placeholder.svg?height=200&width=200",
        },
        {
          id: "2",
          name: "document.pdf",
          type: "application/pdf",
          size: 2048000,
          uploadedAt: new Date().toISOString(),
          url: "/placeholder.svg?height=200&width=200",
        },
      ]

      setFiles(mockFiles)
    } catch (error) {
      console.error("Error fetching folder details:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    router.push("/dashboard/folder")
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="h-5 w-5 text-blue-500" />
    if (type.startsWith("video/")) return <Video className="h-5 w-5 text-purple-500" />
    return <FileText className="h-5 w-5 text-gray-500" />
  }

  const getFileTypeColor = (type: string) => {
    if (type.startsWith("image/")) return "bg-blue-100 text-blue-800"
    if (type.startsWith("video/")) return "bg-purple-100 text-purple-800"
    if (type.includes("pdf")) return "bg-red-100 text-red-800"
    return "bg-gray-100 text-gray-800"
  }

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()))

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading folder...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Folders
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <FolderIcon className="h-6 w-6 text-blue-500" />
                {folderName}
              </h1>
              <p className="text-sm text-gray-600">Folder ID: {folderId}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>

            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Files</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{files.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Size</CardTitle>
              <FileText className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatFileSize(files.reduce((sum, file) => sum + file.size, 0))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">File Types</CardTitle>
              <FileText className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(files.map((f) => f.type.split("/")[0])).size}</div>
            </CardContent>
          </Card>
        </div>

        {/* Subfolders */}
        <MainDashboardFolders userId={userId} parentId={folderId} />

        {/* Search and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Files */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Files ({filteredFiles.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredFiles.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {searchTerm ? (
                  <>
                    <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No files found matching "{searchTerm}"</p>
                  </>
                ) : (
                  <>
                    <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No files in this folder yet.</p>
                    <Button variant="outline" className="mt-2 bg-transparent">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload your first file
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    : "space-y-2"
                }
              >
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className={
                      viewMode === "grid"
                        ? "border rounded-lg p-4 hover:shadow-md transition-shadow group"
                        : "border rounded-lg p-4 hover:shadow-md transition-shadow group flex items-center justify-between"
                    }
                  >
                    <div className={viewMode === "grid" ? "" : "flex items-center gap-3 flex-1"}>
                      {viewMode === "grid" ? (
                        <>
                          <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                            {file.type.startsWith("image/") ? (
                              <img
                                src={file.url || "/placeholder.svg"}
                                alt={file.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              getFileIcon(file.type)
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-sm truncate" title={file.name}>
                              {file.name}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">{formatFileSize(file.size)}</p>
                            <Badge variant="secondary" className={`text-xs mt-1 ${getFileTypeColor(file.type)}`}>
                              {file.type.split("/")[1]?.toUpperCase() || "FILE"}
                            </Badge>
                          </div>
                        </>
                      ) : (
                        <>
                          {getFileIcon(file.type)}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium truncate" title={file.name}>
                              {file.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-gray-500">{formatFileSize(file.size)}</span>
                              <Badge variant="secondary" className={`text-xs ${getFileTypeColor(file.type)}`}>
                                {file.type.split("/")[1]?.toUpperCase() || "FILE"}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Uploaded {new Date(file.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </>
                      )}
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity ${
                            viewMode === "grid" ? "absolute top-2 right-2" : ""
                          }`}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
