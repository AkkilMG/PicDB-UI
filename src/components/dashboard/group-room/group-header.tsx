"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ShareCode } from "./share-code"
import { ArrowLeft, Search, Upload, Hash, Users, Pencil, Check, X } from "lucide-react"

interface GroupHeaderProps {
  groupDetails: any | null
  groupCode: string
  onBack: () => void
  onSearch: (term: string) => void
  onUploadClick: () => void
  messageCount: number
  onUpdateGroupName?: (newName: string) => void
  data: any
}

export function GroupHeader({
  groupDetails,
  groupCode,
  onBack,
  onSearch,
  onUploadClick,
  messageCount,
  onUpdateGroupName,
  data
}: GroupHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [groupName, setGroupName] = useState(groupDetails?.name || "")

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
    setGroupName(groupDetails?.name || data.header.groupDashboard)
    setIsEditing(false)
  }

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
        {/* Mobile-First Compact Top Row */}
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          {/* Left Section - Back Button + Group Info */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-gray-100 shrink-0 h-8 w-8 sm:h-10 sm:w-10">
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            <div className="flex items-center gap-2 min-w-0 flex-1">
              {/* Mobile: Compact Group Icon */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
                <Hash className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>

              {/* Mobile: Streamlined Group Info */}
              <div className="min-w-0 flex-1">
                {isEditing ? (
                  <div className="flex items-center gap-1 w-full">
                    <Input value={groupName} onChange={(e) => setGroupName(e.target.value)}
                      placeholder="Enter group name" className="h-7 sm:h-8 text-sm flex-1 min-w-0" />
                    <Button size="icon" variant="ghost" onClick={handleSaveName} className="h-7 w-7 sm:h-8 sm:w-8 shrink-0">
                      <Check className="h-3 w-3" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={handleCancelEdit} className="h-7 w-7 sm:h-8 sm:w-8 shrink-0">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="w-full">
                    {/* Mobile: Title with inline edit */}
                    <div className="flex items-center gap-1">
                      <h1 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900 truncate flex-1 min-w-0 leading-tight">
                        {groupDetails?.name || data.header.groupDashboard}
                      </h1>
                      <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} 
                        className="h-5 w-5 sm:hidden mr-2 shrink-0 opacity-70 hover:opacity-100">
                        <Pencil className="h-2.5 w-2.5" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section - Creative Mobile Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Mobile: Upload Button with Creative Design */}
            <Button onClick={onUploadClick} size="sm" 
              className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md px-2.5 sm:px-3 h-8 sm:h-9">
              <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline text-sm">{data.header.upload}</span>
            </Button>
            {/* Mobile: Compact Share */}
            <ShareCode groupCode={groupCode} />
          </div>
        </div>

        {/* Mobile: Creative Stats Bar */}
        <div className="flex items-center justify-between py-1.5 px-2 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg mb-3 sm:hidden border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Users className="h-3 w-3 text-blue-500" />
              <span className="font-medium">{groupDetails?.memberCount || 1}</span>
            </div>
            <div className="w-px h-3 bg-gray-300"></div>
            <Badge variant="secondary" className="font-mono text-xs px-1.5 py-0.5 bg-blue-100 text-blue-700 border-blue-200">
              {messageCount}
            </Badge>
          </div>
          <div className="text-xs text-gray-500 font-mono opacity-75">
            #{groupCode?.slice(-4)}
          </div>
        </div>

        {/* Desktop: Original Stats (Hidden on Mobile) */}
        <div className="hidden sm:block">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{groupDetails?.memberCount || 1} {data.header.members}</span>
            </div>
            <Badge variant="secondary" className="font-mono text-xs w-fit">
              {messageCount} {data.header.images}
            </Badge>
          </div>
        </div>

        {/* Creative Mobile Search */}
        <div className="relative">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative group">
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <Input 
                placeholder={data.header.search} 
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)} 
                className="pl-8 sm:pl-10 text-sm h-8 sm:h-10 border-gray-200 focus:border-blue-300 focus:ring-blue-200 transition-all duration-200 rounded-lg bg-gray-50 sm:bg-white focus:bg-white"
              />
              {/* Mobile: Search Enhancement Indicator */}
              {searchTerm && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 sm:hidden">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
            {/* Mobile: Quick Filter Button (Creative Addition) */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="sm:hidden h-8 w-8 p-0 border border-gray-200 hover:border-blue-300 hover:bg-blue-50"
            >
              <Users className="h-3.5 w-3.5 text-gray-500" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
