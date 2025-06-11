"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ImagePlus, Loader2, X, Send } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface ImageUploaderProps {
  onUpload: (file: File) => Promise<void>
  username: string
}

export function ImageUploader({ onUpload, username }: ImageUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (60MB limit)
    if (file.size > 60 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image under 60MB.",
        variant: "destructive",
      })
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    setSelectedFile(file)
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    setProgress(0)

    try {
      // Simulate progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 10
          return newProgress >= 90 ? 90 : newProgress
        })
      }, 300)

      await onUpload(selectedFile)

      clearInterval(interval)
      setProgress(100)

      // Reset after successful upload
      setTimeout(() => {
        setSelectedFile(null)
        setPreview(null)
        setProgress(0)
        setIsUploading(false)
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      }, 1000)
    } catch (error) {
      console.error("Upload failed:", error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image.",
        variant: "destructive",
      })
      setIsUploading(false)
    }
  }

  const clearSelection = () => {
    setSelectedFile(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-3">
      {preview && (
        <div className="relative bg-gray-50 rounded-lg p-3">
          <div className="flex items-start gap-3">
            <img
              src={preview || "/placeholder.svg"}
              alt="Preview"
              className="w-16 h-16 object-cover rounded-md flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{selectedFile?.name}</p>
              <p className="text-xs text-gray-500">
                {selectedFile && formatFileSize(selectedFile.size)} • Ready to send
              </p>
              {isUploading && (
                <div className="mt-2">
                  <Progress value={progress} className="h-1" />
                  <p className="text-xs text-gray-500 mt-1">{progress}% uploaded</p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-gray-600"
              onClick={clearSelection}
              disabled={isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        {!selectedFile ? (
          <>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="flex-1 cursor-pointer">
              <div className="flex items-center gap-3 p-3 border-2 border-dashed border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors">
                <ImagePlus className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">Click to select an image to share</span>
              </div>
            </label>
          </>
        ) : (
          <Button onClick={handleUpload} className="flex-1" disabled={isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Image
              </>
            )}
          </Button>
        )}
      </div>
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
