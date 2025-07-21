"use client"

import { useState, useEffect } from "react"
import type { GroupDetails } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Pencil, Check, User } from "lucide-react"
import { formatDistanceToNow } from "date-fns"


interface Member {
  id: string
  username: string
  joinedAt: string
}

interface GroupInfoProps {
  groupDetails: GroupDetails | any
  members?: Member[]
  onUpdateGroupName?: (newName: string) => void
  data: any
}

export function GroupInfo({ data, groupDetails, members = [], onUpdateGroupName }: GroupInfoProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [groupName, setGroupName] = useState(groupDetails?.name || "")

  const handleSaveName = () => {
    if (onUpdateGroupName && groupName.trim()) {
      onUpdateGroupName(groupName)
    }
    setIsEditing(false)
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Group Info Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {data.info.title}
          </CardTitle>
          {onUpdateGroupName && !isEditing && (
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
              <Pencil className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
                className="flex-1"
              />
              <Button size="icon" onClick={handleSaveName}>
                <Check className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div>
              <p className="text-xl font-semibold text-gray-900">{groupDetails?.name || groupName}</p>
              <p className="text-xs text-gray-500">
                Created{" "}
                {groupDetails?.createdAt
                  ? formatDistanceToNow(new Date(groupDetails.createdAt), { addSuffix: true })
                  : "recently"}
              </p>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{data.info.members}</span>
            <Badge variant="secondary">{members.length || groupDetails?.memberCount || 1}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{data.info.groupCode}</span>
            <Badge variant="outline" className="font-mono">
              {groupDetails?.code}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Members List Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {data.info.members} ({members.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {members.length > 0 ? (
            <div className="space-y-3">
              {members.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {member.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{member.username}</p>
                    <p className="text-xs text-gray-500">
                      {data.info.joined} {formatDistanceToNow(new Date(member.joinedAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <User className="h-8 w-8 mx-auto text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">{data.info.noMembers}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
