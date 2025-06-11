"use client"

import type { ImageMessage } from "@/lib/types"
import { format, isToday, isYesterday } from "date-fns"
import { Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useState } from "react"
import { ImageModal } from "./image-modal"

interface ChatViewProps {
  messages: ImageMessage[]
  username: string
}

export function ChatView({ messages, username }: ChatViewProps) {
  const [selectedImage, setSelectedImage] = useState<ImageMessage | null>(null)

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp)
    if (isToday(date)) {
      return format(date, "HH:mm")
    } else if (isYesterday(date)) {
      return `Yesterday ${format(date, "HH:mm")}`
    } else {
      return format(date, "MMM dd, HH:mm")
    }
  }

  const getDateSeparator = (timestamp: string) => {
    const date = new Date(timestamp)
    if (isToday(date)) {
      return "Today"
    } else if (isYesterday(date)) {
      return "Yesterday"
    } else {
      return format(date, "MMMM dd, yyyy")
    }
  }

  const shouldShowDateSeparator = (currentMessage: ImageMessage, previousMessage?: ImageMessage) => {
    if (!previousMessage) return true

    const currentDate = new Date(currentMessage.timestamp).toDateString()
    const previousDate = new Date(previousMessage.timestamp).toDateString()

    return currentDate !== previousDate
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No images yet</h3>
          <p className="text-gray-500">Be the first to share an image in this group!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 space-y-4">
        {messages.map((message, index) => {
          const isOwnMessage = message.username === username
          const showDateSeparator = shouldShowDateSeparator(message, messages[index - 1])

          return (
            <div key={message.id}>
              {/* Date Separator */}
              {showDateSeparator && (
                <div className="flex items-center justify-center py-2">
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-600 font-medium">
                    {getDateSeparator(message.timestamp)}
                  </div>
                </div>
              )}

              {/* Message */}
              <div className={`flex gap-3 ${isOwnMessage ? "flex-row-reverse" : ""}`}>
                {/* Avatar */}
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {message.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* Message Content */}
                <div className={`flex-1 max-w-md ${isOwnMessage ? "items-end" : "items-start"} flex flex-col`}>
                  {/* Username and Time */}
                  <div className={`flex items-center gap-2 mb-1 ${isOwnMessage ? "flex-row-reverse" : ""}`}>
                    <span className="text-sm font-medium text-gray-900">{message.username}</span>
                    <span className="text-xs text-gray-500">{formatMessageTime(message.timestamp)}</span>
                  </div>

                  {/* Image Card */}
                  <div
                    className={`bg-white rounded-lg shadow-sm border overflow-hidden ${
                      isOwnMessage ? "bg-blue-50 border-blue-200" : ""
                    }`}
                  >
                    {/* Image */}
                    <div className="relative group cursor-pointer" onClick={() => setSelectedImage(message)}>
                      <img
                        src={message.imageUrl || "/placeholder.svg"}
                        alt={message.title || "Shared image"}
                        className="w-full h-auto max-h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                        <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                    </div>

                    {/* Image Info */}
                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{message.title}</p>
                          {message.size && <p className="text-xs text-gray-500">{formatFileSize(message.size)}</p>}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(message.downloadUrl, "_blank")
                          }}
                          className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
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
