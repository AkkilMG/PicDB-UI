"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
  data: any
}

export function UsernameModal({ data, open, onUsernameSet }: UsernameModalProps) {
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
            {data.modals.username.title}
          </DialogTitle>
          <DialogDescription>
            {data.modals.username.description}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">{data.modals.username.nameLabel}</Label>
            <Input id="username" placeholder={data.modals.username.namePlaceholder} value={username}
              onChange={(e) => setUsername(e.target.value)} required autoFocus />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {data.modals.username.wait}
                </>
              ) : (
                data.modals.username.continue
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
