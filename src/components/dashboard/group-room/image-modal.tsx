
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
  data: any
}

export function ImageModal({ data, image, onClose }: ImageModalProps) {
  const handleDownload = () => {
    window.open(image.downloadUrl, "_blank")
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] sm:max-h-[90vh] p-0 overflow-hidden w-[95vw] sm:w-full mx-auto">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-full max-h-[95vh] sm:max-h-[90vh]">.
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border-b bg-white gap-3 sm:gap-0">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <Avatar className="w-7 h-7 sm:w-8 sm:h-8 shrink-0">
                <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {image.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">{image.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 truncate">{data.modals.image.shared} {image.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 justify-end sm:justify-start sm:pr-10">
              <Button variant="outline" size="sm" onClick={handleDownload} className="text-xs sm:text-sm px-2 sm:px-3 h-8 sm:h-9">
                <Download className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">{data.modals.image.download}</span>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 flex items-center justify-center bg-gray-50 p-2 sm:p-4 min-h-0 overflow-hidden">
            <img
              src={image.imageUrl || "/placeholder.svg"}
              alt={image.title || "Image"}
              className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
            />
          </div>

          {/* Footer */}
          <div className="p-3 sm:p-4 border-t bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{image.username}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">{format(new Date(image.timestamp), "MMM dd, yyyy 'at' HH:mm")}</span>
                  <span className="sm:hidden">{format(new Date(image.timestamp), "MMM dd, HH:mm")}</span>
                </div>
                {image.size && (
                  <div className="flex items-center gap-1">
                    <FileImage className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{formatFileSize(image.size)}</span>
                  </div>
                )}
              </div>
              <Badge variant="secondary" className="font-mono text-xs w-fit">
                <span className="hidden sm:inline">{image.id}</span>
                <span className="sm:hidden">#{image.id.slice(-6)}</span>
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
