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
import { Loader2, Eye, EyeOff, Copy, Check } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface CreateGroupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: (groupId: string, groupCode: string, password: string, groupName?: string) => void
  username: string
}

export function CreateGroupModal({ open, onOpenChange, onSuccess, username }: CreateGroupModalProps) {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [groupDetails, setGroupDetails] = useState<{ id: string; code: string; password: string } | null>(null)
  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedPassword, setCopiedPassword] = useState(false)
  const [groupName, setGroupName] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          groupName: groupName.trim() || undefined,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setGroupDetails({
          id: result.groupId,
          code: result.groupCode,
          password,
        })
        toast({
          title: "Group created successfully!",
          description: "Share the code and password with others to let them join.",
        })
      } else {
        toast({
          title: "Failed to create group",
          description: result.error || "Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Failed to create group:", error)
      toast({
        title: "Error",
        description: "Failed to create group. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleJoinGroup = () => {
    if (groupDetails) {
      onSuccess(groupDetails.id, groupDetails.code, groupDetails.password, groupName.trim() || "My Group")
    }
  }

  const copyToClipboard = async (text: string, type: "code" | "password") => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === "code") {
        setCopiedCode(true)
        setTimeout(() => setCopiedCode(false), 2000)
      } else {
        setCopiedPassword(true)
        setTimeout(() => setCopiedPassword(false), 2000)
      }
      toast({
        title: `${type === "code" ? "Code" : "Password"} copied!`,
        description: `Group ${type} has been copied to clipboard.`,
      })
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const handleClose = () => {
    setPassword("")
    setGroupName("")
    setGroupDetails(null)
    setCopiedCode(false)
    setCopiedPassword(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{groupDetails ? "Group Created Successfully!" : "Create a New Group"}</DialogTitle>
          <DialogDescription>
            {groupDetails
              ? "Share these credentials with others so they can join your group."
              : `Creating group as ${username}. Set a secure password for your group.`}
          </DialogDescription>
        </DialogHeader>

        {!groupDetails ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="groupName">Group Name</Label>
              <Input
                id="groupName"
                placeholder="Enter a name for your group"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Group Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a secure password"
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
                    Creating...
                  </>
                ) : (
                  "Create Group"
                )}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <Label className="text-sm font-medium">Group Code</Label>
                  <p className="font-mono text-lg">{groupDetails.code}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(groupDetails.code, "code")}>
                  {copiedCode ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <Label className="text-sm font-medium">Password</Label>
                  <p className="font-mono text-lg">{groupDetails.password}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(groupDetails.password, "password")}>
                  {copiedPassword ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
              <p className="font-medium">Important:</p>
              <p>
                Both the code and password are required to join the group. Make sure to share both with your friends.
              </p>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
              <Button onClick={handleJoinGroup}>Enter Group</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
