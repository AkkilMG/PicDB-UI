"use client"

import type React from "react"

import { useEffect, useState } from "react"
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
import { useRouter } from "next/navigation"

interface CreateGroupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  username: string
  data: any
}

export function CreateGroupModal({ data, open, onOpenChange, username }: CreateGroupModalProps) {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [groupDetails, setGroupDetails] = useState<any>(null)
  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedPassword, setCopiedPassword] = useState(false)
  const [savedGroups, setSavedGroups] = useState<any[]>([])
  const [groupName, setGroupName] = useState("")
  const [language, setLanguage] = useState("en")

  const router = useRouter()

  // Language detection
  useEffect(() => {
    const checkLanguage = () => {
      const selectedLang = localStorage.getItem("selectedLanguage") || "en"
      setLanguage(selectedLang)
    }
    
    checkLanguage()
    const interval = setInterval(checkLanguage, 2000)
    return () => clearInterval(interval)
  }, [])

  
  const saveGroupToLocalStorage = (groupData: any) => {
    const existingGroups = [...savedGroups]
    const existingIndex = existingGroups.findIndex((g) => g.code === groupData.code)

    if (existingIndex >= 0) {
      existingGroups[existingIndex] = { ...existingGroups[existingIndex], ...groupData }
    } else {
      existingGroups.push(groupData)
    }

    setSavedGroups(existingGroups)
    localStorage.setItem("grouproom_saved_groups", JSON.stringify(existingGroups))
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim()) return

    setIsLoading(true)
    var groupData = {
      username,
      uid: localStorage.getItem("uid"),
      password,
      groupName: groupName.trim() || undefined,
    }
    try {
      const response = await fetch("/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(groupData),
      })

      const result = await response.json()

      if (result.success) {
        setGroupDetails({
          id: result.groupId,
          code: result.groupCode,
          name: groupName.trim(),
        })
        saveGroupToLocalStorage({
          id: result.groupId,
          code: result.groupCode,
          name: groupName.trim(),
        })
        toast({
          title: data.modals.createGroup.successTitle,
          description: data.modals.createGroup.successDescription,
        })
      } else {
        toast({
          title: data.status.error,
          description: result.error || "Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Failed to create group:", error)
      toast({
        title: data.status.error,
        description: "Failed to create group. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleJoinGroup = () => {
    // if (group) router.push(`/dashboard/group-room/${group.id}?code=${group.code}`)
    
    setPassword("")
    setGroupName("")
    setGroupDetails(null)
    setCopiedCode(false)
    setCopiedPassword(false)
    onOpenChange(false)
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
        title: `${type === "code" ? data.modals.createGroup.groupCode : data.modals.createGroup.password} ${data.modals.createGroup.copied}`,
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
          <DialogTitle>{groupDetails ? data.modals.createGroup.titleSuccess : data.modals.createGroup.title}</DialogTitle>
          <DialogDescription>
            {groupDetails
              ? data.modals.createGroup.descriptionSuccess
              : `${data.modals.createGroup.description} ${username}.`}
          </DialogDescription>
        </DialogHeader>

        {!groupDetails ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="groupName">{data.modals.createGroup.nameLabel}</Label>
              <Input
                id="groupName"
                placeholder={data.modals.createGroup.namePlaceholder}
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{data.modals.createGroup.passwordLabel}</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder={data.modals.createGroup.passwordPlaceholder} 
                 value={password} onChange={(e) => setPassword(e.target.value)} required />
                <Button  type="button"  variant="ghost"  size="icon" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent">
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
                {data.actions.cancel}
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {data.modals.createGroup.creating}
                  </>
                ) : (
                  data.modals.createGroup.create
                )}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <Label className="text-sm font-medium">{data.modals.createGroup.groupCode}</Label>
                  <p className="font-mono text-lg">{groupDetails.code}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(groupDetails.code, "code")}>
                  {copiedCode ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
              <p className="font-medium">{data.modals.createGroup.important}</p>
              <p>
                {data.modals.createGroup.shareNote}
              </p>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                {data.actions.close}
              </Button>
              <Button onClick={handleJoinGroup}>{data.modals.createGroup.enterGroup}</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
