"use client"

import type React from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Users, Trash2, Copy, Check } from "lucide-react"
// import { formatDistanceToNow } from "date-fns"
import { useState, useEffect } from "react"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


interface SavedGroup {
  id: string
  name: string
  code: string
  password: string
  joinedAt: string
  lastActivity?: string
}

interface GroupsListProps {
  groups: SavedGroup[] | any[]
  onRemoveGroup: (groupCode: string) => void
  data: any
}

export function GroupsList({ data, groups, onRemoveGroup }: GroupsListProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [groupToDelete, setGroupToDelete] = useState<string | null>(null)
  const router = useRouter()

  const handleCopyCode = async (code: string, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(code)
      setTimeout(() => setCopiedCode(null), 2000)
      toast({
        title: "Code copied!",
        description: "Group code has been copied to clipboard.",
      })
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const handleRemove = (groupCode: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setGroupToDelete(groupCode)
    setShowDeleteConfirm(true)
  }

  const confirmRemove = () => {
    if (groupToDelete) {
      onRemoveGroup(groupToDelete)
      toast({
        title: data.groups.removed.title,
        description: data.groups.removed.description,
      })
      setGroupToDelete(null)
    }
    setShowDeleteConfirm(false)
  }

  // Sort groups by last activity (most recent first)
  const sortedGroups = [...groups].sort((a, b) => {
    const aTime = new Date(a.lastActivity || a.joinedAt).getTime()
    const bTime = new Date(b.lastActivity || b.joinedAt).getTime()
    return bTime - aTime
  })

  // console.log(sortedGroups)

  async function openGroup(group: any) {
    router.push(`/dashboard/group-room/${group.id}?code=${group.code}`)
  }

  return (
    <>
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {sortedGroups.map((group) => (
        <Card key={group.code} className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
          <CardHeader className="pb-3 p-4 sm:p-6">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg flex-shrink-0">
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm sm:text-base lg:text-lg truncate">{group.name}</h3>
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                    <Users className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{data.groups.groupRoom}</span>
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                onClick={(e) => handleRemove(group.code, e)}
              >
                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pt-0 p-4 sm:p-6 sm:pt-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Group Code</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="font-mono text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">
                      {group.code}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" 
                      onClick={(e) => handleCopyCode(group.code, e)}
                    >
                      {copiedCode === group.code ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button 
                  className="w-full" 
                  size="sm" 
                  onClick={(e) => openGroup(group)}
                >
                  <MessageCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{data.groups.openChat}</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{data.groups.removeConfirm.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {data.groups.removeConfirm.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{data.groups.removeConfirm.cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={confirmRemove} className="bg-red-600 hover:bg-red-700">
            {data.groups.removeConfirm.confirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}
