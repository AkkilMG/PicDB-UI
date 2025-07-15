"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ShareCode } from "./share-code"
import { ArrowLeft, Search, Upload, Hash, Users, Pencil, Check, X } from "lucide-react"
import type { GroupDetails } from "@/lib/types"

interface GroupHeaderProps {
  groupDetails: GroupDetails | any
  groupCode: string
  onBack: () => void
  onSearch: (searchTerm: string) => void
  onUploadClick: () => void
  messageCount: number
  onUpdateGroupName?: (newName: string) => void
}

export function GroupHeader({
  groupDetails,
  groupCode,
  onBack,
  onSearch,
  onUploadClick,
  messageCount,
  onUpdateGroupName,
}: GroupHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [groupName, setGroupName] = useState(groupDetails?.name || "Group Room")

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    onSearch(value)
  }

  const handleSaveName = () => {
    if (onUpdateGroupName && groupName.trim()) {
      onUpdateGroupName(groupName)
    }
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setGroupName(groupDetails?.name || "Group Room")
    setIsEditing(false)
  }

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="px-4 lg:px-8 py-4">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Hash className="h-5 w-5 text-white" />
              </div>

              <div>
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <Input value={groupName} onChange={(e) => setGroupName(e.target.value)}
                      placeholder="Enter group name" className="h-8 text-base" />
                    <Button size="icon" variant="ghost" onClick={handleSaveName} className="h-8 w-8">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={handleCancelEdit} className="h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold text-gray-900">{groupDetails?.name || "Group Dashboard"}</h1>
                    <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} 
                      className="h-6 w-6 lg:hidden">
                      <Pencil className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{groupDetails?.memberCount || 1} members</span>
                  </div>
                  <Badge variant="secondary" className="font-mono">
                    {messageCount} images
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={onUploadClick} className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">Upload</span>
            </Button>
            <ShareCode groupCode={groupCode} />
          </div>
        </div>

        {/* Search Row */}
        <div className="flex items-center gap-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search images or users..." value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)} className="pl-10" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
