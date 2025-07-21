"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Share2, Check, Copy } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ShareCodeProps {
  groupCode: string
  groupPassword?: string
}

export function ShareCode({ groupCode, groupPassword }: ShareCodeProps) {
  const [copiedCode, setCopiedCode] = useState(false)
  const [open, setOpen] = useState(false)

  const handleCopyCode = () => {
    navigator.clipboard.writeText(groupCode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="px-2 sm:px-3 h-8 sm:h-9 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200">
          <Share2 className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2 text-blue-600" />
          <span className="hidden sm:inline text-sm">Share Access</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md mx-4 sm:mx-0 max-w-[calc(100vw-2rem)] rounded-xl">
        <DialogHeader className="text-center sm:text-left">
          <DialogTitle className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Share Group Access
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Share the group code with others to let them join your group.
          </DialogDescription>
        </DialogHeader>

        
        <div className="space-y-4 mt-6">
          <div className="relative">
            {/* Creative Group Code Display */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-dashed border-blue-200 rounded-xl p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <Label className="text-xs sm:text-sm font-medium text-blue-700 uppercase tracking-wide">
                    Group Code
                  </Label>
                  <div className="mt-1 flex items-center gap-2">
                    <p className="font-mono text-xl sm:text-2xl font-bold text-gray-900 tracking-wider">
                      {groupCode}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleCopyCode} 
                  className="shrink-0 ml-3 h-10 w-10 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                >
                  {copiedCode ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4 text-blue-600" />
                  )}
                </Button>
              </div>
              
              {/* Mobile: Visual Feedback */}
              {copiedCode && (
                <div className="mt-2 text-center sm:text-left">
                  <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
                    <Check className="h-3 w-3" />
                    Copied to clipboard!
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Creative Help Text */}
        <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs sm:text-sm text-amber-800">
            💡 <span className="font-medium">Tip:</span> Share this code with friends so they can join and start sharing images together!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
