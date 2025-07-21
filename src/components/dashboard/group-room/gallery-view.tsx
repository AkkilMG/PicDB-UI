"use client"

import type { ImageMessage } from "@/lib/types"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ImageModal } from "./image-modal"
import { Search, Download, User, Calendar, Grid, List } from "lucide-react"
import { format } from "date-fns"
import { enGroup, esGroup, ruGroup, hiGroup } from "@/config/text/group.text"

interface GalleryViewProps {
  messages: ImageMessage[]
}

export function GalleryView({ messages }: GalleryViewProps) {
  const [selectedImage, setSelectedImage] = useState<ImageMessage | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [data, setData] = useState(enGroup)

  // Language configuration
  useEffect(() => {
    const checkLanguage = () => {
      const lang = localStorage.getItem("lang")
      if (lang === "es") {
        setData(esGroup)
      } else if (lang === "ru") {
        setData(ruGroup)
      } else if (lang === "hi") {
        setData(hiGroup)
      } else {
        setData(enGroup)
      }
    }

    checkLanguage()
    const intervalId = setInterval(checkLanguage, 2000)

    return () => clearInterval(intervalId)
  }, [])

  const filteredMessages = messages.filter(
    (message) =>
      message.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.username.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Grid className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No images in gallery</h3>
          <p className="text-gray-500">{data.dashboard.noImages}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Gallery Header */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={data.gallery.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary">{filteredMessages.length} {data.header.images}</Badge>
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
      </div>

      {/* Gallery Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">{data.gallery.noImagesMatch}</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className="group cursor-pointer bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
                onClick={() => setSelectedImage(message)}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={message.imageUrl || "/placeholder.svg"}
                    alt={message.title || "Image"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium text-gray-900 truncate">{message.title}</p>
                  <p className="text-xs text-gray-500">{message.username}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className="bg-white rounded-lg border p-4 hover:shadow-sm transition-shadow cursor-pointer"
                onClick={() => setSelectedImage(message)}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={message.imageUrl || "/placeholder.svg"}
                    alt={message.title || "Image"}
                    className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{message.title}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{message.username}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{format(new Date(message.timestamp), "MMM dd, yyyy")}</span>
                      </div>
                      {message.size && <span>{formatFileSize(message.size)}</span>}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(message.downloadUrl, "_blank")
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  )
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
