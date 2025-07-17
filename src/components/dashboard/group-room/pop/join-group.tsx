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
import { Loader2, Eye, EyeOff } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface JoinGroupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: (groupId: string, groupCode: string, password: string, groupName?: string) => void
  username: string
}

export function JoinGroupModal({ open, onOpenChange, onSuccess, username }: JoinGroupModalProps) {
  const [groupCode, setGroupCode] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!groupCode.trim() || !password.trim()) return

    setIsLoading(true)
    var uid = localStorage.getItem("uid")
    try {
      const response = await fetch("/api/groups/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: groupCode,
          uid: uid,
          password,
          username,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Successfully joined group!",
          description: "Welcome to the group room.",
        })
        onSuccess(result.groupId, groupCode, password, undefined)
      } else {
        toast({
          title: "Failed to join group",
          description: result.error || "Invalid credentials or group not found.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Failed to join group:", error)
      toast({
        title: "Error",
        description: "Failed to join group. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setGroupCode("")
    setPassword("")
    setShowPassword(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join an Existing Group</DialogTitle>
          <DialogDescription>Joining as {username}. Enter the group code and password to join.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="groupCode">Group Code</Label>
            <Input
              id="groupCode"
              placeholder="Enter 6-character group code"
              value={groupCode}
              onChange={(e) => setGroupCode(e.target.value.toUpperCase())}
              maxLength={6}
              className="font-mono text-center text-lg tracking-wider"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Group Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter group password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Joining...
                </>
              ) : (
                "Join Group"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
