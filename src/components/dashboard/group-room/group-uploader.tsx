"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X, FileImage, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface GroupUploaderProps {
  onUpload: (file: File) => Promise<any>
  username: string
  onClose: () => void
  data: any
}

export function GroupUploader({ data, onUpload, username, onClose }: GroupUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const file = files[0]
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

      const result = await onUpload(selectedFile)

      clearInterval(interval)
      setProgress(100)

      if (result.success) {
        toast({
          title: "Image uploaded successfully!",
          description: `${selectedFile.name} has been shared with the group.`,
        })
        // Reset after successful upload
        setTimeout(() => {
          setSelectedFile(null)
          setPreview(null)
          setProgress(0)
          setIsUploading(false)
          onClose()
        }, 1000)
      } else {
        console.log("Upload failed: ", result)
        throw new Error("Upload failed")
      }
    } catch (error) {
      console.error("Upload failed:", error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image.",
        variant: "destructive",
      })
      setIsUploading(false)
      setProgress(0)
    }
  }

  const clearSelection = () => {
    setSelectedFile(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes >= 1048576) return (bytes / 1048576).toFixed(2) + " MB"
    else if (bytes >= 1024) return (bytes / 1024).toFixed(2) + " KB"
    else return bytes + " bytes"
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-0 sm:border shadow-none sm:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-3 sm:pb-6 px-4 sm:px-6">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">{data.modals.upload.title}</span>
          <span className="sm:hidden">{data.modals.upload.description}</span>
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 sm:h-10 sm:w-10">
          <X className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
        {!selectedFile ? (
          <div>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer block">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center hover:border-gray-400 hover:bg-gray-50 transition-colors">
                <FileImage className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-gray-400 mb-3 sm:mb-4" />
                <p className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">
                  <span className="hidden sm:inline">{data.modals.upload.click}</span>
                  <span className="sm:hidden">{data.modals.upload.tap}</span>
                </p>
                <p className="text-xs sm:text-sm text-gray-500">{data.modals.upload.format}</p>
              </div>
            </label>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {/* Preview */}
            <div className="relative">
              <img
                src={preview || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-48 sm:h-64 object-cover rounded-lg border"
              />
            </div>

            {/* File Info */}
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{selectedFile.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    <span className="block sm:inline">{formatFileSize(selectedFile.size)}</span>
                    <span className="hidden sm:inline"> • </span>
                    <span className="block sm:inline">{data.modals.upload.share.replace("{username}", username)}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Progress */}
            {isUploading && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-xs sm:text-sm text-center text-gray-600">{progress}% {data.modals.upload.uploaded}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button variant="outline" onClick={clearSelection} disabled={isUploading} className="flex-1 h-10 sm:h-auto text-sm sm:text-base">
                <span className="hidden sm:inline">{data.modals.upload.choose}</span>
                <span className="sm:hidden">{data.modals.upload.change}</span>
              </Button>
              <Button onClick={handleUpload} disabled={isUploading} className="flex-1 h-10 sm:h-auto text-sm sm:text-base">
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                    <span className="hidden sm:inline">{data.modals.upload.uploading}...</span>
                    <span className="sm:hidden">{data.modals.upload.uploading}</span>
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">{data.modals.upload.shareImg}</span>
                    <span className="sm:hidden">{data.modals.upload.sharee}</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
