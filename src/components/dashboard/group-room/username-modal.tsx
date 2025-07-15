"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, User } from "lucide-react"

interface UsernameModalProps {
  open: boolean
  onUsernameSet: (username: string) => void
}

export function UsernameModal({ open, onUsernameSet }: UsernameModalProps) {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    setIsLoading(false);
    e.preventDefault()
    if (username.trim()) {
      onUsernameSet(username.trim())
      setIsLoading(true)
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md"> {/* hideClose */}
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Welcome to Group Room
          </DialogTitle>
          <DialogDescription>
            Please enter your name to get started. This will be displayed when you share images in groups.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Your Name</Label>
            <Input id="username" placeholder="Enter your display name" value={username}
              onChange={(e) => setUsername(e.target.value)} required autoFocus />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  wait...
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
