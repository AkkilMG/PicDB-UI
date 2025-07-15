
import type { ImageMessage } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Download, X, User, Calendar, FileImage } from "lucide-react"
import { format } from "date-fns"

interface ImageModalProps {
  image: ImageMessage
  onClose: () => void
}

export function ImageModal({ image, onClose }: ImageModalProps) {
  const handleDownload = () => {
    window.open(image.downloadUrl, "_blank")
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-white">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {image.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-gray-900">{image.title}</h3>
                <p className="text-sm text-gray-500">Shared by {image.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pr-10">
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              {/* <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button> */}
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 flex items-center justify-center bg-gray-50 p-4">
            <img
              src={image.imageUrl || "/placeholder.svg"}
              alt={image.title || "Image"}
              className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
            />
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{image.username}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(image.timestamp), "MMM dd, yyyy 'at' HH:mm")}</span>
                </div>
                {image.size && (
                  <div className="flex items-center gap-1">
                    <FileImage className="h-4 w-4" />
                    <span>{formatFileSize(image.size)}</span>
                  </div>
                )}
              </div>
              <Badge variant="secondary" className="font-mono">
                {image.id}
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
