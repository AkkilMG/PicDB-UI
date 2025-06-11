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
  const [copiedPassword, setCopiedPassword] = useState(false)
  const [open, setOpen] = useState(false)

  const handleCopyCode = () => {
    navigator.clipboard.writeText(groupCode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const handleCopyPassword = () => {
    if (groupPassword) {
      navigator.clipboard.writeText(groupPassword)
      setCopiedPassword(true)
      setTimeout(() => setCopiedPassword(false), 2000)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share Access
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share group access</DialogTitle>
          <DialogDescription>
            Share both the code and password with others so they can join your group.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="code">Group Code</Label>
              <Input id="code" value={groupCode} readOnly className="text-center font-mono text-lg" />
            </div>
            <Button size="sm" onClick={handleCopyCode}>
              {copiedCode ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>

          {groupPassword && (
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" value={groupPassword} readOnly className="text-center" />
              </div>
              <Button size="sm" onClick={handleCopyPassword}>
                {copiedPassword ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Both the code and password are required to join your group. Make sure to share both credentials.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
