"use client"

import type React from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Users, Trash2, Copy, Check } from "lucide-react"
// import { formatDistanceToNow } from "date-fns"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

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
}

export function GroupsList({ groups, onRemoveGroup }: GroupsListProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
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
    if (confirm("Are you sure you want to remove this group from your list?")) {
      onRemoveGroup(groupCode)
      toast({
        title: "Group removed",
        description: "Group has been removed from your list.",
      })
    }
  }

  // Sort groups by last activity (most recent first)
  const sortedGroups = [...groups].sort((a, b) => {
    const aTime = new Date(a.lastActivity || a.joinedAt).getTime()
    const bTime = new Date(b.lastActivity || b.joinedAt).getTime()
    return bTime - aTime
  })

  console.log(sortedGroups)

  async function openGroup(group: any) {
    router.push(`/dashboard/group-room/${group.id}?code=${group.code}`)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sortedGroups.map((group) => (
        <Card key={group.code} className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{group.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Users className="h-3 w-3" />
                    <span>Group Chat</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={(e) => handleRemove(group.code, e)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Group Code</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="font-mono text-sm">
                      {group.code}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => handleCopyCode(group.code, e)} >
                      {copiedCode === group.code ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Last Activity</p>
                <p className="text-sm text-gray-700">
                  {formatDistanceToNow(new Date(group.lastActivity || group.joinedAt), { addSuffix: true })}
                </p>
              </div> */}

              <div className="pt-2">
                <Button className="w-full" size="sm" onClick={(e) => openGroup(group)}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Open Chat
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
