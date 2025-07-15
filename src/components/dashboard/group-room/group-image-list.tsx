"use client"

import { useState } from "react"
import type { ImageMessage } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Grid3X3, List, Download, Eye } from "lucide-react"
import { format } from "date-fns"

interface GroupImageListProps {
  messages: ImageMessage[]
  username: string
  onImageClick: (image: ImageMessage) => void
  onImageDelete: (imageId: string) => void
}

export function GroupImageList({ messages, username, onImageClick, onImageDelete }: GroupImageListProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const formatFileSize = (bytes: number) => {
    if (bytes >= 1073741824) return (bytes / 1073741824).toFixed(2) + " GB"
    else if (bytes >= 1048576) return (bytes / 1048576).toFixed(2) + " MB"
    else if (bytes >= 1024) return (bytes / 1024).toFixed(2) + " KB"
    else return bytes + " bytes"
  }

  const GridView = () => (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 300px)" }}
    >
      {messages.length > 0 ? (
        messages.map((message) => (
          <div
            key={message.id}
            className="group relative bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden"
            onClick={() => onImageClick(message)}
          >
            {/* Image Thumbnail */}
            <div className="aspect-square bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden">
              <img
                src={message.imageUrl || "/placeholder.svg"}
                alt={message.title || "Image"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onImageClick(message)
                    }}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <Eye className="h-4 w-4 text-gray-700" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(message.downloadUrl, "_blank")
                    }}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <Download className="h-4 w-4 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* User Badge */}
              <div className="absolute top-2 left-2">
                <Badge variant={message.username === username ? "default" : "secondary"} className="text-xs">
                  {message.username === username ? "You" : message.username}
                </Badge>
              </div>
            </div>

            {/* File Info */}
            <div className="p-3">
              <h3 className="font-medium text-gray-900 text-sm truncate mb-1">{message.title}</h3>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{format(new Date(message.timestamp), "MMM dd")}</span>
                <span>{message.size && formatFileSize(message.size)}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
          <Grid3X3 className="h-16 w-16 mb-4 text-gray-300" />
          <p className="text-lg font-medium">No images shared yet</p>
          <p className="text-sm">Upload an image to get started</p>
        </div>
      )}
    </div>
  )

  const ListView = () => (
    <div
      className="overflow-y-auto bg-white rounded-lg border border-gray-200"
      style={{ maxHeight: "calc(100vh - 300px)" }}
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
            <th className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {messages.length > 0 ? (
            messages.map((message) => (
              <tr
                key={message.id}
                onClick={() => onImageClick(message)}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={message.imageUrl || "/placeholder.svg"}
                      alt={message.title || "Image"}
                      className="h-12 w-12 rounded-lg object-cover mr-4"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{message.title}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-900">{message.username}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(message.timestamp), "MMM dd, yyyy HH:mm")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {message.size && formatFileSize(message.size)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                <div className="flex flex-col items-center">
                  <List className="h-12 w-12 mb-4 text-gray-300" />
                  <p className="text-lg font-medium">No images shared yet</p>
                  <p className="text-sm">Upload an image to get started</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Shared Images ({messages.length})</h2>
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              viewMode === "list" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <List className="h-4 w-4 mr-2" />
            List
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              viewMode === "grid" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Grid3X3 className="h-4 w-4 mr-2" />
            Grid
          </button>
        </div>
      </div>

      {viewMode === "list" ? <ListView /> : <GridView />}
    </section>
  )
}
